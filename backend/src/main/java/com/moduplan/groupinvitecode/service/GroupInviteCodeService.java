package com.moduplan.groupinvitecode.service;

import com.moduplan.groupinvitecode.dto.GroupInviteCodeCreateResponse;

public interface GroupInviteCodeService {

    GroupInviteCodeCreateResponse createInviteCode(Long userId, Long groupId);

    GroupInviteCodeCreateResponse getInviteCode(Long userId, Long groupId);

    GroupInviteCodeCreateResponse regenerateInviteCode(Long userId, Long groupId);
}
