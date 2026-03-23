package com.moduplan.group.dto.request;

public record GroupCreateResponse(
        Long groupId
) {
    public static GroupCreateResponse from(Long groupId) {
        return new GroupCreateResponse(groupId);
    }
}
