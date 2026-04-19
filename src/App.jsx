import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'
import backgroundImage from './assets/background.png'

const filterCategories = [
  { id: 'service', name: '服务/物流' },
  { id: 'brand', name: '品牌' },
  { id: 'storage', name: '机身内存' },
  { id: 'screen', name: '屏幕尺寸' },
  { id: 'cpu', name: 'CPU型号' },
  { id: 'battery', name: '电池容量' },
  { id: 'charging', name: '充电功率充电功率充电功率' },
  { id: 'ram', name: '运行内存' },
  { id: 'screenMaterial', name: '屏幕材质' },
  { id: 'refreshRate', name: '刷新率' },
  { id: 'waterproof', name: '防水等级' },
  { id: 'camera', name: '主摄像素' },
  { id: 'frontCamera', name: '前置摄像头像素' },
  { id: 'cpu2', name: 'CPU型号' },
  { id: 'other', name: '其他' }
]

const filterOptions = {
  service: {
    title: '服务/物流',
    options: ['唯品自营', '次日达']
  },
  brand: {
    title: '品牌',
    options: ['苹果', '华为', '小米', 'OPPO', 'vivo', '三星', '荣耀', '一加']
  },
  storage: {
    title: '机身内存',
    options: ['128GB', '256GB', '512GB', '1TB']
  },
  screen: {
    title: '屏幕尺寸',
    options: ['6.1英寸', '6.5英寸', '6.7英寸', '6.8英寸']
  },
  cpu: {
    title: 'CPU型号',
    options: ['A17 Pro', '骁龙8 Gen3', '天玑9300', 'A16', '骁龙8 Gen2']
  },
  battery: {
    title: '电池容量',
    options: ['4000mAh以下', '4000-4500mAh', '4500-5000mAh', '5000mAh以上']
  },
  charging: {
    title: '充电功率',
    options: ['18W以下', '18-30W', '30-60W', '60-100W', '100W以上']
  },
  ram: {
    title: '运行内存',
    options: ['4GB', '6GB', '8GB', '12GB', '16GB', '24GB']
  },
  screenMaterial: {
    title: '屏幕材质',
    options: ['OLED', 'LCD', 'AMOLED', 'LTPO']
  },
  refreshRate: {
    title: '刷新率',
    options: ['60Hz', '90Hz', '120Hz', '144Hz', '165Hz']
  },
  waterproof: {
    title: '防水等级',
    options: ['无防水', 'IP54', 'IP65', 'IP67', 'IP68']
  },
  camera: {
    title: '主摄像素',
    options: ['4800万', '5000万', '6400万', '1亿', '2亿']
  },
  frontCamera: {
    title: '前置摄像头像素',
    options: ['800万', '1200万', '1600万', '2000万', '3200万']
  },
  cpu2: {
    title: 'CPU型号',
    options: ['A17 Pro', '骁龙8 Gen3', '天玑9300', 'A16', '骁龙8 Gen2']
  },
  other: {
    title: '其他',
    options: ['5G', 'NFC', '红外遥控', '双卡双待', 'eSIM']
  }
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('service')
  const [selectedOptions, setSelectedOptions] = useState({})
  const contentRef = useRef(null)
  const sectionRefs = useRef({})
  const isScrolling = useRef(false)

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId)
    isScrolling.current = true
    
    const sectionElement = sectionRefs.current[categoryId]
    if (sectionElement && contentRef.current) {
      const container = contentRef.current
      const sectionTop = sectionElement.offsetTop
      const containerScrollTop = container.scrollTop
      const offset = sectionTop - containerScrollTop
      
      container.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      })
      
      setTimeout(() => {
        isScrolling.current = false
      }, 500)
    }
  }

  const handleScroll = useCallback(() => {
    if (isScrolling.current) return
    
    const container = contentRef.current
    if (!container) return
    
    const containerTop = container.scrollTop
    const containerHeight = container.clientHeight
    
    let closestSection = null
    let closestDistance = Infinity
    
    Object.entries(sectionRefs.current).forEach(([categoryId, element]) => {
      if (element) {
        const elementTop = element.offsetTop
        const distance = Math.abs(elementTop - containerTop)
        
        if (distance < closestDistance) {
          closestDistance = distance
          closestSection = categoryId
        }
      }
    })
    
    if (closestSection && closestSection !== activeTab) {
      setActiveTab(closestSection)
    }
  }, [activeTab])

  useEffect(() => {
    const container = contentRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])

  const handleOptionClick = (categoryId, option) => {
    setSelectedOptions(prev => {
      const currentOptions = prev[categoryId] || []
      const newOptions = currentOptions.includes(option)
        ? currentOptions.filter(opt => opt !== option)
        : [...currentOptions, option]
      
      return {
        ...prev,
        [categoryId]: newOptions
      }
    })
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleOpen = () => {
    setIsModalOpen(true)
  }

  const handleReset = () => {
    setSelectedOptions({})
  }

  const handleApply = () => {
    console.log('应用筛选:', selectedOptions)
    setIsModalOpen(false)
  }

  const getSelectedCount = () => {
    return Object.values(selectedOptions).reduce((total, options) => total + options.length, 0)
  }

  return (
    <div className="app">
      <div className="mobile-container">
        <div className="main-content">
          <img src={backgroundImage} alt="背景" className="background-image" />
        </div>

        <div className="filter-bar">
          <button className="filter-button" onClick={handleOpen}>
            <span>筛选</span>
            {getSelectedCount() > 0 && (
              <span className="filter-count">{getSelectedCount()}</span>
            )}
          </button>
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">全部筛选</div>
                <button className="close-button" onClick={handleClose}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5L15 15" stroke="#1B1B1B" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <div className="modal-body">
                <div className="sidebar">
                  {filterCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`sidebar-item ${activeTab === category.id ? 'active' : ''}`}
                      onClick={() => handleTabClick(category.id)}
                    >
                      <span className="sidebar-text">{category.name}</span>
                      {activeTab === category.id && <div className="active-indicator" />}
                    </div>
                  ))}
                </div>

                <div className="content-area" ref={contentRef}>
                  {filterCategories.map((category) => {
                    const options = filterOptions[category.id]
                    if (!options) return null

                    return (
                      <div
                        key={category.id}
                        ref={(el) => sectionRefs.current[category.id] = el}
                        className="content-section"
                      >
                        <div className="section-title">{options.title}</div>
                        <div className="options-grid">
                          {options.options.map((option) => {
                            const isSelected = selectedOptions[category.id]?.includes(option)
                            return (
                              <button
                                key={option}
                                className={`option-button ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(category.id, option)}
                              >
                                {option}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="modal-footer">
                <div className="footer-indicator" />
                <div className="footer-buttons">
                  <button className="reset-button" onClick={handleReset}>
                    重置
                  </button>
                  <button className="apply-button" onClick={handleApply}>
                    筛选
                    {getSelectedCount() > 0 && (
                      <span className="apply-count">{getSelectedCount()}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App