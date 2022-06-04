export enum NotificationsType {
    event_create,
    event_update,
    event_delete,
    event_reminder,
    user_create,
}

export interface Notifications {
    type: NotificationsType,
    content: string,
    link: string | null,
}

