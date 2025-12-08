import { useParams } from "react-router-dom";
import { useState } from "react";
import ResetPasswordModal from "../components/ResetPasswordModal";

export default function ResetPasswordPage() {
  const { token } = useParams();   // <---- ambil token dari URL
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {showModal && (
        <ResetPasswordModal
          token={token}              // <---- kirim token ke modal
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
