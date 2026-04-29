import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import Header from './Template/Header'
import Sidebar from './Template/Sidebar'
import BackgroundMain from './Template/BackgroundMain'
import { primaryNavigationItems } from '../services/navigation.js'
import LayoutHeaderActionsContext from './layoutHeaderContext.js'

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [pageToolbarActions, setPageToolbarActions] = useState([])
  const location = useLocation()
  const currentPath = location.pathname
  const breadcrumbItems = []

  return (
    <div className={`dashboard-shell${collapsed ? ' dashboard-shell--sidebar-collapsed' : ''}`}>
      <BackgroundMain />

      <Sidebar
        activePath={currentPath}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
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
          <main className="dashboard-main">{children}</main>
        </LayoutHeaderActionsContext.Provider>

        <footer
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '1rem 1.5rem',
            borderTop: '1px solid rgba(226,232,240,0.7)',
            background: 'rgba(255,255,255,0.66)',
            backdropFilter: 'blur(12px)',
            color: '#64748b',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.01em',
          }}
        >
          <span>AI Image Generator</span>
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#16263f',
              flexShrink: 0,
            }}
          />
          <span>Local Workspace</span>
        </footer>
      </div>
    </div>
  )
}
