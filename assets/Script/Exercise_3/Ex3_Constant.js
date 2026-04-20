export const EventName = {
    SPINE_ANIMATION: "SPINE_ANIMATION",
    MANUAL_ANIMATION: "MANUAL_ANIMATION",
    RESET_CHARACTER: "RESET_CHARACTER",
    ACTIVE_UI: "ACTIVE_UI",
}

export const NodeName = {
    CHARACTER: "Character",
}

export const EAnimationType = cc.Enum({
    TWEEN: 0,
    RUN_ACTION: 1,
    ANIMATION_CLIP: 2,
    RESET_CHARACTER: 3,
});