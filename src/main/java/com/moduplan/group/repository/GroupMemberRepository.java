package com.moduplan.group.repository;

import com.moduplan.group.entity.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;



public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {
}
