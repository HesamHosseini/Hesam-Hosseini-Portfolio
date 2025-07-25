import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Hesam Hosseini";
    const subtitle = searchParams.get("subtitle") || "Senior Frontend Developer";
    const lang = searchParams.get("lang") || "en";

    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    fontFamily: "Inter",
                    color: "white",
                    position: "relative",
                }}
            >
                {/* Background Pattern */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                            "radial-gradient(circle at 25% 25%, #ffffff20 0%, transparent 50%), radial-gradient(circle at 75% 75%, #ffffff10 0%, transparent 50%)",
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        zIndex: 1,
                    }}
                >
                    <h1
                        style={{
                            fontSize: "72px",
                            fontWeight: "bold",
                            margin: "0 0 20px 0",
                            textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                        }}
                    >
                        {title}
                    </h1>
                    <p
                        style={{
                            fontSize: "32px",
                            margin: "0 0 40px 0",
                            opacity: 0.9,
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                    >
                        {subtitle}
                    </p>

                    {/* Tech Stack Icons */}
                    <div
                        style={{
                            display: "flex",
                            gap: "30px",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                background: "#61dafb",
                                color: "#20232a",
                                padding: "15px 25px",
                                borderRadius: "12px",
                                fontSize: "24px",
                                fontWeight: "bold",
                            }}
                        >
                            React
                        </div>
                        <div
                            style={{
                                background: "#000000",
                                color: "#ffffff",
                                padding: "15px 25px",
                                borderRadius: "12px",
                                fontSize: "24px",
                                fontWeight: "bold",
                            }}
                        >
                            Next.js
                        </div>
                        <div
                            style={{
                                background: "#3178c6",
                                color: "#ffffff",
                                padding: "15px 25px",
                                borderRadius: "12px",
                                fontSize: "24px",
                                fontWeight: "bold",
                            }}
                        >
                            TypeScript
                        </div>
                    </div>
                </div>

                {/* Bottom text */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "40px",
                        right: "40px",
                        fontSize: "24px",
                        opacity: 0.8,
                    }}
                >
                    Portfolio 2025
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
