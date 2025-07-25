// Environment configuration
export const config = {
  jwtSecret: process.env.JWT_SECRET || process.env.VERCEL_ENV_JWT_SECRET,
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || "development",
}

// Validation function
export const validateEnv = () => {
  if (!config.jwtSecret) {
    console.error("❌ JWT_SECRET is not set in environment variables")
    console.log(
      "Available environment variables:",
      Object.keys(process.env).filter((key) => key.includes("JWT")),
    )
    return false
  }
  console.log("✅ JWT_SECRET is properly configured")
  return true
}
