import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

function ProfileSettings() {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth) {
      setProfile({
        name: auth.name || "",
        email: auth.email || "",
        bio: auth.bio || "",
      });
    }
  }, [auth]);

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axiosPrivate.put("/api/user/update-profile", profile);

      if (res.data.success) {
        toast.success("Profile updated");

        setAuth((prev) => ({
          ...prev,
          ...profile,
        }));
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  //  CHANGE PASSWORD
  const changePassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axiosPrivate.put(
        "/api/user/change-password",
        passwords,
      );

      if (res.data.success) {
        toast.success("Password updated");

        setPasswords({
          currentPassword: "",
          newPassword: "",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold">Profile Settings</h1>

      {/* PROFILE */}
      <form onSubmit={saveProfile} className="card mt-6 space-y-4">
        <h2 className="font-semibold">Personal Info</h2>

        <input
          className="input-field"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          placeholder="Name"
        />

        <input
          className="input-field"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          placeholder="Email"
        />

        <textarea
          className="input-field"
          rows={3}
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          placeholder="Bio"
        />

        <button type="submit" disabled={loading} className="btn-primary">
          Save Changes
        </button>
      </form>

      {/* PASSWORD */}
      <form onSubmit={changePassword} className="card mt-6 space-y-4">
        <h2 className="font-semibold">Change Password</h2>

        <input
          type="password"
          required
          className="input-field"
          value={passwords.currentPassword}
          onChange={(e) =>
            setPasswords({
              ...passwords,
              currentPassword: e.target.value,
            })
          }
          placeholder="Current Password"
        />

        <input
          type="password"
          required
          minLength={6}
          className="input-field"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({
              ...passwords,
              newPassword: e.target.value,
            })
          }
          placeholder="New Password"
        />

        <button type="submit" className="btn-secondary">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ProfileSettings;
