import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePassword, deleteMe, me, updateMe } from "../features/users/users.api";
import { clearToken } from "../lib/auth";
import {
  Button,
  Card,
  CardTitle,
  DangerButton,
  H1,
  Input,
  Muted,
  Page,
  PrimaryButton,
  Row,
  Stack,
  Divider,
  Pill,
} from "../components/ui";

export function ProfilePage() {
  const nav = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["users", "me"],
    queryFn: me,
  });

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!data) return;
    setUsername(data.username ?? "");
  }, [data]);

  const updateMut = useMutation({
    mutationFn: () => updateMe({ username }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users", "me"] }),
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const passMut = useMutation({
    mutationFn: () => changePassword({ old_password: oldPassword, new_password: newPassword }),
    onSuccess: () => {
      setOldPassword("");
      setNewPassword("");
      alert("Password updated.");
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteMe,
    onSuccess: () => {
      clearToken();
      qc.clear();
      nav("/login");
    },
  });

  const logout = () => {
    clearToken();
    qc.clear();
    nav("/login");
  };

  if (isLoading) return <Page>Loading...</Page>;
  if (!data) return <Page>Could not load profile.</Page>;

  return (
    <Page>
      <Row style={{ justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <H1 style={{ fontSize: 48 }}>Profile</H1>
          <Muted style={{ fontSize: 18 }}>Your account and security settings.</Muted>
        </div>

        <Row>
          <Pill>{data.gmail}</Pill>
          <Button onClick={logout}>Logout</Button>
        </Row>
      </Row>

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: 14 }}>
        <Card>
          <CardTitle>Basic info</CardTitle>
          <Muted>ID: {data.id}</Muted>

          <Divider />

          <Stack>
            <div>
              <Muted>Username</Muted>
              <Input value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>

            <Row>
              <PrimaryButton disabled={updateMut.isPending} onClick={() => updateMut.mutate()}>
                {updateMut.isPending ? "Saving..." : "Save profile"}
              </PrimaryButton>
              <Link to="/" style={{ alignSelf: "center", fontWeight: 600 }}>
                Back
              </Link>
            </Row>
          </Stack>
        </Card>

        <Card>
          <CardTitle>Security</CardTitle>
          <Muted>Change password</Muted>

          <Divider />

          <Stack>
            <Input
              type="password"
              placeholder="Old password"
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
            />
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />

            <PrimaryButton
              disabled={passMut.isPending || !oldPassword || !newPassword}
              onClick={() => passMut.mutate()}
              style={{ width: "fit-content" }}
            >
              {passMut.isPending ? "Updating..." : "Update password"}
            </PrimaryButton>

            <Divider style={{ marginTop: 16 }} />

            <Muted>Danger zone</Muted>
            <DangerButton
              disabled={deleteMut.isPending}
              onClick={() => {
                if (confirm("Delete account permanently?")) deleteMut.mutate();
              }}
            >
              {deleteMut.isPending ? "Deleting..." : "Delete account"}
            </DangerButton>
          </Stack>
        </Card>
      </div>
    </Page>
  );
}
