import AuthLayout from '@/components/AuthLayout';
import { Form } from '@/components/Preferences/Form'
import { Metadata } from 'next';

const genres = [
    "Act",
    "Adventure",
    "Humorous",
    "Drama",
    "Fantasy",
    "Game",
    "Horrified",
    "Martial arts",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Thriller",
    "Mecha",
    "Psychological",
    "Shounen",
    "Shoujo",
    "Seinen"
]

export const metadata: Metadata = {
    title: "Choose your preferences",
    description: "Select your favorite genres to get personalized recommendations",
};

export default function PreferencesPage() {
    return (
        <AuthLayout title="Choose your preferences"
            subtitle="Select at least 3 genres so we can suggest anime that are right for you">
            <Form genres={genres} />
        </AuthLayout>
    )
}