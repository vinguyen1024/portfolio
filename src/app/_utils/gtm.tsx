type WindowWithDataLayer = Window & {
    dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export const gtmEvent = (data: object) => {
    window.dataLayer.push(data);
};