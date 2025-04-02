"use client";
import { useSelector, useDispatch } from "react-redux";
import { setUser, resetUser } from "@/src/store/slices/userSlice";
import { Button } from "@/components/ui/button";
import useClientCheck from "@/src/hooks/useClientCheck";
import { vazir } from "@/lib/fonts";
import { toast } from "sonner";

export default function Page() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  if (!useClientCheck()) {
    return <div>loading</div>;
  }

  const login = () => {
    dispatch(
      setUser({
        userName: "test",
        phoneNumber: "test",
        accessToken: "test",
        refreshToken: "test",
      })
    );
  };
  const logout = () => {
    dispatch(resetUser());
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {user.userName ? (
        <p className="text-center">{user.userName}</p>
      ) : (
        <p className="text-center">please login</p>
      )}
      <button
        className={["neo-btn", vazir.className].join(" ")}
        onClick={login}
      >
        خروج
      </button>
      <button className="neo-btn" onClick={logout}>
        خروج
      </button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
}
