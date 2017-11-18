import { Permissions, Notifications } from 'expo';

const NOTIFICATION_REPEAT = 'day'

const getNotification = () => ({
  title: 'Flashcards Quiz',
  body: `Remember to do today's Flashcards Quiz!`,
  ios: {
    sound: true,
  },
  android: {
    sound: true,
  },
})

const getNextLocalNotificationTimestamp = () => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  date.setHours(21)
  date.setMinutes(0)
  return date
}

export const clearLocalNotification = () =>
  Notifications.cancelAllScheduledNotificationsAsync()

export const requestNotificationPermission = () =>
  Permissions
    .askAsync(Permissions.NOTIFICATIONS)

export const setLocalNotification = () =>
  requestNotificationPermission()
    .then(({ status }) => {
      if (status === 'granted') {
        clearLocalNotification()
        Notifications.scheduleLocalNotificationAsync(getNotification(), {
          time: getNextLocalNotificationTimestamp(),
          repeat: NOTIFICATION_REPEAT,
        })
      }
      return status
  })