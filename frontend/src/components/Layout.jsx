import { useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'

import Header from './Template/Header'
import Sidebar from './Template/Sidebar'
import { primaryNavigationItems } from '../services/navigation.js'
import LayoutHeaderActionsContext from './layoutHeaderContext.js'
import {
  GALLERY_DATE_FROM_PARAM_KEY,
  GALLERY_DATE_TO_PARAM_KEY,
  GALLERY_SEARCH_PARAM_KEY,
  buildGalleryFilterSearchParams,
  hasActiveGalleryFilters,
  readGalleryFilterState,
  resetGalleryFilterSearchParams,
} from '../services/galleryFilters.js'

function GalleryBreadcrumbFilters({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}) {
  return (
    <div className="breadcrumb-filter-group">
      <label className="breadcrumb-filter-field">
        <span className="breadcrumb-filter-label">Dari</span>
        <input
          type="date"
          className="breadcrumb-filter-input"
          value={dateFrom}
          onChange={onDateFromChange}
        />
      </label>

      <label className="breadcrumb-filter-field">
        <span className="breadcrumb-filter-label">Sampai</span>
        <input
          type="date"
          className="breadcrumb-filter-input"
          value={dateTo}
          onChange={onDateToChange}
        />
      </label>

    </div>
  )
}

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [pageToolbarActions, setPageToolbarActions] = useState([])
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPath = location.pathname
  const breadcrumbItems = []
  const galleryFilterState = readGalleryFilterState(searchParams)
  const hasGalleryFilters = hasActiveGalleryFilters(galleryFilterState)
  const isGalleryPage = currentPath === '/'

  const updateGallerySearchParams = (nextValues) => {
    setSearchParams(buildGalleryFilterSearchParams(searchParams, nextValues), { replace: true })
  }

  const breadcrumbContent = isGalleryPage ? (
    <GalleryBreadcrumbFilters
      dateFrom={galleryFilterState.dateFrom}
      dateTo={galleryFilterState.dateTo}
      onDateFromChange={(event) =>
        updateGallerySearchParams({
          [GALLERY_SEARCH_PARAM_KEY]: galleryFilterState.search,
          [GALLERY_DATE_FROM_PARAM_KEY]: event.target.value,
          [GALLERY_DATE_TO_PARAM_KEY]: galleryFilterState.dateTo,
        })
      }
      onDateToChange={(event) =>
        updateGallerySearchParams({
          [GALLERY_SEARCH_PARAM_KEY]: galleryFilterState.search,
          [GALLERY_DATE_FROM_PARAM_KEY]: galleryFilterState.dateFrom,
          [GALLERY_DATE_TO_PARAM_KEY]: event.target.value,
        })
      }
    />
  ) : null

  const toolbarActions = [
    ...(isGalleryPage
      ? [
          {
            id: 'gallery-reset-filter',
            ariaLabel: 'Reset filter gallery',
            title: 'Reset filter',
            icon: <RestartAltRoundedIcon fontSize="small" />,
            onClick: () =>
              setSearchParams(resetGalleryFilterSearchParams(searchParams), {
                replace: true,
              }),
            disabled: !hasGalleryFilters,
          },
        ]
      : []),
    ...pageToolbarActions,
  ]

  const searchProps = isGalleryPage
    ? {
        value: galleryFilterState.search,
        placeholder: 'Cari prompt atau nama file...',
        ariaLabel: 'Cari hasil generate',
        onChange: (event) =>
          updateGallerySearchParams({
            [GALLERY_SEARCH_PARAM_KEY]: event.target.value,
            [GALLERY_DATE_FROM_PARAM_KEY]: galleryFilterState.dateFrom,
            [GALLERY_DATE_TO_PARAM_KEY]: galleryFilterState.dateTo,
          }),
      }
    : undefined

  return (
    <div className={`dashboard-shell${collapsed ? ' dashboard-shell--sidebar-collapsed' : ''}`}>
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
          breadcrumbContent={breadcrumbContent}
          searchProps={searchProps}
          toolbarActions={toolbarActions}
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
