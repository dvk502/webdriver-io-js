export const AUTH_ENDPOINT = {
    preAuthenticate: '/auth/preAuthenticate',
    authenticate: '/auth/authenticate',
    tokenAuthenticate: '/auth/token-authenticate',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
};

export const EQUIPMENT = {
    base: "/equipment",
    byId: (equipmentId: string) => `/equipment/${equipmentId}`,
    history: (equipmentId: number) => `/equipment/${equipmentId}/history`,
    validation: "/equipment/validation",
    filteredHistory: (equipmentId: number) => `/equipment/${equipmentId}/history/list-by-filter`,
    archiveFiltered: "/equipment/archive/list-by-filter",
    inventoryFiltered: "/equipment/inventory/list-by-filter",
    ltFiltered: "/equipment/lt/list-by-filter",
    locationSelect: "/equipment/location/select",
    typeSelect: "/equipment/type/select",
    citySelect: "/equipment/city/select",
    roomSelect: "/equipment/room/select",
    status: (equipmentId: string) => `/equipment/${equipmentId}/status`,
    approve: (equipmentId: string) => `/equipment/${equipmentId}/approve`,
    reject: (equipmentId: string) => `/equipment/${equipmentId}/reject`,
    file: (equipmentId: string, fileId: string) => `/equipment/${equipmentId}/file/${fileId}`,
    priceSelect: "/equipment/price/select",
    serialNumberSelect: "/equipment/serialNumber/select",
    equipmentNameSelect: "/equipment/equipmentName/select",
  };

  export const MEETING = {
    calendarEvent: '/calendar/event',
  };