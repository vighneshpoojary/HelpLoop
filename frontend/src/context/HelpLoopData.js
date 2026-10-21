// HelpLoop — Comprehensive Mock Dataset matching design mockups

export const CURRENT_USER = {
  id: "usr_vighnesh",
  name: "Vighnesh S",
  handle: "@vighnesh_cs",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  bio: "Student, Volunteer & Community Builder · Malpe Beach Cleanups organizer",
  role: "admin", // Toggle between "user" and "admin" for verification queue
  level: 3,
  goodnessPoints: 420,
  stats: {
    posts: 12,
    events: 5,
    communities: 8,
    impact: 23
  },
  badges: [
    { id: "b1", title: "Verified Volunteer", icon: "badge-check", color: "emerald", desc: "Completed 5+ on-ground activities" },
    { id: "b2", title: "Community Builder", icon: "users", color: "blue", desc: "Organized 3+ successful events" },
    { id: "b3", title: "First Responder", icon: "shield", color: "purple", desc: "Assisted in emergency food drives" }
  ],
  recentActivities: [
    { id: "act_1", title: "Malpe Beach Cleanup Drive", category: "Volunteering Event", date: "Apr 24, 2025", points: 50, icon: "tree" },
    { id: "act_2", title: "Organized Food Drive Kits Distribution", category: "Community Support", date: "Apr 20, 2025", points: 30, icon: "heart" },
    { id: "act_3", title: "Submitted Verified Impact Update", category: "Impact Report", date: "Apr 15, 2025", points: 20, icon: "check" }
  ]
};

export const CATEGORIES = [
  {
    id: "medical",
    name: "Medical Help",
    subtitle: "Treatment, surgery, medicines & hospital bills",
    color: "#ef4444",
    bgLight: "bg-red-50 text-red-600 border-red-200",
    activeCount: 12,
    icon: "HeartPulse"
  },
  {
    id: "education",
    name: "Educational Help",
    subtitle: "Fees, books, learning resources & scholarships",
    color: "#0284c7",
    bgLight: "bg-sky-50 text-sky-600 border-sky-200",
    activeCount: 18,
    icon: "GraduationCap"
  },
  {
    id: "food",
    name: "Food & Essentials",
    subtitle: "Groceries, clothing, hygiene & supplies",
    color: "#f59e0b",
    bgLight: "bg-amber-50 text-amber-600 border-amber-200",
    activeCount: 9,
    icon: "UtensilsCrossed"
  },
  {
    id: "volunteering",
    name: "Camps & Volunteering",
    subtitle: "Cleanups, plantation, blood donation & drives",
    color: "#10b981",
    bgLight: "bg-emerald-50 text-emerald-600 border-emerald-200",
    activeCount: 6,
    icon: "Trees"
  },
  {
    id: "disaster",
    name: "Disaster & Emergency",
    subtitle: "Relief, urgent household assistance & recovery",
    color: "#6366f1",
    bgLight: "bg-indigo-50 text-indigo-600 border-indigo-200",
    activeCount: 7,
    icon: "AlertTriangle"
  },
  {
    id: "financial",
    name: "Other Financial Help",
    subtitle: "Household, elderly care & verified money needs",
    color: "#8b5cf6",
    bgLight: "bg-purple-50 text-purple-600 border-purple-200",
    activeCount: 5,
    icon: "Banknote"
  },
  {
    id: "community",
    name: "Community Activities",
    subtitle: "Local drives, youth awareness & social initiatives",
    color: "#0d9488",
    bgLight: "bg-teal-50 text-teal-600 border-teal-200",
    activeCount: 11,
    icon: "Users"
  }
];

export const INITIAL_STORIES = [
  { id: "st_1", title: "Your Story", isUser: true, avatar: CURRENT_USER.avatar },
  { id: "st_2", title: "HelpLoop", isOfficial: true, verified: true, avatar: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150&auto=format&fit=crop&q=80" },
  { id: "st_3", title: "Education", avatar: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=150&auto=format&fit=crop&q=80" },
  { id: "st_4", title: "Medical", avatar: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=150&auto=format&fit=crop&q=80" },
  { id: "st_5", title: "Food", avatar: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&auto=format&fit=crop&q=80" },
  { id: "st_6", title: "Volunteering", avatar: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&auto=format&fit=crop&q=80" },
  { id: "st_7", title: "Community", avatar: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=150&auto=format&fit=crop&q=80" }
];

export const INITIAL_POSTS = [
  {
    id: "post_1",
    type: "campaign",
    author: "Sneha M.",
    authorHandle: "@sneha_m",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    verified: true,
    timeAgo: "2h ago",
    category: "Medical Help",
    location: "Mangalore",
    caption: "I just contributed to a cancer treatment fund for a brave soul. Even a small help can make a big difference! 💙",
    media: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    likes: 124,
    comments: 18,
    shares: 14,
    isLiked: false,
    isSaved: false,
    likedBy: "Liked by Rohan, Priya and 122 others",
    campaignData: {
      id: "camp_1",
      title: "Cancer Treatment Support",
      verified: true,
      verifiedDate: "Apr 20, 2025",
      raisedAmount: 32500,
      targetAmount: 100000,
      percent: 32,
      supportersCount: 126,
      daysLeft: 14,
      evidenceSummary: [
        "Relevant hospital estimate received from KMC Oncology Department",
        "Stated purpose and requested amount reviewed against medical schedule",
        "Identity verification completed (limited scope to safeguard privacy)"
      ],
      intendedUse: "Chemotherapy medications, supportive therapy, and surgical ward stay.",
      privacyNotice: "Original supporting documents and sensitive medical records are strictly private and available only to authorized reviewers.",
      disclaimer: "Verification means the specified evidence checks were completed. It does not guarantee that every claim is true or that a particular medical outcome will occur."
    }
  },
  {
    id: "post_2",
    type: "event",
    author: "Arjun P.",
    authorHandle: "@arjun_p",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verified: true,
    timeAgo: "5h ago",
    category: "Camps & Volunteering",
    location: "Udupi",
    caption: "Beach Cleanup Drive this Sunday! 🌊 Join us on 23rd April at Malpe Beach for a cleaner and greener tomorrow. All are welcome! Let's make a difference together.",
    media: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80",
    likes: 83,
    comments: 7,
    shares: 22,
    isLiked: false,
    isSaved: false,
    eventData: {
      id: "evt_1",
      title: "Beach Cleanup Drive",
      date: "23 Apr 2025",
      time: "7:00 AM - 10:00 AM",
      location: "Malpe Beach, Udupi",
      category: "Community Event",
      joinedCount: 48,
      capacity: 60,
      isJoined: false,
      whatToBring: ["Gloves", "Water bottle", "Comfortable clothes"],
      organizer: "Eco Warriors Udupi"
    }
  },
  {
    id: "post_3",
    type: "impact",
    author: "Arjun Rao",
    authorHandle: "@arjun_rao",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    verified: true,
    timeAgo: "4h ago",
    category: "Food & Essentials",
    location: "City Center",
    caption: "Food Distribution Drive – Success! Thanks to everyone who contributed! Our volunteer team delivered food kits to 130 families in the city yesterday. Grateful for your support! 💖",
    media: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
    likes: 412,
    comments: 56,
    shares: 34,
    isLiked: true,
    isSaved: true,
    impactData: {
      kitsDelivered: 130,
      familiesSupported: 130,
      volunteersCount: 18
    }
  },
  {
    id: "post_4",
    type: "campaign",
    author: "Sneha R.",
    authorHandle: "@sneha_r",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    verified: true,
    timeAgo: "1d ago",
    category: "Educational Help",
    location: "Mangalore",
    caption: "College Fee Assistance for My Education. I am a final year B.Tech student needing financial support to pay my college fees. This will help me continue my education and achieve my dream.",
    media: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    likes: 156,
    comments: 12,
    shares: 28,
    isLiked: false,
    isSaved: false,
    campaignData: {
      id: "camp_2",
      title: "College Fee Assistance for My Education",
      verified: true,
      verifiedDate: "Apr 20, 2025",
      raisedAmount: 18000,
      targetAmount: 40000,
      percent: 45,
      supportersCount: 126,
      daysLeft: 12,
      evidenceSummary: [
        "Fee statement document received & reviewed from College Registrar",
        "Request details checked against published tuition structure",
        "Identity verification completed (Limited scope for privacy)"
      ],
      intendedUse: "Direct semester tuition fee payment to college exam cell.",
      privacyNotice: "Original educational certificates and financial statements are kept strictly private.",
      disclaimer: "Verification indicates evidence checks were completed."
    }
  }
];

export const INITIAL_COMMUNITIES = [
  {
    id: "comm_1",
    name: "Medical Support",
    category: "Medical Help",
    membersCount: "12.4K",
    membersNumber: 12400,
    isJoined: false,
    color: "#ef4444",
    avatar: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=150&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    description: "Rapid assistance for urgent medical treatments, blood needs, and hospital assistance.",
    sharedGoal: null
  },
  {
    id: "comm_2",
    name: "Education for All",
    category: "Educational Help",
    membersCount: "8.7K",
    membersNumber: 8700,
    isJoined: true,
    color: "#0284c7",
    avatar: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=150&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    description: "A community focused on supporting education for underprivileged students. Let's build a brighter future together!",
    sharedGoal: {
      title: "Books & Educational Supplies for 50 Students",
      target: 50000,
      raised: 34000,
      percent: 68,
      supportersCount: 94,
      sponsorMatch: {
        sponsorName: "Apex Foundation",
        matchAmount: 10000,
        remaining: 6000,
        multiplier: "1.5x Match"
      }
    }
  },
  {
    id: "comm_3",
    name: "Food Relief",
    category: "Food & Essentials",
    membersCount: "15.2K",
    membersNumber: 15200,
    isJoined: false,
    color: "#f59e0b",
    avatar: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
    description: "Coordinating grocery kits, daily meals, and immediate rations for vulnerable families.",
    sharedGoal: null
  },
  {
    id: "comm_4",
    name: "Clean & Green",
    category: "Camps & Volunteering",
    membersCount: "6.3K",
    membersNumber: 6300,
    isJoined: true,
    color: "#10b981",
    avatar: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80",
    description: "Beach cleanups, park restorations, sapling plantations, and zero-waste community campaigns.",
    sharedGoal: null
  },
  {
    id: "comm_5",
    name: "Blood Donors Network",
    category: "Medical Help",
    membersCount: "10.1K",
    membersNumber: 10100,
    isJoined: false,
    color: "#dc2626",
    avatar: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=150&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&auto=format&fit=crop&q=80",
    description: "Immediate matching between registered donors and emergency hospital requirements.",
    sharedGoal: null
  }
];

export const INITIAL_EVENTS = [
  {
    id: "evt_1",
    title: "Beach Cleanup Drive",
    category: "Camps & Volunteering",
    type: "Upcoming",
    date: "23 Apr 2025",
    time: "7:00 AM - 10:00 AM",
    location: "Malpe Beach, Udupi",
    cover: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80",
    joinedCount: 48,
    capacity: 60,
    isJoined: true,
    organizer: "Udupi Youth Eco Club",
    verified: true,
    description: "Join us this Sunday morning at Malpe Beach to clear plastic debris and preserve our coastline. Refreshments and cleanup kits will be provided.",
    whatToBring: ["Gloves", "Water bottle", "Comfortable clothes", "Sun hat"]
  },
  {
    id: "evt_2",
    title: "Blood Donation Camp",
    category: "Medical Help",
    type: "Upcoming",
    date: "27 Apr 2025",
    time: "9:00 AM - 2:00 PM",
    location: "District Hospital, Mangalore",
    cover: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&auto=format&fit=crop&q=80",
    joinedCount: 120,
    capacity: 150,
    isJoined: false,
    organizer: "Red Cross & HelpLoop Volunteers",
    verified: true,
    description: "Annual voluntary blood donation drive organized in collaboration with District Hospital Blood Bank. Every unit saves three lives.",
    whatToBring: ["Valid Photo ID Proof", "Rest well beforehand", "Drink plenty of water"]
  },
  {
    id: "evt_3",
    title: "Tree Plantation Drive",
    category: "Camps & Volunteering",
    type: "Upcoming",
    date: "03 May 2025",
    time: "7:30 AM - 11:30 AM",
    location: "City Park, Mangalore",
    cover: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
    joinedCount: 76,
    capacity: 100,
    isJoined: false,
    organizer: "Green Mangalore Initiative",
    verified: true,
    description: "Planting 300 native fruit and shade saplings along the outer perimeter of City Park to boost urban biodiversity.",
    whatToBring: ["Gardening boots or sneakers", "Reusable water flask"]
  },
  {
    id: "evt_4",
    title: "Food Kit Distribution Drive",
    category: "Food & Essentials",
    type: "Past",
    date: "10 Apr 2025",
    time: "Completed",
    location: "Community Center, Ward 14",
    cover: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
    joinedCount: 36,
    capacity: 40,
    isJoined: true,
    organizer: "HelpLoop Food Relief",
    verified: true,
    description: "Successfully packed and handed out 130 comprehensive ration kits with rice, dal, oil and hygiene products.",
    whatToBring: []
  }
];

export const INITIAL_CHATS = [
  {
    id: "chat_1",
    title: "Education for All",
    subtitle: "1.2K members · Public Community",
    type: "community",
    pinned: "Next community meeting on April 28 at 6 PM. Join in with stationery distribution updates.",
    avatar: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=150&auto=format&fit=crop&q=80",
    unread: 0,
    time: "1:04 PM",
    messages: [
      {
        id: "m1",
        sender: "Ananya",
        senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        text: "Here's the updated list of required books for the upcoming drive.",
        time: "1:01 PM",
        isMe: false,
        attachment: { type: "file", name: "book_list_v2.pdf", size: "2.4 MB" }
      },
      {
        id: "m2",
        sender: "Rohan",
        senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        text: "I can help with distribution this weekend. Count me in for 4 hours on Saturday!",
        time: "1:03 PM",
        isMe: false
      },
      {
        id: "m3",
        sender: "You",
        senderAvatar: CURRENT_USER.avatar,
        text: "Great! Let's confirm the venue in the group.",
        time: "1:07 PM",
        isMe: true
      },
      {
        id: "m4",
        sender: "Admin",
        senderAvatar: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=100&auto=format&fit=crop&q=80",
        text: "Event details have been updated. You can register directly below:",
        time: "1:10 PM",
        isMe: false,
        card: {
          type: "event",
          title: "Book & Stationery Distribution",
          date: "Apr 28 · 10:00 AM",
          location: "City Library, Mangalore",
          buttonText: "Join Event"
        }
      }
    ]
  },
  {
    id: "chat_2",
    title: "Medical Help Community",
    subtitle: "12.4K members",
    type: "community",
    avatar: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=150&auto=format&fit=crop&q=80",
    unread: 12,
    time: "10:24 AM",
    messages: [
      {
        id: "m_med_1",
        sender: "Rohan",
        senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        text: "New blood donation camp posted at District Hospital on 27th April.",
        time: "10:24 AM",
        isMe: false
      }
    ]
  },
  {
    id: "chat_3",
    title: "Beach Cleanup Volunteers",
    subtitle: "48 members · Active Squad",
    type: "group",
    avatar: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&auto=format&fit=crop&q=80",
    unread: 4,
    time: "08:32 AM",
    messages: [
      {
        id: "m_bc_1",
        sender: "Arjun P.",
        senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        text: "We have arranged 100 extra biodegradable collection bags!",
        time: "08:30 AM",
        isMe: false
      },
      {
        id: "m_bc_2",
        sender: "You",
        senderAvatar: CURRENT_USER.avatar,
        text: "I'll be there! 😊",
        time: "08:32 AM",
        isMe: true
      }
    ]
  },
  {
    id: "chat_4",
    title: "HelpLoop Admin (Official)",
    subtitle: "System Channel",
    type: "official",
    avatar: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150&auto=format&fit=crop&q=80",
    unread: 0,
    time: "Mon",
    messages: [
      {
        id: "m_adm_1",
        sender: "HelpLoop Admin",
        senderAvatar: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=100&auto=format&fit=crop&q=80",
        text: "New event posted: Food distribution kits packing at Community Center. Volunteers earn 30 Goodness Points.",
        time: "Mon 9:00 AM",
        isMe: false
      }
    ]
  },
  {
    id: "chat_5",
    title: "Priya Sharma",
    subtitle: "Student & Volunteer",
    type: "direct",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    unread: 1,
    time: "1:23 PM",
    messages: [
      {
        id: "m_ps_1",
        sender: "Priya Sharma",
        senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        text: "Thanks for your support on the tuition drive!",
        time: "1:23 PM",
        isMe: false
      }
    ]
  }
];

export const SUGGESTED_PEOPLE = [
  { id: "sp_1", name: "Sneha R.", handle: "@sneha_r", cause: "Medical Support", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80", isFollowing: false },
  { id: "sp_2", name: "Rahul K.", handle: "@rahul_k", cause: "Education for All", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80", isFollowing: false },
  { id: "sp_3", name: "Ananya S.", handle: "@ananya_s", cause: "Food Relief", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", isFollowing: false },
  { id: "sp_4", name: "Karthik V.", handle: "@karthik_v", cause: "Volunteering", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", isFollowing: false }
];

export const INITIAL_VERIFICATION_QUEUE = [
  {
    id: "req_1",
    title: "Emergency Cancer Surgery Support",
    category: "Medical Help",
    author: "Sumitra Devi (via Sneha M.)",
    submittedDate: "Apr 20, 2025",
    requestedAmount: 100000,
    status: "Verified",
    priority: "High",
    evidenceType: "Hospital Estimate & Doctor Prescription",
    hospital: "KMC Hospital, Mangalore",
    documents: [
      { name: "KMC_Surgical_Estimate_Apr2025.pdf", size: "1.8 MB", verified: true },
      { name: "Oncology_Consultation_Note.pdf", size: "950 KB", verified: true },
      { name: "Patient_ID_Aadhaar_Redacted.jpg", size: "620 KB", verified: true }
    ],
    notes: "Estimate verified with KMC billing department. Stated purpose is chemotherapy and inpatient recovery."
  },
  {
    id: "req_2",
    title: "College Fee Assistance for Final Year B.Tech",
    category: "Educational Help",
    author: "Sneha R.",
    submittedDate: "Apr 20, 2025",
    requestedAmount: 40000,
    status: "Verified",
    priority: "Medium",
    evidenceType: "Registrar Fee Demand & Marksheet",
    hospital: "N.M.A.M Institute of Technology",
    documents: [
      { name: "College_Tuition_Fee_Demand_2025.pdf", size: "1.2 MB", verified: true },
      { name: "Semester_Marks_Statement.pdf", size: "840 KB", verified: true }
    ],
    notes: "Fee structure checked against university official notification. Request approved for public funding."
  },
  {
    id: "req_3",
    title: "Dialysis Equipment & Medicine Support",
    category: "Medical Help",
    author: "Ramesh Bhat",
    submittedDate: "Apr 21, 2025",
    requestedAmount: 65000,
    status: "Under Review",
    priority: "Urgent",
    evidenceType: "Dialysis Prescription & Monthly Bill",
    hospital: "District Wenlock Hospital",
    documents: [
      { name: "Dialysis_Prescription_Apr.pdf", size: "750 KB", verified: true },
      { name: "Pharmacy_Estimate_Quote.pdf", size: "1.1 MB", verified: false }
    ],
    notes: "Reviewer checking quotation with local pharmacy supplier. Awaiting itemized receipt."
  },
  {
    id: "req_4",
    title: "School Uniforms and Bags for 35 Rural Children",
    category: "Educational Help",
    author: "Belthangady Grama Seva",
    submittedDate: "Apr 21, 2025",
    requestedAmount: 24500,
    status: "Pending",
    priority: "Medium",
    evidenceType: "School Headmaster Endorsement & Tailor Quote",
    hospital: "Govt Higher Primary School, Belthangady",
    documents: [
      { name: "Headmaster_Request_Letter.pdf", size: "900 KB", verified: false },
      { name: "Supplier_Uniform_Quotation.pdf", size: "640 KB", verified: false }
    ],
    notes: "Initial document validation passed. Awaiting reviewer assignment."
  },
  {
    id: "req_5",
    title: "Post-Flood Roof Repair for Elderly Resident",
    category: "Disaster & Emergency",
    author: "Kavita Rao",
    submittedDate: "Apr 19, 2025",
    requestedAmount: 38000,
    status: "More Info Required",
    priority: "High",
    evidenceType: "Panchayat Damage Assessment & Contractor Bill",
    hospital: "Kundapura Taluk",
    documents: [
      { name: "Damage_Photos_Kundapura.jpg", size: "3.2 MB", verified: true },
      { name: "Contractor_Estimate_Pending_Sign.pdf", size: "520 KB", verified: false }
    ],
    notes: "Requested signed contractor estimate with valid GSTIN or local artisan declaration."
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif_1",
    type: "message",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    title: "New message from Priya Sharma",
    subtitle: "Thanks for your support!",
    time: "1:24 PM",
    unread: true
  },
  {
    id: "notif_2",
    type: "verification",
    avatar: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=100&auto=format&fit=crop&q=80",
    title: "College fee assistance request verified",
    subtitle: "Your request passed all evidence checks and is now live for contributions.",
    time: "11:48 AM",
    unread: true
  },
  {
    id: "notif_3",
    type: "community",
    avatar: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=100&auto=format&fit=crop&q=80",
    title: "HelpCircle milestone reached!",
    subtitle: "Education for All reached 68% of its shared target.",
    time: "10:30 AM",
    unread: false
  },
  {
    id: "notif_4",
    type: "event",
    avatar: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=100&auto=format&fit=crop&q=80",
    title: "Event Reminder: Malpe Beach Cleanup",
    subtitle: "Cleanup starts this Sunday at 7:00 AM.",
    time: "Yesterday",
    unread: false
  },
  {
    id: "notif_5",
    type: "impact",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    title: "Goodness Points Earned: +50",
    subtitle: "Your participation in the tree plantation drive was verified.",
    time: "2 days ago",
    unread: false
  }
];
