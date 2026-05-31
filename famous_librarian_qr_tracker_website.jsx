import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Sparkles, Send, Library, Star, CassetteTape, Camera, ImagePlus, MessageSquare, MapPin, Heart, Globe2, Trophy, BookMarked, Zap } from "lucide-react";

const starterPosts = [
  {
    id: 1,
    cardName: "Pura Belpré",
    foundWhere: "Library program",
    location: "Bryan, Ohio",
    ageGroup: "Adult",
    note: "I picked this up after a library event and loved learning about a librarian I had never heard of before!",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    cardName: "William Howard Brett",
    foundWhere: "Conference table",
    location: "Cleveland, Ohio",
    ageGroup: "Library worker",
    note: "Found this at a conference display. Such a fun idea for getting people talking about library history.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    cardName: "Mystery Librarian Card",
    foundWhere: "From a friend",
    location: "Shared by a coworker",
    ageGroup: "Teen",
    note: "Now I want to collect the whole set. The QR code made it feel like a secret library quest.",
    image: "",
  },
];

export default function FamousLibrarianQRTracker() {
  const [submitted, setSubmitted] = useState(false);
  const [posts, setPosts] = useState(starterPosts);
  const [photoPreview, setPhotoPreview] = useState("");
  const [form, setForm] = useState({
    cardName: "",
    foundWhere: "",
    location: "",
    ageGroup: "",
    note: "",
  });

  const foundWhereLabels = {
    "library-program": "Library program",
    "library-branch": "Library branch",
    conference: "Conference or convention",
    school: "School visit",
    staff: "Library staff",
    friend: "Friend or family",
    "community-event": "Community event",
    other: "Other",
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      cardName: form.cardName || "Unknown card",
      foundWhere: foundWhereLabels[form.foundWhere] || "Not listed",
      location: form.location || "Location not shared",
      ageGroup: form.ageGroup || "Prefer not to say",
      note: form.note || "No note added.",
      image: photoPreview,
      submittedAt: new Date().toISOString(),
      qrSource: new URLSearchParams(window.location.search).get("card") || "unknown-card",
    };

    // In a real website, this would send the form data and uploaded photo to a database/storage.
    // Examples: Supabase, Firebase, Airtable, Google Sheets + Drive, or a small custom backend.
    // Public posts should be reviewed/moderated before appearing live.
    console.log("QR Card Tracking Submission:", newPost);

    setPosts([newPost, ...posts]);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setPhotoPreview("");
    setForm({
      cardName: "",
      foundWhere: "",
      location: "",
      ageGroup: "",
      note: "",
    });
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#ffe66d] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20px_20px,#111_2px,transparent_2px)] [background-size:32px_32px]" />
        <Card className="max-w-xl w-full rounded-3xl shadow-[10px_10px_0px_#111] border-4 border-black bg-white relative z-10">
          <CardContent className="p-8 text-center space-y-5">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-[#ff4fd8] border-4 border-black flex items-center justify-center rotate-3 shadow-[5px_5px_0px_#111]">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-950 tracking-tight">Totally submitted!</h1>
            <p className="text-slate-800 text-lg font-medium">
              Your response helps us see how far these famous librarian cards travel and how people discover the library.
            </p>
            <p className="text-sm text-slate-600">
              Your story has been added to the demo card wall. On the real website, posts and photos should be approved before showing publicly.
            </p>
            <Button onClick={resetForm} className="rounded-2xl bg-black hover:bg-slate-800 border-4 border-black shadow-[5px_5px_0px_#ff4fd8] font-black uppercase tracking-wide">
              Add Another Card Story
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#30c5ff] p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.25)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.25)_50%,rgba(255,255,255,.25)_75%,transparent_75%,transparent)] [background-size:48px_48px]" />
      <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-[#ff4fd8] border-4 border-black shadow-[6px_6px_0px_#111]" />
      <div className="absolute bottom-10 right-10 w-32 h-16 bg-[#ffe66d] border-4 border-black rotate-6 shadow-[6px_6px_0px_#111]" />
      <div className="absolute top-28 right-20 text-6xl font-black text-white/50 rotate-12">★</div>
      <div className="absolute bottom-32 left-20 text-7xl font-black text-white/40 -rotate-12">✦</div>

      <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center py-10 relative z-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ffe66d] px-5 py-3 shadow-[5px_5px_0px_#111] border-4 border-black text-black font-black uppercase tracking-wide rotate-[-1deg]">
            <QrCode className="w-5 h-5" />
            Scan the Stacks
          </div>

          <div className="bg-white border-4 border-black rounded-3xl p-7 shadow-[12px_12px_0px_#111] rotate-[-1deg]">
            <div className="flex items-center gap-3 mb-4 text-[#ff4fd8] font-black uppercase tracking-widest text-sm">
              <CassetteTape className="w-5 h-5" />
              Famous Librarian Card Project
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-950 leading-none tracking-tight">
              You found a library legend.
            </h1>
            <p className="text-lg text-slate-800 leading-relaxed mt-5 font-medium">
              These collectible cards celebrate famous librarians and library leaders who helped shape what libraries are today. Tell us how you got your card so we can track where the project travels.
            </p>
          </div>

          <Card className="rounded-3xl shadow-[8px_8px_0px_#111] border-4 border-black bg-[#b6ff6d] rotate-[1deg]">
            <CardContent className="p-5 flex gap-4">
              <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center flex-shrink-0 border-4 border-white">
                <Library className="w-7 h-7 text-[#ffe66d]" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 bg-white border-2 border-black rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide mb-2">
                  <Globe2 className="w-3 h-3" />
                  Card Quest
                </div>
                <h2 className="font-black text-slate-950 text-xl">How Far Can a Library Legend Travel?</h2>
                <p className="text-slate-800 text-sm mt-1 font-medium">
                  Help us track the journey of these famous librarian cards as they travel through libraries, conferences, schools, and communities. Every scan adds another stop to the adventure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-3xl shadow-[12px_12px_0px_#111] border-4 border-black bg-white">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-b-4 border-black pb-4">
                <div className="inline-flex items-center gap-2 bg-[#ff4fd8] text-white px-3 py-1 rounded-full border-2 border-black text-xs font-black uppercase tracking-wide mb-3">
                  <Star className="w-3 h-3" />
                  Card Check-In
                </div>
                <h2 className="text-3xl font-black text-slate-950">Tell us about your card</h2>
                <p className="text-sm text-slate-600 mt-1 font-medium">No personal information is required.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide">Which card did you scan?</label>
                <Input
                  className="border-3 border-black rounded-xl focus-visible:ring-[#ff4fd8]"
                  placeholder="Example: William Howard Brett, Pura Belpré, etc."
                  value={form.cardName}
                  onChange={(e) => setForm({ ...form, cardName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide">How did you get the card?</label>
                <Select onValueChange={(value) => setForm({ ...form, foundWhere: value })}>
                  <SelectTrigger className="border-3 border-black rounded-xl">
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="library-program">At a library program</SelectItem>
                    <SelectItem value="library-branch">At a library branch</SelectItem>
                    <SelectItem value="conference">At a conference or convention</SelectItem>
                    <SelectItem value="school">At a school visit</SelectItem>
                    <SelectItem value="staff">From library staff</SelectItem>
                    <SelectItem value="friend">From a friend or family member</SelectItem>
                    <SelectItem value="community-event">At a community event</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide">Where are you visiting from?</label>
                <Input
                  className="border-3 border-black rounded-xl focus-visible:ring-[#ff4fd8]"
                  placeholder="City, state, branch, or event name"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide">Who are you?</label>
                <Select onValueChange={(value) => setForm({ ...form, ageGroup: value })}>
                  <SelectTrigger className="border-3 border-black rounded-xl">
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kid">Kid</SelectItem>
                    <SelectItem value="teen">Teen</SelectItem>
                    <SelectItem value="adult">Adult</SelectItem>
                    <SelectItem value="library-worker">Library worker</SelectItem>
                    <SelectItem value="educator">Educator</SelectItem>
                    <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide">Upload a picture</label>
                <label className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-black rounded-2xl p-5 bg-[#ffe66d]/60 cursor-pointer hover:bg-[#ffe66d] transition">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Uploaded card preview" className="w-full h-48 object-cover rounded-xl border-4 border-black" />
                  ) : (
                    <>
                      <ImagePlus className="w-10 h-10 text-black" />
                      <span className="font-black text-sm uppercase tracking-wide text-center">Add a photo of your card, display, or discovery moment</span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
                <p className="text-xs text-slate-600 font-medium">Please avoid uploading photos with private information or anyone who has not agreed to be pictured.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide">Anything else you want to tell us?</label>
                <Textarea
                  className="border-3 border-black rounded-xl focus-visible:ring-[#ff4fd8]"
                  placeholder="Tell us what you thought of the card, where you found it, or which librarian you hope to see next."
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full rounded-2xl text-base py-6 bg-black hover:bg-slate-800 border-4 border-black shadow-[5px_5px_0px_#ff4fd8] font-black uppercase tracking-wide">
                <Send className="w-4 h-4 mr-2" />
                Submit My Card Story
              </Button>

              <p className="text-xs text-slate-600 leading-relaxed text-center font-medium">
                We use this information to understand how the card project is shared. Public posts and photos should be approved before they appear live.
              </p>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-6xl mx-auto pb-10 relative z-10">
        <div className="bg-[#ffe66d] border-4 border-black rounded-3xl p-6 md:p-8 shadow-[12px_12px_0px_#111]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#ff4fd8] text-white px-3 py-1 rounded-full border-2 border-black text-xs font-black uppercase tracking-wide mb-3">
                <Zap className="w-3 h-3" />
                Quest Progress
              </div>
              <h2 className="text-4xl font-black text-slate-950">The adventure so far</h2>
              <p className="text-slate-800 font-medium mt-2">A retro-style snapshot of where the library legends are traveling.</p>
            </div>
            <div className="bg-black text-[#b6ff6d] border-4 border-white rounded-2xl px-5 py-4 font-mono text-xl shadow-[6px_6px_0px_#ff4fd8]">
              VISITORS: 000{posts.length + 437}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
            <div className="bg-white border-4 border-black rounded-2xl p-5 shadow-[5px_5px_0px_#111]">
              <QrCode className="w-7 h-7 mb-2" />
              <p className="text-3xl font-black">{posts.length + 124}</p>
              <p className="font-black uppercase text-sm text-slate-700">Total Scans</p>
            </div>
            <div className="bg-[#b6ff6d] border-4 border-black rounded-2xl p-5 shadow-[5px_5px_0px_#111]">
              <MessageSquare className="w-7 h-7 mb-2" />
              <p className="text-3xl font-black">{posts.length}</p>
              <p className="font-black uppercase text-sm text-slate-700">Stories Shared</p>
            </div>
            <div className="bg-white border-4 border-black rounded-2xl p-5 shadow-[5px_5px_0px_#111]">
              <MapPin className="w-7 h-7 mb-2" />
              <p className="text-3xl font-black">7</p>
              <p className="font-black uppercase text-sm text-slate-700">Cities Reached</p>
            </div>
            <div className="bg-[#ff4fd8] text-white border-4 border-black rounded-2xl p-5 shadow-[5px_5px_0px_#111]">
              <Trophy className="w-7 h-7 mb-2" />
              <p className="text-3xl font-black">Brett</p>
              <p className="font-black uppercase text-sm text-white/90">Most Traveled</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto pb-10 relative z-10">
        <div className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 shadow-[12px_12px_0px_#111]">
          <div className="inline-flex items-center gap-2 bg-[#30c5ff] px-3 py-1 rounded-full border-2 border-black text-xs font-black uppercase tracking-wide mb-3">
            <BookMarked className="w-3 h-3" />
            Library Legends Binder
          </div>
          <h2 className="text-4xl font-black text-slate-950">Explore the collection</h2>
          <p className="text-slate-700 font-medium mt-2 mb-6">A digital binder for the famous librarian cards. Each legend can eventually have their own page, scan count, fun fact, and travel history.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {["William Howard Brett", "Pura Belpré", "Linda Anne Eastman"].map((name, index) => (
              <div key={name} className={`${index === 1 ? "bg-[#b6ff6d]" : "bg-[#ffe66d]"} border-4 border-black rounded-2xl p-5 shadow-[5px_5px_0px_#111] rotate-${index === 0 ? "[-1deg]" : index === 1 ? "[1deg]" : "[-1deg]"}`}>
                <p className="text-xs font-black uppercase tracking-wide text-slate-700">Card #{String(index + 1).padStart(3, "0")}</p>
                <h3 className="text-2xl font-black text-slate-950 mt-1">{name}</h3>
                <p className="text-sm font-medium text-slate-800 mt-2">Scans, stories, locations, and secret library facts will live here.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto pb-16 relative z-10">
        <div className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 shadow-[12px_12px_0px_#111]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b-4 border-black pb-5 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#b6ff6d] px-3 py-1 rounded-full border-2 border-black text-xs font-black uppercase tracking-wide mb-3">
                <MessageSquare className="w-3 h-3" />
                Card Stories Wall
              </div>
              <h2 className="text-4xl font-black text-slate-950">Where the cards have been</h2>
              <p className="text-slate-700 font-medium mt-2">See how people are finding and sharing the famous librarian cards.</p>
            </div>
            <div className="bg-[#ff4fd8] text-white border-4 border-black rounded-2xl px-5 py-3 shadow-[5px_5px_0px_#111] font-black uppercase text-sm">
              {posts.length} stories posted
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Card key={post.id} className={`rounded-3xl border-4 border-black shadow-[7px_7px_0px_#111] overflow-hidden ${index % 2 === 0 ? "bg-[#ffe66d]" : "bg-[#b6ff6d]"}`}>
                {post.image ? (
                  <img src={post.image} alt={`${post.cardName} card story`} className="w-full h-44 object-cover border-b-4 border-black" />
                ) : (
                  <div className="w-full h-44 bg-[#ff4fd8] border-b-4 border-black flex items-center justify-center">
                    <Camera className="w-14 h-14 text-white" />
                  </div>
                )}
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-700">Card scanned</p>
                      <h3 className="text-2xl font-black text-slate-950 leading-tight">{post.cardName}</h3>
                    </div>
                    <div className="bg-white border-2 border-black rounded-full p-2">
                      <Heart className="w-4 h-4 text-[#ff4fd8]" />
                    </div>
                  </div>
                  <p className="text-slate-800 font-medium leading-relaxed">“{post.note}”</p>
                  <div className="space-y-2 pt-2 border-t-2 border-black/30">
                    <div className="flex items-center gap-2 text-sm font-black text-slate-800">
                      <QrCode className="w-4 h-4" />
                      {post.foundWhere}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-black text-slate-800">
                      <MapPin className="w-4 h-4" />
                      {post.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
