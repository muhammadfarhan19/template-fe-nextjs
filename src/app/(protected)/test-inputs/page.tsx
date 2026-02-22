'use client'

import * as React from 'react'
import { PasswordInput } from '@/components/ui/password-input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/otp-input'
import { PhoneInput } from '@/components/ui/phone-input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function TestInputsPage() {
  const [otpValue, setOtpValue] = React.useState('')
  const [phoneValue, setPhoneValue] = React.useState('')

  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Custom Input Components</h1>
        <p className="text-muted-foreground">
          Verification page for OTP, Phone, and Password inputs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Password Input */}
        <Card>
          <CardHeader>
            <CardTitle>Password Input</CardTitle>
            <CardDescription>
              A password input with a visibility toggle.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput id="password" placeholder="Enter password" />
            </div>
          </CardContent>
        </Card>

        {/* OTP Input */}
        <Card>
          <CardHeader>
            <CardTitle>OTP Input</CardTitle>
            <CardDescription>
              A multi-segment input for one-time passwords.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>One-Time Password</Label>
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={(value) => setOtpValue(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs text-muted-foreground">
                Current value: {otpValue}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Phone Input */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Phone Input</CardTitle>
            <CardDescription>
              A phone number input with country code selection.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 max-w-sm">
              <Label htmlFor="phone">Phone Number</Label>
              <PhoneInput
                id="phone"
                value={phoneValue}
                onChange={(v) => setPhoneValue(v || '')}
                placeholder="Enter phone number"
              />
              <p className="text-xs text-muted-foreground">
                Current value: {phoneValue}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
