import React, { useState, useMemo } from 'react'
import { DropdownSelect } from '../../PropertyPanel/inputs/DropdownSelect'
import { ToggleSwitch } from '../../PropertyPanel/inputs/ToggleSwitch'
import { LayerFilterType } from '../types'
import { debounce } from '../utils'

interface LayerSearchProps {
  searchTerm: string
  filterType: LayerFilterType
  showHidden: boolean
  onSearchChange: (term: string) => void
  onFilterTypeChange: (type: LayerFilterType) => void
  onShowHiddenChange: (show: boolean) => void
  layerCount: number
  filteredCount: number
}

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Objects', icon: '🔷' },
  { value: 'text', label: 'Text', icon: '📝' },
  { value: 'shapes', label: 'Shapes', icon: '⬜' },
  { value: 'images', label: 'Images', icon: '🖼️' },
  { value: 'groups', label: 'Groups', icon: '📁' }
]

const LayerSearch: React.FC<LayerSearchProps> = ({
  searchTerm,
  filterType,
  showHidden,
  onSearchChange,
  onFilterTypeChange,
  onShowHiddenChange,
  layerCount,
  filteredCount
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)

  // Debounced search to avoid excessive filtering
  const debouncedSearch = useMemo(
    () => debounce(onSearchChange, 500),
    [onSearchChange]
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalSearchTerm(value)
    debouncedSearch(value)
  }

  const clearSearch = () => {
    setLocalSearchTerm('')
    onSearchChange('')
  }

  return (
    <div className="layer-search space-y-3 p-3 border-b border-gray-200 bg-gray-50">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={localSearchTerm}
          onChange={handleSearchChange}
          placeholder="Search layers..."
          className="w-full pl-8 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        {/* Search Icon */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Clear Button */}
        {localSearchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-3">
        {/* Filter Type Dropdown */}
        <div className="flex-1">
          <DropdownSelect
            value={filterType}
            onChange={(value) => onFilterTypeChange(value as LayerFilterType)}
            options={FILTER_OPTIONS}
            placeholder="Filter by type..."
          />
        </div>

        {/* Show Hidden Toggle */}
        <div className="flex items-center gap-2">
          <ToggleSwitch
            checked={showHidden}
            onChange={onShowHiddenChange}
            size="sm"
          />
          <span className="text-xs text-gray-600">Show Hidden</span>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>
          {filteredCount === layerCount 
            ? `${layerCount} layers`
            : `${filteredCount} of ${layerCount} layers`
          }
        </span>
        
        {(localSearchTerm || filterType !== 'all' || showHidden) && (
          <button
            onClick={() => {
              clearSearch()
              onFilterTypeChange('all')
              onShowHiddenChange(false)
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <button className="flex-1 px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50">
          Select All
        </button>
        <button className="flex-1 px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50">
          Expand All
        </button>
        <button className="flex-1 px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50">
          Collapse All
        </button>
      </div>
    </div>
  )
}

export default LayerSearch
