import { ImageResponse } from "next/og";

export const size = {
    width: 180,
    height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 72,
                    background: "linear-gradient(90deg, #000 0%, #333 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    borderRadius: "20%",
                }}
            >
                HH
            </div>
        ),
        {
            ...size,
        }
    );
}
