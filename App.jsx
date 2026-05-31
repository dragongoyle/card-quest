import React, { useState } from 'react'
import {
  QrCode,
  Sparkles,
  Send,
  Library,
  Star,
  CassetteTape,
  Camera,
  ImagePlus,
  MessageSquare,
  MapPin,
  Heart,
  Globe2,
  Trophy,
  BookMarked,
  Zap,
} from 'lucide-react'

const starterPosts = [
  {
    id: 1,
    cardName: 'Pura Belpré',
    foundWhere: 'Library program',
    location: 'Bryan, Ohio',
    ageGroup: 'Adult',
    note: 'I picked this up after a library event and loved learning about a librarian I had never heard of before!',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    cardName: 'William Howard Brett',
    foundWhere: 'Conference table',
    location: 'Cleveland, Ohio',
    ageGroup: 'Library worker',
    note: 'Found this at a conference display. Such a fun idea for getting people talking about library history.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    cardName: 'Mystery Librarian Card',
    foundWhere: 'From a friend',
    location: 'Shared by a coworker',
    ageGroup: 'Teen',
    note: 'Now I want to collect the whole set. The QR code made it feel like a secret library quest.',
    image: '',
  },
]

const foundWhereLabels = {
  'library-program': 'Library program',
  'library-branch': 'Library branch',
  conference: 'Conference or convention',
  school: 'School visit',
  staff: 'Library staff',
  friend: 'Friend or family',
  'community-event': 'Community event',
  other: 'Other',
}

function Button({ children, ...props }) {
  return <button className="button" {...props}>{children}</button>
}

function Field({ label, children, help }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      {help && <p className="help-text">{help}</p>}
    </div>
  )
}

export default function App() {
  const [submitted, setSubmitted] = useState(false)
  const [posts, setPosts] = useState(starterPosts)
  const [photoPreview, setPhotoPreview] = useState('')
  const [form, setForm] = useState({
    cardName: '',
    foundWhere: '',
    location: '',
    ageGroup: '',
    note: '',
  })

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => setPhotoPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPost = {
      id: Date.now(),
      cardName: form.cardName || 'Unknown card',
      foundWhere: foundWhereLabels[form.foundWhere] || 'Not listed',
      location: form.location || 'Location not shared',
      ageGroup: form.ageGroup || 'Prefer not to say',
      note: form.note || 'No note added.',
      image: photoPreview,
      submittedAt: new Date().toISOString(),
      qrSource: new URLSearchParams(window.location.search).get('card') || 'unknown-card',
    }

    console.log('QR Card Tracking Submission:', newPost)
    setPosts([newPost, ...posts])
    setSubmitted(true)
  }

  const resetForm = () => {
    setSubmitted(false)
    setPhotoPreview('')
    setForm({ cardName: '', foundWhere: '', location: '', ageGroup: '', note: '' })
  }

  if (submitted) {
    return (
      <main className="thank-you-page">
        <div className="dot-background" />
        <section className="thank-you-card">
          <div className="icon-box pink"><Sparkles size={42} /></div>
          <h1>Totally submitted!</h1>
          <p>Your response helps us see how far these famous librarian cards travel and how people discover the library.</p>
          <p className="small-note">Your story has been added to the demo card wall. On the real website, posts and photos should be approved before showing publicly.</p>
          <Button onClick={resetForm}>Add Another Card Story</Button>
        </section>
      </main>
    )
  }

  return (
    <main className="site-shell">
      <div className="pattern-background" />
      <div className="shape circle" />
      <div className="shape rectangle" />
      <div className="starburst one">★</div>
      <div className="starburst two">✦</div>

      <section className="hero-grid">
        <div className="hero-left">
          <div className="pill yellow"><QrCode size={20} /> Scan the Stacks</div>

          <div className="hero-card tilt-left">
            <div className="mini-label"><CassetteTape size={20} /> Famous Librarian Card Project</div>
            <h1>You found a library legend.</h1>
            <p>These collectible cards celebrate famous librarians and library leaders who helped shape what libraries are today. Tell us how you got your card so we can track where the project travels.</p>
          </div>

          <div className="quest-card tilt-right">
            <div className="icon-box black"><Library size={28} /></div>
            <div>
              <div className="badge white"><Globe2 size={14} /> Card Quest</div>
              <h2>How Far Can a Library Legend Travel?</h2>
              <p>Help us track the journey of these famous librarian cards as they travel through libraries, conferences, schools, and communities. Every scan adds another stop to the adventure.</p>
            </div>
          </div>
        </div>

        <section className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <div className="badge pink"><Star size={14} /> Card Check-In</div>
              <h2>Tell us about your card</h2>
              <p>No personal information is required.</p>
            </div>

            <Field label="Which card did you scan?">
              <input placeholder="Example: William Howard Brett, Pura Belpré, etc." value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })} />
            </Field>

            <Field label="How did you get the card?">
              <select value={form.foundWhere} onChange={(e) => setForm({ ...form, foundWhere: e.target.value })}>
                <option value="">Choose one</option>
                <option value="library-program">At a library program</option>
                <option value="library-branch">At a library branch</option>
                <option value="conference">At a conference or convention</option>
                <option value="school">At a school visit</option>
                <option value="staff">From library staff</option>
                <option value="friend">From a friend or family member</option>
                <option value="community-event">At a community event</option>
                <option value="other">Other</option>
              </select>
            </Field>

            <Field label="Where are you visiting from?">
              <input placeholder="City, state, branch, or event name" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </Field>

            <Field label="Who are you?">
              <select value={form.ageGroup} onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}>
                <option value="">Choose one</option>
                <option value="Kid">Kid</option>
                <option value="Teen">Teen</option>
                <option value="Adult">Adult</option>
                <option value="Library worker">Library worker</option>
                <option value="Educator">Educator</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </Field>

            <Field label="Upload a picture" help="Please avoid uploading photos with private information or anyone who has not agreed to be pictured.">
              <label className="upload-box">
                {photoPreview ? (
                  <img src={photoPreview} alt="Uploaded card preview" />
                ) : (
                  <>
                    <ImagePlus size={42} />
                    <span>Add a photo of your card, display, or discovery moment</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            </Field>

            <Field label="Anything else you want to tell us?">
              <textarea placeholder="Tell us what you thought of the card, where you found it, or which librarian you hope to see next." value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
            </Field>

            <Button type="submit"><Send size={18} /> Submit My Card Story</Button>
            <p className="privacy-note">We use this information to understand how the card project is shared. Public posts and photos should be approved before they appear live.</p>
          </form>
        </section>
      </section>

      <section className="progress-section">
        <div className="section-card yellow-card">
          <div className="section-heading-row">
            <div>
              <div className="badge pink"><Zap size={14} /> Quest Progress</div>
              <h2>The adventure so far</h2>
              <p>A retro-style snapshot of where the library legends are traveling.</p>
            </div>
            <div className="visitor-counter">VISITORS: 000{posts.length + 437}</div>
          </div>

          <div className="stat-grid">
            <div className="stat-card"><QrCode /><strong>{posts.length + 124}</strong><span>Total Scans</span></div>
            <div className="stat-card green"><MessageSquare /><strong>{posts.length}</strong><span>Stories Shared</span></div>
            <div className="stat-card"><MapPin /><strong>7</strong><span>Cities Reached</span></div>
            <div className="stat-card pink-stat"><Trophy /><strong>Brett</strong><span>Most Traveled</span></div>
          </div>
        </div>
      </section>

      <section className="binder-section">
        <div className="section-card white-card">
          <div className="badge blue"><BookMarked size={14} /> Library Legends Binder</div>
          <h2>Explore the collection</h2>
          <p>A digital binder for the famous librarian cards. Each legend can eventually have their own page, scan count, fun fact, and travel history.</p>
          <div className="binder-grid">
            {['William Howard Brett', 'Pura Belpré', 'Linda Anne Eastman'].map((name, index) => (
              <div key={name} className={`binder-card ${index === 1 ? 'green' : 'yellow'}`}>
                <span>Card #{String(index + 1).padStart(3, '0')}</span>
                <h3>{name}</h3>
                <p>Scans, stories, locations, and secret library facts will live here.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stories-section">
        <div className="section-card white-card">
          <div className="section-heading-row border-bottom">
            <div>
              <div className="badge green"><MessageSquare size={14} /> Card Stories Wall</div>
              <h2>Where the cards have been</h2>
              <p>See how people are finding and sharing the famous librarian cards.</p>
            </div>
            <div className="story-count">{posts.length} stories posted</div>
          </div>

          <div className="stories-grid">
            {posts.map((post, index) => (
              <article key={post.id} className={`story-card ${index % 2 === 0 ? 'yellow' : 'green'}`}>
                {post.image ? (
                  <img className="story-image" src={post.image} alt={`${post.cardName} card story`} />
                ) : (
                  <div className="story-placeholder"><Camera size={54} /></div>
                )}
                <div className="story-body">
                  <div className="story-title-row">
                    <div>
                      <span>Card scanned</span>
                      <h3>{post.cardName}</h3>
                    </div>
                    <div className="heart"><Heart size={18} /></div>
                  </div>
                  <p className="quote">“{post.note}”</p>
                  <div className="story-meta"><QrCode size={16} /> {post.foundWhere}</div>
                  <div className="story-meta"><MapPin size={16} /> {post.location}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
