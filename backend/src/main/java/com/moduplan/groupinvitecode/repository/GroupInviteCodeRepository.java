package com.moduplan.groupinvitecode.repository;

import com.moduplan.groupinvitecode.entity.GroupInviteCode;
import com.moduplan.groupinvitecode.entity.GroupInviteCodeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupInviteCodeRepository extends JpaRepository<GroupInviteCode, Long> {
    boolean existsByCode(String code);

    Optional<GroupInviteCode> findByCodeAndStatus(String code, GroupInviteCodeStatus status);

    Optional<GroupInviteCode> findFirstByGroup_IdAndStatusOrderByCreatedAtDesc(Long groupId, GroupInviteCodeStatus status);
}
