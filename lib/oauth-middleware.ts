import { NextRequest, NextResponse } from "next/server"
import descopeSdk from '@descope/node-sdk'

const sdk = descopeSdk({ 
  projectId: process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID || '',
})

export interface OAuthContext {
  scopes: string[]
}

// Helper function to validate session and extract scopes
async function validateSession(token: string): Promise<string[]> {
  try {
    if (!token) {
      throw new Error('Missing or invalid Authorization header')
    }
    const validationResponse = await sdk.validateSession(token)
    const scopeString = (validationResponse.token.scope as string) || ''
    return scopeString.split(' ').filter(Boolean) as string[]
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

export function withOAuth(
  handler: (req: NextRequest, context: OAuthContext) => Promise<Response>,
  requiredScopes: string[] = []
) {
  return async function(req: NextRequest) {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid Authorization header' }, { status: 401 })
    }

    try {
      const token = authHeader.replace('Bearer ', '')
      if (!token) {
        throw new Error('Missing or invalid Authorization header')
      }
      const scopes = await validateSession(token)
      
      const context: OAuthContext = {
        scopes: scopes
      }

      // Check required scopes
      if (requiredScopes.some(scope => !scopes.includes(scope))) {
        return NextResponse.json({ 
          error: 'Insufficient permissions',
          requiredScopes: requiredScopes 
        }, { status: 403 })
      }

      return handler(req, context)
    } catch (error) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
    }
  }
}