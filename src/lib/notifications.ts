// Push notification infrastructure for TheCalHub

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
}

// Check if push notifications are supported
export function isNotificationSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator;
}

// Request notification permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) {
    return 'denied';
  }
  return Notification.requestPermission();
}

// Get current permission status
export function getNotificationPermission(): NotificationPermission {
  if (!isNotificationSupported()) {
    return 'denied';
  }
  return Notification.permission;
}

// Register push subscription
export async function registerPushSubscription(): Promise<PushSubscription | null> {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFg4kr8FGH2R7i7K9cZeS2A5_UVVVHkL-YKQPo9x9M')
    });
    return subscription;
  } catch (error) {
    console.error('Failed to register push subscription:', error);
    return null;
  }
}

// Show a local notification
export async function showNotification(options: NotificationOptions): Promise<void> {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  await registration.showNotification(options.title, {
    body: options.body,
    icon: options.icon || '/icon-192.png',
    badge: options.badge || '/icon-192.png',
    tag: options.tag || 'thecalhub-notification',
    requireInteraction: options.requireInteraction || false
  });
}

// Helper to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Schedule a reminder notification
export function scheduleReminder(title: string, body: string, delayInMinutes: number = 60): void {
  // Store reminder in localStorage for persistence across page reloads
  const reminder = {
    title,
    body,
    scheduledAt: Date.now() + delayInMinutes * 60 * 1000
  };
  const reminders = JSON.parse(localStorage.getItem('calhub_reminders') || '[]');
  reminders.push(reminder);
  localStorage.setItem('calhub_reminders', JSON.stringify(reminders));
}

// Check and show due reminders (called on app load)
export async function checkReminders(): Promise<void> {
  const reminders = JSON.parse(localStorage.getItem('calhub_reminders') || '[]');
  const now = Date.now();
  const dueReminders = reminders.filter((r: { scheduledAt: number }) => r.scheduledAt <= now);

  for (const reminder of dueReminders) {
    await showNotification({ title: reminder.title, body: reminder.body });
  }

  // Remove processed reminders
  const remaining = reminders.filter((r: { scheduledAt: number }) => r.scheduledAt > now);
  localStorage.setItem('calhub_reminders', JSON.stringify(remaining));
}