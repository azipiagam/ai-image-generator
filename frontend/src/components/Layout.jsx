import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import Header from './Template/Header'
import Sidebar from './Template/Sidebar'
import BackgroundMain from './Template/BackgroundMain'
import { primaryNavigationItems } from '../services/navigation.js'
import LayoutHeaderActionsContext from './layoutHeaderContext.js'
import { useAuth } from '../auth/AuthContext'

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [pageToolbarActions, setPageToolbarActions] = useState([])
  const { user } = useAuth()
  const location = useLocation()
  const currentPath = location.pathname
  const breadcrumbItems = []
  const userName = user?.name || user?.username || 'AI Image Generator'
  const userRole = user?.job_position || user?.department || 'Creative Workspace'

  return (
    <div className={`dashboard-shell${collapsed ? ' dashboard-shell--sidebar-collapsed' : ''}`}>
      <BackgroundMain />

      <Sidebar
        activePath={currentPath}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        userName={userName}
        userRole={userRole}
        primaryItems={primaryNavigationItems}
        secondaryItems={[]}
        onCloseMobile={() => setMobileOpen(false)}
        onToggleCollapse={() => setCollapsed((currentValue) => !currentValue)}
      />

      <button
        type="button"
        className={`sidebar-overlay${mobileOpen ? ' active' : ''}`}
        aria-label="Close sidebar"
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      />

      <div className="dashboard-stage">
        <Header
          title="Framelens"
          subtitle=""
          breadcrumb={breadcrumbItems}
          toolbarActions={pageToolbarActions}
          showMenuButton
          onMenuToggle={() => setMobileOpen((currentValue) => !currentValue)}
        />

        <LayoutHeaderActionsContext.Provider value={setPageToolbarActions}>
          <main className="dashboard-main">
            {children}

            <footer
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.2rem',
                flexDirection: 'column',
                marginTop: '1.25rem',
                padding: '1rem 1.5rem',
                borderTop: '1px solid rgba(226,232,240,0.7)',
                background: 'rgba(255,255,255,0.66)',
                backdropFilter: 'blur(12px)',
                color: '#64748b',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.01em',
                borderRadius: '20px',
              }}
            >
              <span>© 2026 PT Pilar Niaga Makmur. All rights reserved.</span>
              <span>Developed by IT Team PT Pilar Niaga Makmur.</span>
            </footer>
          </main>
        </LayoutHeaderActionsContext.Provider>
      </div>
    </div>
  )
}
