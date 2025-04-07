import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Navigation from "./Navigation";

interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
}

interface PushEvent {
    type: "PushEvent";
    created_at: string;
    payload: {
        commits: { message: string }[];
    };
}

interface OtherEvent {
    type: string;
}

type GitHubEvent = PushEvent | OtherEvent;

interface GitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
}

interface LocationState {
    userData: GitHubUser;
}

function Details() {
    const location = useLocation();
    const state = location.state as LocationState;
    const username = state.userData.login;

    const [repos, setRepos] = useState<Repo[]>([]);
    const [dailyCommits, setDailyCommits] = useState<Record<string, number>>({});
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!username) return;

        const fetchRepos = async () => {
            try {
                const res = await fetch(`https://api.github.com/users/${username}/repos`);
                if (!res.ok) throw new Error("Failed to fetch repositories.");
                const data: Repo[] = await res.json();
                setRepos(data);
            } catch (err) {
                setError("Could not load repositories.");
            }
        };

        const fetchCommits = async () => {
            try {
                const res = await fetch(`https://api.github.com/users/${username}/events/public`);
                if (!res.ok) throw new Error("Failed to fetch events.");

                const events: GitHubEvent[] = await res.json();

                const commitsPerDay: Record<string, number> = {};

                events.forEach((event) => {
                    if (event.type === "PushEvent" && "payload" in event && "created_at" in event) {
                        const pushEvent = event as PushEvent;
                        const date = new Date(pushEvent.created_at).toLocaleDateString();
                        commitsPerDay[date] = (commitsPerDay[date] || 0) + pushEvent.payload.commits.length;
                    }
                });

                setDailyCommits(commitsPerDay);
            } catch (err) {
                setError("Could not load commit activity.");
            }
        };


        fetchRepos();
        fetchCommits();
    }, [username]);

    const maxCommits = Math.max(...Object.values(dailyCommits), 1);

    return (
        <div className="text-white p-8 space-y-10 border-2 h-full w-full rounded-4xl overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <Navigation/>
            <h1 className="text-3xl font-bold underline underline-offset-8">GitHub Activity: <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">{username}</a></h1>
            {error && <p className="text-red-500">{error}</p>}

            <Card className="bg-gray-900 text-white rounded-xl border-0">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Recent Daily Commits</CardTitle>
                </CardHeader>
                <CardContent>
                    {Object.keys(dailyCommits).length === 0 ? (
                        <p className="text-red-500">No recent commit data available.</p>
                    ) : (
                        <div className="space-y-2">
                            {Object.entries(dailyCommits).map(([date, count]) => (
                                <div key={date} className="flex items-center gap-4">
                                    <span className="w-24 text-sm text-gray-300">{date}</span>
                                    <div className="flex-1 bg-green-700/20 rounded-full h-4 relative">
                                        <div
                                            className="bg-green-500 h-4 rounded-full"
                                            style={{ width: `${(count / maxCommits) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-white">{count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <div>
                <h2 className="text-xl font-semibold mb-3">Repositories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                    {repos.map(repo => (
                        <Card
                            key={repo.id}
                            className="border-2 border-transparent hover:border-white rounded-xl bg-gray-900"
                        >
                            <CardHeader>
                                <CardTitle>
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold text-green-400 hover:underline text-lg"
                                    >
                                        {repo.name}
                                    </a>
                                </CardTitle>
                                <CardDescription className="text-white">{repo.description || "No description"}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400">
                                    ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>


        </div>
    );
}

export default Details;
