import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CURRENT_USER,
  CATEGORIES,
  INITIAL_STORIES,
  INITIAL_POSTS,
  INITIAL_COMMUNITIES,
  INITIAL_EVENTS,
  INITIAL_CHATS,
  SUGGESTED_PEOPLE,
  INITIAL_VERIFICATION_QUEUE,
  INITIAL_NOTIFICATIONS
} from "./HelpLoopData";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation & View State
  const [activeScreen, setActiveScreen] = useState("home"); // home, explore, communities, community_detail, messages, notifications, events, impact, profile, admin, settings, welcome
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [activeChatId, setActiveChatId] = useState("chat_1");

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Core Data Stores
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [stories, setStories] = useState(INITIAL_STORIES);
  const [communities, setCommunities] = useState(INITIAL_COMMUNITIES);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [suggestedPeople, setSuggestedPeople] = useState(SUGGESTED_PEOPLE);
  const [verificationQueue, setVerificationQueue] = useState(INITIAL_VERIFICATION_QUEUE);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createInitialTab, setCreateInitialTab] = useState("post"); // 'post', 'donate', 'event', 'request'
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [donateCampaignTarget, setDonateCampaignTarget] = useState(null);
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [activeReviewItem, setActiveReviewItem] = useState(null);
  const [isRequestDetailOpen, setIsRequestDetailOpen] = useState(false);
  const [activeRequestDetail, setActiveRequestDetail] = useState(null);

  // Sync dark mode class to HTML tag
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Social Feed Actions
  const toggleLikePost = (postId) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1)
          };
        }
        return p;
      })
    );
  };

  const toggleSavePost = (postId) => {
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  const addComment = (postId, text) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments + 1
          };
        }
        return p;
      })
    );
  };

  // Create Post / Help Request / Event
  const createNewPost = (postData) => {
    const newPost = {
      id: `post_${Date.now()}`,
      author: currentUser.name,
      authorHandle: currentUser.handle,
      authorAvatar: currentUser.avatar,
      verified: true,
      timeAgo: "Just now",
      location: postData.location || "Mangalore",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
      ...postData
    };
    setPosts(prev => [newPost, ...prev]);

    // Award goodness points
    awardPoints(15, "Published Community Social Post");
  };

  const createHelpRequest = (requestData) => {
    // 1. Add to Verification Queue as Pending
    const newReqId = `req_${Date.now()}`;
    const newQueueItem = {
      id: newReqId,
      title: requestData.title,
      category: requestData.category,
      author: currentUser.name,
      submittedDate: "Just now",
      requestedAmount: Number(requestData.amount),
      status: "Pending",
      priority: "Medium",
      evidenceType: requestData.evidenceType || "Supporting Invoices & Certificates",
      hospital: requestData.institution || "Local Institution",
      documents: requestData.documents || [
        { name: "Uploaded_Document_1.pdf", size: "1.4 MB", verified: false }
      ],
      notes: requestData.description
    };
    setVerificationQueue(prev => [newQueueItem, ...prev]);

    // 2. Also prepare a draft post (unverified/pending until approved)
    const newPost = {
      id: `post_${Date.now()}`,
      type: "campaign",
      author: currentUser.name,
      authorHandle: currentUser.handle,
      authorAvatar: currentUser.avatar,
      verified: false,
      timeAgo: "Under Review",
      category: requestData.category,
      location: requestData.location || "Mangalore",
      caption: requestData.description,
      media: requestData.image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
      campaignData: {
        id: `camp_${Date.now()}`,
        title: requestData.title,
        verified: false,
        verifiedDate: "Pending Human Review",
        raisedAmount: 0,
        targetAmount: Number(requestData.amount),
        percent: 0,
        supportersCount: 0,
        daysLeft: 30,
        evidenceSummary: [
          "Documents uploaded and encrypted securely",
          "Verification checks currently in progress by reviewer queue"
        ],
        intendedUse: requestData.intendedUse || requestData.description,
        privacyNotice: "Original files private and protected under HelpLoop confidentiality guidelines."
      }
    };
    setPosts(prev => [newPost, ...prev]);
  };

  // Contribute (Simulated Demo Donation)
  const contributeToCampaign = (campaignId, amount, isAnonymous = false) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.campaignData && p.campaignData.id === campaignId) {
          const newRaised = p.campaignData.raisedAmount + Number(amount);
          const percent = Math.min(100, Math.round((newRaised / p.campaignData.targetAmount) * 100));
          return {
            ...p,
            campaignData: {
              ...p.campaignData,
              raisedAmount: newRaised,
              percent,
              supportersCount: p.campaignData.supportersCount + 1
            }
          };
        }
        return p;
      })
    );

    // If matching community target exists, update it too
    setCommunities(prev =>
      prev.map(c => {
        if (c.sharedGoal) {
          const newRaised = c.sharedGoal.raised + Number(amount);
          const percent = Math.min(100, Math.round((newRaised / c.sharedGoal.target) * 100));
          return {
            ...c,
            sharedGoal: {
              ...c.sharedGoal,
              raised: newRaised,
              percent,
              supportersCount: c.sharedGoal.supportersCount + 1
            }
          };
        }
        return c;
      })
    );

    // Award Goodness Points for giving
    awardPoints(25, `Contributed ₹${amount} to Verified Cause`);
  };

  // Join Event
  const toggleJoinEvent = (eventId) => {
    setEvents(prev =>
      prev.map(e => {
        if (e.id === eventId) {
          const isJoined = !e.isJoined;
          return {
            ...e,
            isJoined,
            joinedCount: isJoined ? e.joinedCount + 1 : Math.max(0, e.joinedCount - 1)
          };
        }
        return e;
      })
    );

    setPosts(prev =>
      prev.map(p => {
        if (p.eventData && p.eventData.id === eventId) {
          const isJoined = !p.eventData.isJoined;
          return {
            ...p,
            eventData: {
              ...p.eventData,
              isJoined,
              joinedCount: isJoined ? p.eventData.joinedCount + 1 : Math.max(0, p.eventData.joinedCount - 1)
            }
          };
        }
        return p;
      })
    );

    awardPoints(50, "Registered for Community Volunteering Event");
  };

  // Join Community
  const toggleJoinCommunity = (communityId) => {
    setCommunities(prev =>
      prev.map(c => {
        if (c.id === communityId) {
          return { ...c, isJoined: !c.isJoined };
        }
        return c;
      })
    );
    awardPoints(20, "Joined HelpCircle Community");
  };

  // Telegram Chat Messaging
  const sendChatMessage = (chatId, text, card = null) => {
    const newMessage = {
      id: `m_${Date.now()}`,
      sender: "You",
      senderAvatar: currentUser.avatar,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
      card
    };

    setChats(prev =>
      prev.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: text,
            time: "Just now",
            messages: [...c.messages, newMessage]
          };
        }
        return c;
      })
    );
  };

  // Admin Verification Review Action
  const updateVerificationStatus = (reqId, newStatus, reviewerNotes) => {
    setVerificationQueue(prev =>
      prev.map(r => (r.id === reqId ? { ...r, status: newStatus, notes: reviewerNotes } : r))
    );

    // If verified, update corresponding post to verified
    if (newStatus === "Verified") {
      setPosts(prev =>
        prev.map(p => {
          if (p.campaignData && p.author === currentUser.name) {
            return {
              ...p,
              verified: true,
              campaignData: {
                ...p.campaignData,
                verified: true,
                verifiedDate: "Today"
              }
            };
          }
          return p;
        })
      );
    }
  };

  // Follow / Unfollow User
  const toggleFollowUser = (personId) => {
    setSuggestedPeople(prev =>
      prev.map(p => (p.id === personId ? { ...p, isFollowing: !p.isFollowing } : p))
    );
  };

  // Goodness Points Awarding
  const awardPoints = (points, title) => {
    setCurrentUser(prev => ({
      ...prev,
      goodnessPoints: prev.goodnessPoints + points,
      recentActivities: [
        {
          id: `act_${Date.now()}`,
          title,
          category: "Community Action",
          date: "Just now",
          points,
          icon: "heart"
        },
        ...prev.recentActivities
      ]
    }));
  };

  return (
    <AppContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        selectedCategory,
        setSelectedCategory,
        selectedCampaign,
        setSelectedCampaign,
        selectedEvent,
        setSelectedEvent,
        selectedCommunity,
        setSelectedCommunity,
        activeChatId,
        setActiveChatId,
        isDarkMode,
        toggleDarkMode,
        currentUser,
        setCurrentUser,
        posts,
        stories,
        communities,
        events,
        chats,
        suggestedPeople,
        verificationQueue,
        notifications,
        isCreateModalOpen,
        setIsCreateModalOpen,
        createInitialTab,
        setCreateInitialTab,
        isDonateModalOpen,
        setIsDonateModalOpen,
        donateCampaignTarget,
        setDonateCampaignTarget,
        isEventDetailOpen,
        setIsEventDetailOpen,
        isReviewModalOpen,
        setIsReviewModalOpen,
        activeReviewItem,
        setActiveReviewItem,
        isRequestDetailOpen,
        setIsRequestDetailOpen,
        activeRequestDetail,
        setActiveRequestDetail,
        toggleLikePost,
        toggleSavePost,
        addComment,
        createNewPost,
        createHelpRequest,
        contributeToCampaign,
        toggleJoinEvent,
        toggleJoinCommunity,
        sendChatMessage,
        updateVerificationStatus,
        toggleFollowUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
