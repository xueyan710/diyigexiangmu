'use client'
import React, { useEffect, useRef, useState } from 'react';

// 个人介绍页面组件
export default function PersonalProfile() {
  // 用于控制元素动画的状态
  const [visibleSections, setVisibleSections] = useState<{[key: string]: boolean}>({});
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({});
  
  // 检测元素是否进入视口，用于触发动画
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // 复制当前ref到变量中，避免闭包问题
    const currentRefs = sectionRefs.current;
    
    Object.values(currentRefs).forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      // 使用复制的变量进行清理
      Object.values(currentRefs).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  // 定义数据可视化的模拟数据
  const expertiseData = [
    { name: '私人AI服务', value: 90 },
    { name: 'AI业务落地', value: 85 },
    { name: 'AI工具应用', value: 88 },
    { name: '解决方案设计', value: 82 },
    { name: '需求匹配', value: 86 }
  ];
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">刘姥姥 <span className="text-primary">| AI 顾问</span></h1>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">关于我</a>
            <a href="#expertise" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">专长领域</a>
            <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">服务内容</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">联系我</a>
          </nav>
          <button className="md:hidden text-2xl">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </header>
      
      {/* 英雄区域 */}
      <section 
        ref={(el) => { sectionRefs.current['hero'] = el; }}
        id="hero" 
        className="relative overflow-hidden"
      >
        <div className={`${visibleSections['hero'] ? 'fade-in' : 'opacity-0'} transition-all duration-1000 pt-16 pb-24 px-4 sm:px-6 lg:px-8`}>
          <div className="max-w-7xl mx-auto relative">
            {/* 背景装饰 */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 bottom-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              {/* 抽象装饰元素 */}
              <div className="abstract-decoration abstract-circle floating" style={{ top: '-50px', left: '-100px' }}></div>
              <div className="abstract-decoration abstract-circle" style={{ bottom: '-100px', right: '-50px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)' }}></div>
              
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
                  刘姥姥
                  <div className="art-tech-bg text-2xl sm:text-3xl md:text-4xl mt-2">
                    私人 AI 顾问 & AI BP
                  </div>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  聚焦 AI 领域，深耕私人 AI 服务与 AI 业务落地场景，致力成为连接
                  <span className="text-primary font-medium"> 个人需求与 AI 价值 </span>
                  、
                  <span className="text-secondary font-medium"> 技术能力与业务目标 </span>
                  的桥梁。
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover-scale cursor-pointer"
                    onClick={() => {
                      const servicesSection = document.getElementById('services');
                      if (servicesSection) {
                        servicesSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    了解我的服务
                  </button>
                  <button 
                    className="border border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary px-8 py-3 rounded-full font-medium transition-all art-tech-border cursor-pointer"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    联系我
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 shadow-xl pulse-glow">
                  <div className="w-full h-full relative overflow-hidden rounded-2xl art-tech-border">
                    {/* 个人照片 */}
                    <img 
                      src="/profile.jpg" 
                      alt="刘姥姥 - AI顾问" 
                      className="w-full h-full object-cover object-center"/>
                    <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-2xl"></div>
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                  </div>
                </div>
                {/* 装饰元素 - 改进版 */}
                <div className="absolute -right-3 -top-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 transform transition-all duration-300 hover:scale-110 z-20">
                  <div className="text-2xl font-bold text-primary">AI</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">人工智能专家</div>
                </div>
                <div className="absolute -left-3 -bottom-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 transform transition-all duration-300 hover:scale-110 z-20">
                  <div className="text-2xl font-bold text-secondary">BP</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">业务伙伴</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bento Grid 主要内容区域 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          {/* 关于我部分 */}
          <div
            ref={(el) => { sectionRefs.current['about'] = el; }}
            id="about" 
            className={`bento-grid ${visibleSections['about'] ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
          >
            <div className="col-span-6 md:col-span-3 hover-scale bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary mb-4">
                  <img 
                    src="/profile.jpg" 
                    alt="刘姥姥 - AI顾问"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-3xl font-bold art-tech-bg">关于我</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                我是一名专注于 AI 领域的专业顾问，致力于帮助个人用户及中小微业务主体实现 AI 技术的落地应用。
                我持续打磨 AI 工具应用、场景化解决方案设计、业务需求与 AI 技术匹配的核心能力，为客户提供定制化的 AI 服务。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-primary">5+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">AI 领域经验</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-secondary">30+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">成功项目</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-accent">100+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">满意客户</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-tertiary">20+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">AI 工具精通</div>
                </div>
              </div>
            </div>
            
            {/* 专长领域 */}
            <div
              ref={(el) => { sectionRefs.current['expertise'] = el; }}
              id="expertise" 
              className="col-span-6 md:col-span-3 hover-scale bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-3xl font-bold mb-6 art-tech-bg">专长领域</h2>
              <div className="chart-container mb-4">
                {/* 简化版技能可视化 */}
                {expertiseData.map((item, index) => (
                  <div key={index} className="flex items-center mb-3">
                    <div className="w-32 text-sm font-medium">{item.name}</div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${index % 4 === 0 ? 'bg-primary' : index % 4 === 1 ? 'bg-secondary' : index % 4 === 2 ? 'bg-accent' : 'bg-tertiary'}`} 
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                    <div className="w-10 text-right text-sm ml-2">{item.value}%</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">私人 AI 服务</span>
                <span className="px-3 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full">AI 业务落地</span>
                <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">AI 工具应用</span>
                <span className="px-3 py-1 text-xs font-medium bg-tertiary/10 text-tertiary rounded-full">解决方案设计</span>
              </div>
            </div>
            
            {/* 服务内容 */}
            <div
              ref={(el) => { sectionRefs.current['services'] = el; }}
              id="services" 
              className="col-span-6 hover-scale bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-3xl font-bold mb-8 art-tech-bg">服务内容</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <i className="fas fa-user-gear text-xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3">私人 AI 顾问服务</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    为个人用户提供定制化的 AI 解决方案，包括 AI 工具选择、使用培训、效率提升策略等。
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                    <i className="fas fa-building text-xl text-secondary"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI 业务落地咨询</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    为中小微企业提供 AI 技术落地支持，包括需求分析、解决方案设计、技术选型与实施指导。
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <i className="fas fa-chart-line text-xl text-accent"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI 能力评估与规划</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    评估现有业务的 AI 应用潜力，制定分阶段的 AI 能力提升规划，匹配适合的 AI 技术与工具。
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center mb-4">
                    <i className="fas fa-laptop-code text-xl text-tertiary"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI 工具应用培训</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    提供主流 AI 工具的使用培训，帮助用户快速掌握 AI 工具的核心功能与高级技巧。
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <i className="fas fa-file-lines text-xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI 场景化解决方案</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    针对特定业务场景设计 AI 解决方案，包括需求分析、方案设计、原型开发与实施支持。
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                    <i className="fas fa-handshake text-xl text-secondary"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3">长期 AI 战略伙伴</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    作为长期 AI 战略伙伴，持续关注最新 AI 技术发展，为客户提供持续的 AI 能力支持与优化。
                  </p>
                </div>
              </div>
            </div>
            
            {/* 核心能力 */}
            <div
              ref={(el) => { sectionRefs.current['skills'] = el; }}
              className="col-span-6 hover-scale bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-3xl font-bold mb-8 art-tech-bg">核心能力</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-3">AI 工具应用能力</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center"><i className="fas fa-check-circle text-primary mr-2"></i> 熟练掌握主流生成式 AI 工具</li>
                      <li className="flex items-center"><i className="fas fa-check-circle text-primary mr-2"></i> 了解各类专业 AI 应用场景</li>
                      <li className="flex items-center"><i className="fas fa-check-circle text-primary mr-2"></i> 能够快速学习并应用新技术</li>
                      <li className="flex items-center"><i className="fas fa-check-circle text-primary mr-2"></i> 熟悉 AI 工具的组合使用方法</li>
                    </ul>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary to-accent rounded-full"></div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-3">场景化解决方案设计</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center"><i className="fas fa-check-circle text-secondary mr-2"></i> 具备需求分析与问题拆解能力</li>
                      <li className="flex items-center"><i className="fas fa-check-circle text-secondary mr-2"></i> 能够设计端到端的解决方案</li>
                      <li className="flex items-center"><i className="fas fa-check-circle text-secondary mr-2"></i> 注重用户体验与落地可行性</li>
                      <li className="flex items-center"><i className="fas fa-check-circle text-secondary mr-2"></i> 能够平衡成本与效果</li>
                    </ul>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-tertiary rounded-full"></div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-3">业务需求与 AI 技术匹配</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center"><i className="fas fa-check-circle text-accent mr-2"></i> 理解业务逻辑与核心痛点</li>
                      <li className="flex items-center"><i className="fas fa-check-circle text-accent mr-2"></i> 熟悉 AI 技术的能力边界</li>
                      <li className="flex items-center"><i className="fas fa-check-circle text-accent mr-2"></i> 能够识别高价值的 AI 应用场景</li>
                      <li className="flex items-center"><i className="fas fa-check-circle text-accent mr-2"></i> 注重投入产出比分析</li>
                    </ul>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-tertiary to-primary rounded-full"></div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-3">沟通与培训能力</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center"><i className="fas fa-check-circle text-tertiary mr-2"></i> 能够将复杂技术转化为易懂语言</li>
                      <li className="flex items-center"><i className="fas fa-check-circle text-tertiary mr-2"></i> 具备优秀的培训与辅导能力</li>
                      <li className="flex items-center"><i className="fas fa-check-circle text-tertiary mr-2"></i> 注重用户反馈与持续改进</li>
                      <li className="flex items-center"><i className="fas fa-check-circle text-tertiary mr-2"></i> 能够建立良好的客户关系</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 数据可视化部分 */}
            <div
              ref={(el) => { sectionRefs.current['data'] = el; }}
              className="col-span-6 md:col-span-4 hover-scale bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-3xl font-bold mb-6 art-tech-bg">AI 应用趋势洞察</h2>
              <div className="chart-container">
                {/* 模拟图表 - 这里使用简化的 SVG 图表 */}
                <svg className="w-full h-full" viewBox="0 0 800 300">
                  {/* 艺术科技风格坐标轴 */}
                  <defs>
                    <linearGradient id="axisGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="var(--tertiary)" />
                    </linearGradient>
                  </defs>
                  
                  {/* X 轴 */}
                  <line x1="50" y1="250" x2="750" y2="250" stroke="url(#axisGradient)" strokeWidth="2" />
                  {/* Y 轴 */}
                  <line x1="50" y1="50" x2="50" y2="250" stroke="url(#axisGradient)" strokeWidth="2" />
                  
                  {/* 艺术科技风格数据点和线 */}
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="50%" stopColor="var(--tertiary)" />
                      <stop offset="100%" stopColor="var(--accent)" />
                    </linearGradient>
                  </defs>
                  
                  <g>
                    <path d="M50,200 L100,180 L150,160 L200,140 L250,150 L300,130 L350,110 L400,90 L450,70 L500,60 L550,50 L600,40 L650,30 L700,20 L750,10" 
                          fill="none" stroke="url(#lineGradient)" strokeWidth="3" />
                    {Array.from({length: 15}, (_, i) => i).map(i => (
                      <circle key={i} cx={50 + i * 50} cy={200 - i * 13} r="5" fill={i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "var(--tertiary)" : "var(--accent)"} />
                    ))}
                  </g>
                  
                  {/* 图表标签 */}
                  <text x="400" y="280" textAnchor="middle" className="text-sm fill-gray-500">时间</text>
                  <text x="20" y="150" textAnchor="middle" className="text-sm fill-gray-500" transform="rotate(-90, 20, 150)">AI 采用率</text>
                  <text x="650" y="20" textAnchor="middle" className="text-sm font-medium fill-primary">增长趋势</text>
                </svg>
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                数据显示 AI 技术在各行业的采用率呈持续上升趋势，特别是在私人服务领域的应用增长迅速。
              </div>
            </div>
            
            {/* 客户评价 */}
            <div
              ref={(el) => { sectionRefs.current['testimonials'] = el; }}
              className="col-span-6 md:col-span-2 hover-scale bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-3xl font-bold mb-6">客户评价</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-yellow-500 mb-2">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    '刘姥姥的 AI 咨询服务帮助我极大地提升了工作效率，她对各种 AI 工具的熟悉程度令人印象深刻。' —— 张先生
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-yellow-500 mb-2">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    '作为一家初创企业，刘姥姥为我们提供的 AI 业务落地方案非常实用，帮助我们在竞争中脱颖而出。' —— 李女士
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-yellow-500 mb-2">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    '刘姥姥不仅提供技术支持，更重要的是她能够理解我们的业务需求，提供真正有价值的建议。' —— 王先生
                  </p>
                </div>
              </div>
            </div>
            
            {/* 联系信息 */}
            <div
              ref={(el) => { sectionRefs.current['contact'] = el; }}
              id="contact" 
              className="col-span-6 hover-scale bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 shadow-lg border border-primary/20 dark:border-primary/30"
            >
              <h2 className="text-3xl font-bold mb-8 art-tech-bg">联系我</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    如果您对我的 AI 顾问服务感兴趣，或者有任何关于 AI 应用的问题，欢迎随时联系我。我将为您提供专业的咨询和支持。
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-envelope text-primary"></i>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">邮箱</div>
                        <div className="font-medium">contact@liulaolao.ai</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-weixin text-secondary"></i>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">微信</div>
                        <div className="font-medium">ai_liulaolao</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-phone text-accent"></i>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">电话</div>
                        <div className="font-medium">+86 138 xxxx xxxx</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-8">
                    <a href="#" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                      <i className="fab fa-weibo"></i>
                    </a>
                    <a href="#" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4">发送消息</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">您的姓名</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">联系邮箱</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="请输入您的邮箱"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">您的需求</label>
                      <textarea 
                        rows={4} 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="请简要描述您的需求"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      发送消息
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 页脚 */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-bold">刘姥姥 <span className="art-tech-bg">| AI 顾问</span></h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">聚焦 AI 领域，提供专业 AI 服务</p>
                </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">关于我</a>
            <a href="#expertise" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">专长领域</a>
            <a href="#services" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">服务内容</a>
            <a href="#contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">联系我</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} 刘姥姥 AI 顾问. 保留所有权利.
        </div>
      </footer>
    </div>
  );
}
