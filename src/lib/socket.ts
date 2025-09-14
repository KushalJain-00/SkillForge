import { io, Socket } from 'socket.io-client';

// Socket configuration
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

class SocketService {
  private socket: Socket | null = null;
  private token: string | null = null;

  // Initialize socket connection
  connect(token: string) {
    if (this.socket?.connected) {
      return;
    }

    this.token = token;
    this.socket = io(SOCKET_URL, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
    });

    this.setupEventListeners();
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Setup event listeners
  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Project events
    this.socket.on('project:liked', (data) => {
      console.log('Project liked:', data);
      // Emit custom event for components to listen to
      window.dispatchEvent(new CustomEvent('project:liked', { detail: data }));
    });

    this.socket.on('project:unliked', (data) => {
      console.log('Project unliked:', data);
      window.dispatchEvent(new CustomEvent('project:unliked', { detail: data }));
    });

    this.socket.on('project:like:update', (data) => {
      console.log('Project like update:', data);
      window.dispatchEvent(new CustomEvent('project:like:update', { detail: data }));
    });

    this.socket.on('project:commented', (data) => {
      console.log('Project commented:', data);
      window.dispatchEvent(new CustomEvent('project:commented', { detail: data }));
    });

    this.socket.on('project:comment:new', (data) => {
      console.log('New project comment:', data);
      window.dispatchEvent(new CustomEvent('project:comment:new', { detail: data }));
    });

    // Forum events
    this.socket.on('forum:replied', (data) => {
      console.log('Forum replied:', data);
      window.dispatchEvent(new CustomEvent('forum:replied', { detail: data }));
    });

    this.socket.on('forum:reply:new', (data) => {
      console.log('New forum reply:', data);
      window.dispatchEvent(new CustomEvent('forum:reply:new', { detail: data }));
    });

    // User events
    this.socket.on('user:status', (data) => {
      console.log('User status update:', data);
      window.dispatchEvent(new CustomEvent('user:status', { detail: data }));
    });

    this.socket.on('user:offline', (data) => {
      console.log('User offline:', data);
      window.dispatchEvent(new CustomEvent('user:offline', { detail: data }));
    });

    // Typing indicators
    this.socket.on('typing:start', (data) => {
      window.dispatchEvent(new CustomEvent('typing:start', { detail: data }));
    });

    this.socket.on('typing:stop', (data) => {
      window.dispatchEvent(new CustomEvent('typing:stop', { detail: data }));
    });

    // Error handling
    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
      window.dispatchEvent(new CustomEvent('socket:error', { detail: error }));
    });
  }

  // Project methods
  likeProject(projectId: string) {
    if (this.socket) {
      this.socket.emit('project:like', { projectId });
    }
  }

  commentOnProject(projectId: string, content: string) {
    if (this.socket) {
      this.socket.emit('project:comment', { projectId, content });
    }
  }

  // Forum methods
  replyToPost(postId: string, content: string, parentId?: string) {
    if (this.socket) {
      this.socket.emit('forum:reply', { postId, content, parentId });
    }
  }

  // Room management
  joinRoom(room: string) {
    if (this.socket) {
      this.socket.emit('join:room', room);
    }
  }

  leaveRoom(room: string) {
    if (this.socket) {
      this.socket.emit('leave:room', room);
    }
  }

  // Typing indicators
  startTyping(type: string, id: string) {
    if (this.socket) {
      this.socket.emit('typing:start', { type, id });
    }
  }

  stopTyping(type: string, id: string) {
    if (this.socket) {
      this.socket.emit('typing:stop', { type, id });
    }
  }

  // Status updates
  updateStatus(status: string) {
    if (this.socket) {
      this.socket.emit('status:update', { status });
    }
  }

  // Get socket instance
  getSocket() {
    return this.socket;
  }

  // Check if connected
  isConnected() {
    return this.socket?.connected || false;
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;
