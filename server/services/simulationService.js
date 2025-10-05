class SimulationService {
  constructor() {
    this.strategies = [
      {
        id: 'reforestation',
        name: 'Plan de Reforestación',
        description: 'Plantación masiva de árboles nativos en áreas degradadas',
        icon: '🌳',
        category: 'vegetation',
        baseImpact: {
          co2Reduction: 0.15, // 15% por cada 10% de intensidad
          airQuality: 0.20,
          temperature: -0.12, // Reducción de temperatura
          biodiversity: 0.25,
          waterRetention: 0.18
        },
        costPerIntensity: 50000, // USD por cada 10% de intensidad
        duration: 24, // meses
        requirements: {
          landArea: 100, // hectáreas mínimas
          waterAccess: true,
          communitySupport: 0.7
        },
        defaultIntensity: 50
      },
      {
        id: 'sustainable_transport',
        name: 'Transporte Sostenible',
        description: 'Implementación de ciclovías y transporte público eléctrico',
        icon: '🚲',
        category: 'transport',
        baseImpact: {
          co2Reduction: 0.25,
          airQuality: 0.30,
          noiseReduction: 0.15,
          healthBenefits: 0.20,
          economicActivity: 0.10
        },
        costPerIntensity: 75000,
        duration: 18,
        requirements: {
          population: 50000,
          existingInfrastructure: 0.3,
          governmentSupport: 0.8
        },
        defaultIntensity: 60
      },
      {
        id: 'renewable_energy',
        name: 'Energía Renovable',
        description: 'Instalación de paneles solares y parques eólicos',
        icon: '☀️',
        category: 'energy',
        baseImpact: {
          co2Reduction: 0.40,
          energyIndependence: 0.35,
          airQuality: 0.15,
          economicGrowth: 0.20,
          jobCreation: 0.25
        },
        costPerIntensity: 100000,
        duration: 36,
        requirements: {
          solarIrradiation: 5.5, // kWh/m²/día
          windSpeed: 4.0, // m/s
          landArea: 50,
          gridCapacity: 0.6
        },
        defaultIntensity: 70
      },
      {
        id: 'waste_management',
        name: 'Gestión de Residuos',
        description: 'Sistema de reciclaje y compostaje comunitario',
        icon: '♻️',
        category: 'waste',
        baseImpact: {
          wasteReduction: 0.35,
          co2Reduction: 0.10,
          soilQuality: 0.20,
          communityEngagement: 0.30,
          economicSavings: 0.15
        },
        costPerIntensity: 30000,
        duration: 12,
        requirements: {
          population: 20000,
          existingWasteSystem: 0.5,
          communityEducation: 0.6
        },
        defaultIntensity: 40
      },
      {
        id: 'green_building',
        name: 'Construcción Verde',
        description: 'Edificios con techos verdes y sistemas eficientes',
        icon: '🏢',
        category: 'construction',
        baseImpact: {
          energyEfficiency: 0.30,
          co2Reduction: 0.20,
          airQuality: 0.15,
          waterConservation: 0.25,
          propertyValue: 0.10
        },
        costPerIntensity: 60000,
        duration: 30,
        requirements: {
          buildingAge: 20, // años máximo
          structuralCapacity: 0.8,
          maintenanceCapacity: 0.7
        },
        defaultIntensity: 55
      }
    ];

    this.santaCruzData = {
      population: 1500000,
      area: 370621, // km²
      currentCO2: 2.5, // millones de toneladas/año
      airQualityIndex: 65,
      averageTemperature: 24.5,
      greenCoverage: 0.15, // 15%
      energyConsumption: 1200, // GWh/año
      wasteGeneration: 1200, // toneladas/día
      waterConsumption: 180, // litros/persona/día
      economicActivity: 8.5 // miles de millones USD
    };
  }

  // Ejecutar simulación
  async runSimulation(strategyId, intensity, duration = null) {
    const strategy = this.strategies.find(s => s.id === strategyId);
    if (!strategy) {
      throw new Error('Estrategia no encontrada');
    }

    if (intensity < 10 || intensity > 100) {
      throw new Error('La intensidad debe estar entre 10% y 100%');
    }

    const simulationDuration = duration || strategy.duration;
    const intensityFactor = intensity / 100;
    
    // Calcular impacto basado en la intensidad
    const impact = this.calculateImpact(strategy, intensityFactor, simulationDuration);
    
    // Calcular costos
    const costs = this.calculateCosts(strategy, intensity, simulationDuration);
    
    // Calcular viabilidad
    const feasibility = this.calculateFeasibility(strategy, intensity);
    
    // Generar datos de progreso temporal
    const timeline = this.generateTimeline(strategy, intensity, simulationDuration);
    
    // Calcular métricas específicas de Santa Cruz
    const santaCruzMetrics = this.calculateSantaCruzMetrics(strategy, intensity, impact);

    return {
      strategy: {
        id: strategy.id,
        name: strategy.name,
        description: strategy.description,
        icon: strategy.icon,
        category: strategy.category
      },
      parameters: {
        intensity,
        duration: simulationDuration,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + simulationDuration * 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      impact,
      costs,
      feasibility,
      timeline,
      santaCruzMetrics,
      recommendations: this.generateRecommendations(strategy, intensity, feasibility),
      createdAt: new Date().toISOString()
    };
  }

  // Calcular impacto de la estrategia
  calculateImpact(strategy, intensityFactor, duration) {
    const impact = {};
    
    Object.keys(strategy.baseImpact).forEach(metric => {
      const baseValue = strategy.baseImpact[metric];
      const durationFactor = Math.min(duration / 24, 1.5); // Máximo 1.5x por duración
      const randomFactor = 0.9 + Math.random() * 0.2; // ±10% de variación
      
      impact[metric] = {
        value: baseValue * intensityFactor * durationFactor * randomFactor,
        unit: this.getMetricUnit(metric),
        improvement: baseValue * intensityFactor * 100
      };
    });

    return impact;
  }

  // Calcular costos
  calculateCosts(strategy, intensity, duration) {
    const baseCost = strategy.costPerIntensity * (intensity / 10);
    const durationMultiplier = 1 + (duration - strategy.duration) / strategy.duration * 0.5;
    const inflationFactor = 1.05; // 5% anual
    const contingencyFactor = 1.15; // 15% contingencia

    const totalCost = baseCost * durationMultiplier * inflationFactor * contingencyFactor;
    
    return {
      total: Math.round(totalCost),
      perYear: Math.round(totalCost / (duration / 12)),
      perPerson: Math.round(totalCost / this.santaCruzData.population),
      breakdown: {
        implementation: Math.round(totalCost * 0.6),
        maintenance: Math.round(totalCost * 0.25),
        monitoring: Math.round(totalCost * 0.15)
      },
      currency: 'USD'
    };
  }

  // Calcular viabilidad
  calculateFeasibility(strategy, intensity) {
    const requirements = strategy.requirements;
    let feasibilityScore = 0;
    const factors = [];

    // Evaluar cada requisito
    Object.keys(requirements).forEach(requirement => {
      const required = requirements[requirement];
      let actual = 0;

      switch (requirement) {
        case 'landArea':
          actual = this.santaCruzData.area * 100; // Convertir a hectáreas
          break;
        case 'population':
          actual = this.santaCruzData.population;
          break;
        case 'solarIrradiation':
          actual = 5.8; // Santa Cruz tiene buena irradiación solar
          break;
        case 'windSpeed':
          actual = 3.5; // Velocidad promedio del viento en Santa Cruz
          break;
        case 'waterAccess':
          actual = 1; // Santa Cruz tiene acceso a agua
          break;
        case 'communitySupport':
          actual = 0.6 + Math.random() * 0.3; // Simular apoyo comunitario
          break;
        case 'governmentSupport':
          actual = 0.5 + Math.random() * 0.4; // Simular apoyo gubernamental
          break;
        case 'existingInfrastructure':
          actual = 0.4 + Math.random() * 0.4; // Infraestructura existente
          break;
        case 'gridCapacity':
          actual = 0.7; // Capacidad de la red eléctrica
          break;
        case 'buildingAge':
          actual = 15; // Edad promedio de edificios
          break;
        case 'structuralCapacity':
          actual = 0.8; // Capacidad estructural
          break;
        case 'maintenanceCapacity':
          actual = 0.6; // Capacidad de mantenimiento
          break;
        case 'existingWasteSystem':
          actual = 0.3; // Sistema de residuos existente
          break;
        case 'communityEducation':
          actual = 0.5; // Nivel de educación comunitaria
          break;
      }

      const factor = typeof required === 'boolean' ? 
        (actual ? 1 : 0) : 
        Math.min(actual / required, 1);
      
      factors.push({
        requirement,
        required,
        actual,
        factor
      });

      feasibilityScore += factor;
    });

    feasibilityScore = feasibilityScore / Object.keys(requirements).length;
    
    return {
      score: Math.round(feasibilityScore * 100),
      level: feasibilityScore > 0.8 ? 'ALTA' : 
             feasibilityScore > 0.6 ? 'MEDIA' : 'BAJA',
      factors,
      recommendations: this.getFeasibilityRecommendations(factors)
    };
  }

  // Generar línea de tiempo
  generateTimeline(strategy, intensity, duration) {
    const timeline = [];
    const phases = Math.ceil(duration / 6); // Fases de 6 meses
    
    for (let i = 0; i < phases; i++) {
      const phaseStart = i * 6;
      const phaseEnd = Math.min((i + 1) * 6, duration);
      const progress = (i + 1) / phases;
      
      timeline.push({
        phase: i + 1,
        startMonth: phaseStart,
        endMonth: phaseEnd,
        progress: Math.round(progress * 100),
        milestones: this.generateMilestones(strategy, i, phases),
        expectedImpact: this.calculatePhaseImpact(strategy, intensity, progress)
      });
    }

    return timeline;
  }

  // Calcular métricas específicas de Santa Cruz
  calculateSantaCruzMetrics(strategy, intensity, impact) {
    const intensityFactor = intensity / 100;
    
    return {
      co2Reduction: {
        current: this.santaCruzData.currentCO2,
        reduction: this.santaCruzData.currentCO2 * impact.co2Reduction.value,
        newLevel: this.santaCruzData.currentCO2 * (1 - impact.co2Reduction.value),
        percentage: Math.round(impact.co2Reduction.improvement)
      },
      airQuality: {
        current: this.santaCruzData.airQualityIndex,
        improvement: this.santaCruzData.airQualityIndex * impact.airQuality.value,
        newLevel: Math.max(0, this.santaCruzData.airQualityIndex - this.santaCruzData.airQualityIndex * impact.airQuality.value),
        category: this.getAirQualityCategory(this.santaCruzData.airQualityIndex * (1 - impact.airQuality.value))
      },
      temperature: {
        current: this.santaCruzData.averageTemperature,
        reduction: Math.abs(this.santaCruzData.averageTemperature * impact.temperature.value),
        newLevel: this.santaCruzData.averageTemperature + (this.santaCruzData.averageTemperature * impact.temperature.value)
      },
      greenCoverage: {
        current: this.santaCruzData.greenCoverage * 100,
        increase: this.santaCruzData.greenCoverage * impact.biodiversity.value * 100,
        newLevel: (this.santaCruzData.greenCoverage + this.santaCruzData.greenCoverage * impact.biodiversity.value) * 100
      },
      economicImpact: {
        current: this.santaCruzData.economicActivity,
        growth: this.santaCruzData.economicActivity * (impact.economicGrowth?.value || impact.economicActivity?.value || 0),
        newLevel: this.santaCruzData.economicActivity * (1 + (impact.economicGrowth?.value || impact.economicActivity?.value || 0))
      }
    };
  }

  // Métodos auxiliares
  getMetricUnit(metric) {
    const units = {
      co2Reduction: '%',
      airQuality: '%',
      temperature: '°C',
      biodiversity: '%',
      waterRetention: '%',
      noiseReduction: '%',
      healthBenefits: '%',
      economicActivity: '%',
      energyIndependence: '%',
      economicGrowth: '%',
      jobCreation: '%',
      wasteReduction: '%',
      soilQuality: '%',
      communityEngagement: '%',
      economicSavings: '%',
      energyEfficiency: '%',
      waterConservation: '%',
      propertyValue: '%'
    };
    return units[metric] || '%';
  }

  getAirQualityCategory(index) {
    if (index <= 50) return 'BUENA';
    if (index <= 100) return 'MODERADA';
    if (index <= 150) return 'INSALUBRE PARA GRUPOS SENSIBLES';
    if (index <= 200) return 'INSALUBRE';
    if (index <= 300) return 'MUY INSALUBRE';
    return 'PELIGROSA';
  }

  generateMilestones(strategy, phase, totalPhases) {
    const milestones = [];
    
    switch (strategy.id) {
      case 'reforestation':
        milestones.push(`Plantación de ${Math.round(1000 * (phase + 1) / totalPhases)} árboles`);
        if (phase === Math.floor(totalPhases / 2)) milestones.push('Primera evaluación de crecimiento');
        if (phase === totalPhases - 1) milestones.push('Proyecto completado - 100% de cobertura');
        break;
      case 'sustainable_transport':
        milestones.push(`Construcción de ${Math.round(50 * (phase + 1) / totalPhases)} km de ciclovías`);
        if (phase === Math.floor(totalPhases / 2)) milestones.push('Primeros buses eléctricos en funcionamiento');
        if (phase === totalPhases - 1) milestones.push('Sistema de transporte 100% operativo');
        break;
      case 'renewable_energy':
        milestones.push(`Instalación de ${Math.round(100 * (phase + 1) / totalPhases)} paneles solares`);
        if (phase === Math.floor(totalPhases / 2)) milestones.push('Primera conexión a la red eléctrica');
        if (phase === totalPhases - 1) milestones.push('Parque solar 100% operativo');
        break;
      default:
        milestones.push(`Fase ${phase + 1} completada`);
    }
    
    return milestones;
  }

  calculatePhaseImpact(strategy, intensity, progress) {
    const baseImpact = strategy.baseImpact;
    const impact = {};
    
    Object.keys(baseImpact).forEach(metric => {
      impact[metric] = Math.round(baseImpact[metric] * (intensity / 100) * progress * 100);
    });
    
    return impact;
  }

  generateRecommendations(strategy, intensity, feasibility) {
    const recommendations = [];
    
    if (feasibility.score < 60) {
      recommendations.push('Considera reducir la intensidad del proyecto para mejorar la viabilidad');
      recommendations.push('Busca mayor apoyo comunitario y gubernamental antes de implementar');
    }
    
    if (intensity > 80) {
      recommendations.push('Proyecto de alta intensidad - asegúrate de tener recursos suficientes');
      recommendations.push('Considera implementar en fases para reducir riesgos');
    }
    
    recommendations.push('Monitorea el progreso mensualmente y ajusta según sea necesario');
    recommendations.push('Mantén comunicación constante con la comunidad');
    
    return recommendations;
  }

  getFeasibilityRecommendations(factors) {
    const recommendations = [];
    
    factors.forEach(factor => {
      if (factor.factor < 0.5) {
        switch (factor.requirement) {
          case 'communitySupport':
            recommendations.push('Organiza talleres comunitarios para aumentar el apoyo');
            break;
          case 'governmentSupport':
            recommendations.push('Presenta propuestas detalladas a las autoridades');
            break;
          case 'existingInfrastructure':
            recommendations.push('Invierte en infraestructura básica antes del proyecto principal');
            break;
          case 'landArea':
            recommendations.push('Busca terrenos adicionales o considera proyectos más pequeños');
            break;
        }
      }
    });
    
    return recommendations;
  }

  // Obtener todas las estrategias
  getStrategies() {
    return this.strategies;
  }

  // Obtener estrategia por ID
  getStrategy(strategyId) {
    return this.strategies.find(s => s.id === strategyId);
  }

  // Obtener datos de Santa Cruz
  getSantaCruzData() {
    return this.santaCruzData;
  }
}

module.exports = new SimulationService();
