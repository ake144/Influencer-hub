"use client";

import { getProfile } from "@/lib/serveraction"; // Adjust the import path as needed
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

interface Profile {
    id: number;
    name: string;
    clerkUserId: string;
    email: string;
    phone: string | null;
    tgUsername: string | null;
    role: string;
    createdAt: Date;
}

const ProfileForms = () => {
    const { user } = useUser();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!user) {
            setError("User not found");
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await getProfile(user.id);

                if (!response) {
                    setError("Profile not found for this user.");
                    return;
                }

                setProfile(response);
                console.log(response);
            } catch (e: unknown) {
                const errorMessage = 
                    e instanceof Error ? e.message : "An unknown error occurred.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div>
            <h1>Profile Form</h1>
            {profile ? (
                <div>
                    <h2>{profile.name}</h2>
                    <p>Email: {profile.email}</p>
                    <p>Role: {profile.role}</p>
                    <p>
                        Created At:{" "}
                        {new Date(profile.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
    );
};

export default ProfileForms;
