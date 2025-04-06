import useAuthStore from "@/stores/authStore";

export default function Account() {
  const { auth } = useAuthStore();

  return (
    <div className="mt-6 flex justify-between items-center">
      <p>{auth?.profile.userName}</p>
    </div>
  );
}
