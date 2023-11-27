import Swal from "sweetalert2";

export default function useSwal() {
  async function confirm(text) {
    const response = await Swal.fire({
      // size
      width: "250px",
      text: text == null ? "Apa Anda Yakin?" : text,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
      cancelButtonText: "Tidak",
      // costum size small
      customClass: {
        title: "text-lg",
        popup: "text-sm text-center",
      },
    });

    return response;
  }

  async function accepted(text) {
    await Swal.fire({
      // position: 'top-end',
      width: "250px",
      icon: "success",
      // title: 'Berhasil.',
      text: text == null ? "Data Telah Disimpan!" : text,
      showConfirmButton: false,
      timer: 1500,
      // costum size small
      customClass: {
        title: "text-lg",
        popup: "text-sm text-center",
      },
    });
  }

  async function rejected(text = null) {
    await Swal.fire({
      icon: "error",
      title: "Terjadi Kesalahan.",
      text: text == null ? "Segera hubungi administrator anda" : text,
      width: "250px",
      // costum size small
      customClass: {
        title: "text-lg",
        popup: "text-sm text-center",
      },
    });
  }

  async function rejectedSaldo(text = null) {
    await Swal.fire({
      icon: "error",
      text:
        text == null ? "Terjadi Kesalahan, Hubungi Administrator Anda" : text,
      width: "250px",
      // costum size small
      customClass: {
        title: "text-lg",
        popup: "text-sm text-center",
      },
    });
  }

  return {
    confirm,
    accepted,
    rejected,
    rejectedSaldo,
  };
}
