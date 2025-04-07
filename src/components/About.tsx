import Navigation from "./Navigation";

export default function About() {
    return (
        <div className="text-white h-full ">
            <Navigation />
            <div className="space-y-4 p-10">
                <h1 className="text-4xl text-center mb-10 font-extrabold underline underline-offset-8">✨ GitHub User Analyzer ✨</h1>
                <h2 className="text-3xl font-semibold">📖 About</h2>
                <p>This app takes a GitHub username, checks if it's valid, and then uses GitHub’s public API to fetch the user’s public repositories. It also shows how many commits the user has made in the few days.</p>
                <h2 className="text-3xl font-semibold">⚙️ Tech Stack</h2>
                <ul className="list-inside list-disc [&_span]:underline [&_span]:underline-offset-4 [&_span]:font-semibold  ">
                    <li><span>Frontend:</span> React + TypeScript</li>
                    <li><span>Styling:</span> Tailwind CSS + ShadCN UI</li>
                    <li><span>API:</span> GitHub’s public REST API</li>
                </ul>
                <h2 className="text-3xl font-semibold"> 😺 Built By</h2>
                <div className="flex gap-2 [&_a]:text-blue-600 flex-wrap">
                    <p>Pranav Dhekane : </p>
                    <a href="https://github.com/pranavdhekane">Github</a>
                    <a href="https://www.linkedin.com/in/pranav-dhekane-293047292/">Linkedin</a>
                </div>
            </div>
        </div>
    )
}