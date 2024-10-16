import { toast } from "react-hot-toast";

const useToastPromise = () => {
  const toastPromise = async (promise: Promise<any>, message: { loading: string; success: string; error: string }) => {
    return toast.promise(
      promise,
      {
        loading: message.loading,
        success: message.success,
        error: message.error,
      },
      {
        style: {
          minWidth: "150px",
        },
        success: {
          duration: 3000,
        },
        error: {
          duration: 3000,
        },
      },
    );
  };

  return { toastPromise };
};

export default useToastPromise;
