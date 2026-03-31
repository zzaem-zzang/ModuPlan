import { useGroupsQuery } from '../hooks/useGroups'
import { GroupCard } from '../components/groups/GroupCard'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingState } from '../components/ui/LoadingState'
import { PageHeader } from '../components/ui/PageHeader'
import { useAuth } from '../store/auth/useAuth'

export function HomePage() {
  const { isAuthenticated } = useAuth()
  const groupsQuery = useGroupsQuery({ page: 0, size: 4 }, isAuthenticated)

  return (
    <div className="grid gap-6">
      <section className="page-section grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="section-eyebrow">ModuPlan</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            모임 탐색부터 일정 관리까지, 함께하는 계획을 더 쉽고 빠르게 시작하세요.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">
            ModuPlan은 모임을 만들고 참여하는 과정, 그리고 일정과 참여 현황을 한곳에서 관리할 수 있도록 구성된
            서비스입니다. 로그인 후 추천 모임을 확인하고, 관심 있는 그룹에 바로 참여해보세요.
          </p>
        </div>
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
          <p className="text-sm font-semibold text-brand-100">빠르게 시작하는 방법</p>
          <ul className="mt-4 space-y-4 text-sm leading-6 text-slate-300">
            <li>관심 있는 카테고리와 지역을 기준으로 원하는 모임을 찾아보세요.</li>
            <li>모임 상세 정보와 참여 조건을 확인한 뒤 바로 신청할 수 있습니다.</li>
            <li>참여한 모임의 일정을 확인하고 계획을 놓치지 않게 관리하세요.</li>
          </ul>
        </div>
      </section>

      {isAuthenticated ? (
        <section className="page-section">
          <PageHeader
            eyebrow="Featured"
            title="지금 바로 확인할 수 있는 추천 모임"
            description="로그인한 사용자에게 추천 모임을 보여주고, 최신 그룹 목록을 빠르게 탐색할 수 있도록 구성했습니다."
          />

          {groupsQuery.isLoading ? <LoadingState /> : null}
          {groupsQuery.isError ? (
            <EmptyState title="모임 정보를 불러오지 못했습니다." description={groupsQuery.error.message} />
          ) : null}
          {groupsQuery.data && groupsQuery.data.content.length === 0 ? (
            <EmptyState title="추천할 모임이 아직 없습니다." description="새로운 모임이 등록되면 이곳에서 바로 확인할 수 있습니다." />
          ) : null}

          {groupsQuery.data?.content.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {groupsQuery.data.content.map((group) => (
                <GroupCard key={group.groupId} group={group} />
              ))}
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  )
}
