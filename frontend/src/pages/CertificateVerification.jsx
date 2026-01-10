import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ProofEdABI from "../contracts/ProofEdABI.json";
import { CONTRACT_ADDRESS } from "../contracts/contractConfig";

function CertificateVerification() {
  const { txHash } = useParams();

  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState(null);
  const [hashValid, setHashValid] = useState(null); // null = not checked
  const [onChainExists, setOnChainExists] = useState(null); // null = not checked

  // ===============================
  // MOCK backend fetch (replace later)
  // ===============================
  const mockFetchCertificate = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const normalized = {
      studentName: "Jash Bohare",
      studentId: "24BCP326",
      course: "B.Tech CE",
      grade: "A+",
      issueDate: "2026-01-09",
    };

    return {
      ...normalized,
      issuer: "IIT Delhi",
      hash: ethers.keccak256(
        ethers.toUtf8Bytes(JSON.stringify(normalized))
      ),
    };
  };

  // ===============================
  // Recompute hash (must match issuance)
  // ===============================
  const recomputeHash = (cert) => {
    const normalizedMetadata = {
      studentName: cert.studentName.trim(),
      studentId: cert.studentId.trim(),
      course: cert.course.trim(),
      grade: cert.grade.trim(),
      issueDate: cert.issueDate,
    };

    return ethers.keccak256(
      ethers.toUtf8Bytes(JSON.stringify(normalizedMetadata))
    );
  };

  // ===============================
  // Read blockchain (read-only)
  // ===============================
  const checkOnChainCertificate = async (certHash) => {
    try {
      const provider = new ethers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/kNGCTtO0akTqvyPS1Rlsx"
      );

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ProofEdABI,
        provider
      );

      const exists = await contract.certificates(certHash);
      return exists;
    } catch (error) {
      console.error("Blockchain read failed", error);
      return false;
    }
  };

  // ===============================
  // Fetch → hash check → chain check
  // ===============================
  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const data = await mockFetchCertificate();
        setCertificate(data);

        // 1️⃣ Recompute hash
        const recomputed = recomputeHash(data);

        if (recomputed === data.hash) {
          setHashValid(true);

          // 2️⃣ Read blockchain only if integrity passes
          const exists = await checkOnChainCertificate(recomputed);
          setOnChainExists(exists);
        } else {
          setHashValid(false);
          setOnChainExists(false);
        }
      } catch (error) {
        console.error("Verification failed", error);
        setCertificate(null);
        setHashValid(false);
        setOnChainExists(false);
      } finally {
        setLoading(false);
      }
    };

    verifyCertificate();
  }, [txHash]);

  // ===============================
  // UI
  // ===============================
  return (
    <div style={{ padding: "40px" }}>
      <h1>Certificate Verification</h1>

      <p>
        <strong>Transaction Hash:</strong>
        <br />
        <code>{txHash}</code>
      </p>

      {loading && <p>🔍 Verifying certificate…</p>}

      {!loading && certificate && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Student Name:</strong> {certificate.studentName}</p>
          <p><strong>Student ID:</strong> {certificate.studentId}</p>
          <p><strong>Course:</strong> {certificate.course}</p>
          <p><strong>Grade:</strong> {certificate.grade}</p>
          <p><strong>Issue Date:</strong> {certificate.issueDate}</p>
          <p><strong>Issued By:</strong> {certificate.issuer}</p>

          {hashValid === true && (
            <p style={{ color: "green", marginTop: "12px" }}>
              ✅ Certificate data integrity verified
            </p>
          )}

          {hashValid === false && (
            <p style={{ color: "red", marginTop: "12px" }}>
              ❌ Certificate data has been tampered with
            </p>
          )}

          {hashValid === true && onChainExists === true && (
            <p style={{ color: "green" }}>
              ⛓️ Certificate hash found on blockchain
            </p>
          )}

          {hashValid === true && onChainExists === false && (
            <p style={{ color: "red" }}>
              ❌ Certificate hash NOT found on blockchain
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default CertificateVerification;
