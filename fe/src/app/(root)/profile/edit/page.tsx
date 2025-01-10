import { PaymentMethodCard } from '@/components/Profile/PaymentMethodCard'
import { ProfileAvatar } from '@/components/Profile/ProfileAvatar'
import { ProfileHeader } from '@/components/Profile/ProfileHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@radix-ui/react-label'
import { Plus } from 'lucide-react'
import { getYear } from 'date-fns'

export default function EditProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <ProfileHeader />
            <div className="container max-w-7xl py-8">
                <div className="grid gap-20 md:grid-cols-2">
                    {/* Left Column */}
                    <div className="space-y-6" data-aos="fade-right">
                        <div className="flex justify-center md:justify-start">
                            <ProfileAvatar />
                        </div>

                        <div className="grid gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Last Name</Label>
                                    <Input id="firstName" placeholder="Tên của bạn" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">First Name</Label>
                                    <Input id="lastName" placeholder="Họ của bạn" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        id="password"
                                        type="password"
                                        value="••••••••"
                                        disabled
                                    />
                                    <Button variant="outline" className="whitespace-nowrap">
                                        Change Password
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="email@example.com" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" placeholder="0123456789" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="Nhập địa chỉ của bạn" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country">Nation</Label>
                                <Select defaultValue="us">
                                    <SelectTrigger id="country">
                                        <SelectValue placeholder="Select nation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="us">United States</SelectItem>
                                        <SelectItem value="vn">Việt Nam</SelectItem>
                                        <SelectItem value="jp">Japan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6" data-aos="fade-left">
                        <div className="grid gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Sex</Label>
                                    <Select defaultValue="male">
                                        <SelectTrigger id="gender">
                                            <SelectValue placeholder="Chọn giới tính" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Select defaultValue="en">
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="vi">Tiếng Việt</SelectItem>
                                            <SelectItem value="jp">日本語</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>Date of Birth</Label>
                                    <Select defaultValue="1">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Date" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 31 }, (_, i) => (
                                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                                    {i + 1}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Month</Label>
                                    <Select defaultValue="1">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                                    {i + 1}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Year</Label>
                                    <Select defaultValue="2000">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Năm" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 100 }, (_, i) => (
                                                <SelectItem key={i} value={(getYear(new Date()) - i).toString()}>
                                                    {getYear(new Date()) - i}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="twitter">Twitter</Label>
                                <Input id="twitter" placeholder="twitter.com/username" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="facebook">Facebook</Label>
                                <Input id="facebook" placeholder="facebook.com/username" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="google">Google</Label>
                                <Input id="google" placeholder="Google Account" />
                            </div>

                            <div className="space-y-4">
                                <Label>Payment methods</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <PaymentMethodCard
                                        type="visa"
                                        last4="4242"
                                        expiry="12/25"
                                    />
                                    <PaymentMethodCard
                                        type="mastercard"
                                        last4="8888"
                                        expiry="09/24"
                                    />
                                </div>
                                <Button variant="outline" className="w-full">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add method
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}