import { useEffect } from 'react';
import Swal from 'sweetalert2';

type CustomIcon = 'success' | 'error' | 'warning' | 'info' | 'question';

interface AlertModalProps {
  icon: CustomIcon;
  title: string;
  msg: string;
  onClose: () => void;
}

function AlertModal({ icon, title, msg, onClose }: AlertModalProps) {
  useEffect(() => {
    Swal.fire({
      icon,
      title,
      text: msg,
      confirmButtonText: '확인',
      confirmButtonColor: ' #0075ff',
      preConfirm: onClose,
    });
  }, []);

  return null;
}

export default AlertModal;
