export const EventName = {
    SPINE_ANIMATION: "SPINE_ANIMATION",
    MANUAL_ANIMATION: "MANUAL_ANIMATION",
    ACTIVE_UI: "ACTIVE_UI",
    RESET_CHARACTER: "RESET_CHARACTER",
}

export const NodeName = {
    CHARACTER: "Character",
}

export const AnimationClip = {
    CHARACTER_CLIP: "Character Clip",
}

export const EAnimationType = cc.Enum({
    TWEEN: 0,
    RUN_ACTION: 1,
    ANIMATION_CLIP: 2,
    RESET_CHARACTER: 3,
});