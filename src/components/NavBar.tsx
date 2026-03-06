import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearToken } from "../lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { Card, Row, Pill, PrimaryButton } from "./ui";

function NavItem({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      style={{
        minHeight: 40,
        flex: "0 0 auto",
        whiteSpace: "nowrap",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 14px",
        borderRadius: 12,
        border: "1px solid var(--border)",
        background: active ? "rgba(201,115,58,0.16)" : "transparent",
        color: "var(--text)",
        fontWeight: active ? 700 : 600,
      }}
    >
      {label}
    </Link>
  );
}

export function NavBar() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const qc = useQueryClient();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 760px)");
    const sync = () => setIsMobile(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  const navValue = (() => {
    if (pathname === "/") return "/";
    if (pathname === "/dashboard" || pathname.startsWith("/playlists/")) return "/dashboard";
    if (pathname === "/generate") return "/generate";
    if (pathname === "/profile") return "/profile";
    return "";
  })();

  const logout = () => {
    clearToken();
    qc.clear();
    nav("/");
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        padding: "clamp(8px, 2.4vw, 12px) clamp(10px, 3vw, 14px)",
        background: "color-mix(in srgb, var(--bg) 80%, transparent)",
        backdropFilter: "blur(7px)",
      }}
    >
      <Card style={{ padding: 10 }}>
        <Row style={{ justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <Row style={{ flex: "1 1 520px", minWidth: 0, gap: 10 }}>
            <Pill>
              <img
                src="/icon.png"
                alt="AuraCue icon"
                style={{ width: 20, height: 20, borderRadius: 6, objectFit: "cover" }}
              />
              <span style={{ fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)" }}>AuraCue</span>
            </Pill>

            {isMobile ? (
              <div
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  minWidth: 190,
                  borderRadius: 14,
                  border: "1px solid var(--border)",
                  background: "color-mix(in srgb, var(--panel) 92%, transparent)",
                  boxShadow: "var(--shadow)",
                }}
              >
                <select
                  aria-label="Navigation"
                  value={navValue}
                  onChange={(event) => {
                    const to = event.target.value;
                    if (to) nav(to);
                  }}
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    minHeight: 42,
                    width: "100%",
                    borderRadius: 14,
                    border: "none",
                    background: "transparent",
                    color: "var(--text)",
                    padding: "0 40px 0 13px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="/">Home</option>
                  <option value="/dashboard">Playlists</option>
                  <option value="/generate">Generate</option>
                  <option value="/profile">Profile</option>
                </select>
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: 12,
                    fontSize: 12,
                    color: "var(--muted)",
                    pointerEvents: "none",
                  }}
                >
                  ▾
                </span>
              </div>
            ) : (
              <Row
                style={{
                  gap: 10,
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  maxWidth: "100%",
                  paddingBottom: 2,
                }}
              >
                <NavItem to="/" label="Home" />
                <NavItem to="/dashboard" label="Playlists" />
                <NavItem to="/generate" label="Generate" />
                <NavItem to="/profile" label="Profile" />
              </Row>
            )}
          </Row>
        </Row>
      </Card>
    </div>
  );
}
