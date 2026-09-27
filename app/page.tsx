"use client";

import { useState } from "react";

const pupils = [
  { name: "Harry Potter", year: "Year 10" },
  { name: "Ron Weasley", year: "Year 10" },
  { name: "Hermione Granger", year: "Year 10" },
  { name: "Dean Thomas", year: "Year 10" },
  { name: "Seamus Finnigan", year: "Year 10" },
  { name: "Lavender Brown", year: "Year 10" },
  { name: "Parvati Patil", year: "Year 10" },
  { name: "Neville Longbottom", year: "Year 10" },
  { name: "Ginny Weasley", year: "Year 9" },
  { name: "Luna Lovegood", year: "Year 9" },
];

const praiseReasons = [
  "Excellent Effort",
  "Outstanding Work",
  "Superb Homework",
  "Great Progress",
  "Excellent Contribution",
  "Helping Others",
  "Polite & Respectful",
  "Resilience",
  "Creativity",
  "Excellent Teamwork",
  "Going Above & Beyond",
];
const praisePhrases: Record<string, string> = {
  "Excellent Effort": "showed excellent effort throughout the lesson",
  "Outstanding Work": "produced an outstanding piece of work",
  "Superb Homework": "completed a superb piece of homework",
  "Great Progress": "made excellent progress",
  "Excellent Contribution": "made an excellent contribution to the lesson",
  "Helping Others": "was particularly helpful towards others",
  "Polite & Respectful": "was exceptionally polite and respectful",
  "Resilience": "demonstrated fantastic resilience",
  "Creativity": "showed excellent creativity",
  "Excellent Teamwork": "worked exceptionally well with others",
  "Going Above & Beyond": "went above and beyond what was expected",
};
export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedPupil, setSelectedPupil] = useState("");
  const [subject, setSubject] = useState("History");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const matchingPupils = pupils.filter((pupil) =>
    pupil.name.toLowerCase().includes(search.toLowerCase())
  );

  function toggleReason(reason: string) {
    setSelectedReasons((current) =>
      current.includes(reason)
        ? current.filter((item) => item !== reason)
        : [...current, reason]
    );
  }
const firstName = selectedPupil.split(" ")[0];
  const selectedPhrases = selectedReasons.map(
  (reason) => praisePhrases[reason]
);

const praiseSentence =
  selectedPhrases.length === 1
    ? `${firstName} ${selectedPhrases[0]}.`
    : selectedPhrases.length === 2
    ? `${firstName} ${selectedPhrases[0]} and ${selectedPhrases[1]}.`
    : selectedPhrases.length > 2
    ? `${firstName} ${selectedPhrases
        .slice(0, -1)
        .join(", ")} and ${selectedPhrases[selectedPhrases.length - 1]}.`
    : "";

  if (showPreview) {
  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <header className="bg-black text-white px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">PRAISE POST</h1>
          <p className="text-sm text-gray-300">Cardinal Pole Catholic School</p>
        </div>

        <div className="text-right">
          <p className="font-semibold">Mr Parker</p>
          <p className="text-sm text-gray-300">History</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">

        <button
          onClick={() => setShowPreview(false)}
          className="mb-6 font-semibold"
        >
          ← Back to edit
        </button>

        <h2 className="text-3xl font-bold">Preview your PraisePost</h2>
        <p className="text-gray-600 mt-2 mb-8">
          Check everything looks right before sending.
        </p>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="bg-black text-white text-center px-8 py-10">
            <p className="text-sm uppercase tracking-widest mb-3">
              Cardinal Pole Catholic School
            </p>

            <h3 className="text-4xl font-bold">
              {selectedPupil}
            </h3>

            <p className="text-xl mt-3">
              has received a PraisePost!
            </p>
          </div>

          <div className="p-8">
            <p className="text-gray-500 text-sm uppercase tracking-wider">
              {subject}
            </p>

            <h4 className="text-2xl font-bold mt-2 mb-5">
              Why {selectedPupil.split(" ")[0]} stood out today
            </h4>

            <div className="flex flex-wrap gap-3">
              {selectedReasons.map((reason) => (
                <span
                  key={reason}
                  className="bg-gray-100 border border-gray-200 rounded-full px-4 py-2 font-semibold"
                >
                  ★ {reason}
                </span>
              ))}
            </div>

<p className="mt-6 text-lg leading-relaxed">
  {praiseSentence}
</p>

            <div className="border-t border-gray-200 mt-8 pt-6">
              <p className="text-lg">
                Awarded by <strong>Mr Parker</strong>
              </p>
            </div>
          </div>

        </section>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => setShowPreview(false)}
            className="border border-gray-300 px-6 py-4 rounded-xl font-bold"
          >
            ← Make changes
          </button>

<button
  onClick={async () => {
    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pupilName: selectedPupil,
        firstName: firstName,
        subject: subject,
        reasons: selectedReasons,
        praiseSentence: praiseSentence,
      }),
    });

    if (response.ok) {
      alert(`PraisePost email sent for ${firstName}!`);
    } else {
      alert("Something went wrong sending the PraisePost.");
    }
  }}
  className="bg-black text-white px-8 py-4 rounded-xl font-bold"
>
  Send PraisePost →
</button>
        </div>

      </div>
    </main>
  );
}
  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <header className="bg-black text-white px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">PRAISE POST</h1>
          <p className="text-sm text-gray-300">Cardinal Pole Catholic School</p>
        </div>

        <div className="text-right">
          <p className="font-semibold">Mr Parker</p>
          <p className="text-sm text-gray-300">History</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold">Create a PraisePost</h2>
        <p className="text-gray-600 mt-2">
          Recognise something brilliant in just a few seconds.
        </p>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-8">
          <h3 className="text-lg font-bold mb-4">1. Who are you praising?</h3>

          <input
            type="text"
            placeholder="Search for a pupil..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedPupil("");
            }}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
          />

          {search && !selectedPupil && (
            <div className="border border-gray-200 rounded-xl mt-2 overflow-hidden">
              {matchingPupils.map((pupil) => (
                <button
                  key={pupil.name}
                  onClick={() => {
                    setSelectedPupil(pupil.name);
                    setSearch(pupil.name);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b last:border-b-0 border-gray-100"
                >
                  <span className="font-semibold">{pupil.name}</span>
                  <span className="text-gray-500 ml-2">· {pupil.year}</span>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-5">
          <h3 className="text-lg font-bold mb-4">2. Which subject?</h3>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white"
          >
            <option>History</option>
            <option>English</option>
            <option>Mathematics</option>
            <option>Science</option>
            <option>Geography</option>
            <option>Religious Education</option>
            <option>Physical Education</option>
            <option>Art</option>
            <option>Music</option>
            <option>Drama</option>
            <option>Whole School</option>
          </select>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-5">
          <h3 className="text-lg font-bold mb-2">
            3. What did they do brilliantly?
          </h3>

          <p className="text-gray-500 mb-5">Choose as many as you like.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {praiseReasons.map((reason) => {
              const selected = selectedReasons.includes(reason);

              return (
                <button
                  key={reason}
                  onClick={() => toggleReason(reason)}
                  className={`rounded-xl border p-4 text-left font-semibold transition ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white border-gray-300 hover:border-black"
                  }`}
                >
                  {selected ? "★ " : "☆ "}
                  {reason}
                </button>
              );
            })}
          </div>
        </section>

        <div className="mt-8 flex justify-end">
          <button
          onClick={() => setShowPreview(true)}
            disabled={!selectedPupil || selectedReasons.length === 0}
            className="bg-black disabled:bg-gray-300 text-white font-bold px-8 py-4 rounded-xl"
          >
            Preview PraisePost →
          </button>
        </div>
      </div>
    </main>
  );
}