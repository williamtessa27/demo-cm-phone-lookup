'use client';

import { useState, useEffect } from 'react';
import { 
  PhoneLookup, 
  getCountryMetadata, 
  getAllCountries,
  validatePhoneNumber,
  detectOperator,
  isValidNumber,
  getPhoneInfo,
  formatPhoneNumber
} from '@williamtessa27/cm-phone-lookup';

interface CountryData {
  code: string;
  name: string;
  nameLocal: string;
  flag: string;
  dialCode: string;
  operators: number;
  prefixes: number;
  language: string | string[];
  currency: string;
  timezone: string;
  population: string;
  capital: string;
}

export default function DemoPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('unified-api');
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [countries, setCountries] = useState<CountryData[]>([]);

  // Charger les pays au démarrage
  useEffect(() => {
    try {
      const countryCodes = getAllCountries();
      const stats = PhoneLookup.getStats();
      
      const countryData: CountryData[] = countryCodes.map(code => {
        const metadata = getCountryMetadata(code);
        const countryStats = stats.countries.find(c => c.code === `+${code}`);
        
        if (!metadata) return null;
        
        return {
          code,
          name: metadata.name,
          nameLocal: metadata.nameLocal,
          flag: metadata.flag,
          dialCode: `+${code}`,
          operators: countryStats?.operators || 0,
          prefixes: 0, // À calculer si nécessaire
          language: metadata.language,
          currency: metadata.currency,
          timezone: metadata.timezone,
          population: metadata.population || 'N/A',
          capital: metadata.capital || 'N/A'
        };
      }).filter(Boolean) as CountryData[];

      setCountries(countryData);
    } catch (error) {
      console.error('Erreur lors du chargement des pays:', error);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!phoneNumber.trim()) return;
    
    setLoading(true);
    try {
      const analysis = PhoneLookup.analyze(phoneNumber);
      setResult(analysis);
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleClassicAPI = () => {
    if (!phoneNumber.trim()) return;
    
    setLoading(true);
    try {
      const info = getPhoneInfo(phoneNumber);
      const operator = detectOperator(phoneNumber);
      const isValid = isValidNumber(phoneNumber);
      const formatted = formatPhoneNumber(phoneNumber);
      
      setResult({
        classic: {
          operator,
          isValid,
          formatted,
          info
        }
      });
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleValidation = () => {
    if (!phoneNumber.trim()) return;
    
    setLoading(true);
    try {
      const validation = validatePhoneNumber(phoneNumber);
      setResult({ validation });
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleStats = () => {
    setLoading(true);
    try {
      const stats = PhoneLookup.getStats();
      setResult({ stats });
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setPhoneNumber('');
    setSelectedCountry('');
  };

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    // Optionnel : pré-remplir avec le code pays
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setPhoneNumber(country.dialCode);
    }
  };

  const getSelectedCountryData = () => {
    return countries.find(c => c.code === selectedCountry);
  };

  const formatLanguage = (language: string | string[]) => {
    if (Array.isArray(language)) {
      return language.map(lang => {
        const langMap: Record<string, string> = {
          'fr': '🇫🇷 Français',
          'en': '🇬🇧 Anglais', 
          'ar': '🇸🇦 Arabe',
          'sw': '🇹🇿 Swahili',
          'am': '🇪🇹 Amharique',
          'af': '🇿🇦 Afrikaans',
          'zu': '🇿🇦 Zulu'
        };
        return langMap[lang] || lang;
      }).join(' + ');
    }
    const langMap: Record<string, string> = {
      'fr': '🇫🇷 Français',
      'en': '🇬🇧 Anglais',
      'ar': '🇸🇦 Arabe'
    };
    return langMap[language] || language;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📱 CM Phone Lookup Demo V1.9.0
          </h1>
          <p className="text-xl text-gray-800 mb-2 font-medium">
            Démonstration interactive de votre librairie de détection d'opérateurs africains
          </p>
          <p className="text-lg text-gray-700 font-medium">
            🌍 14 pays africains supportés avec API unifiée - Nouvelles: RDC 🇨🇩, Ouganda 🇺🇬, Algérie 🇩🇿
          </p>
          <div className="mt-4 space-x-4">
            <a 
              href="https://www.npmjs.com/package/@williamtessa27/cm-phone-lookup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              📦 NPM Package
            </a>
            <a 
              href="https://github.com/williamtessa27/cm-phone-lookup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl"
            >
              🐙 GitHub
            </a>
          </div>
        </div>

        {/* Sélecteur de Pays */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🌍 Sélectionner un Pays</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Choisissez un pays pour voir ses détails :
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => handleCountrySelect(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
              >
                <option value="">-- Sélectionner un pays --</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name} ({country.dialCode})
                  </option>
                ))}
              </select>
            </div>

            {/* Affichage des détails du pays sélectionné */}
            {selectedCountry && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-200">
                {(() => {
                  const countryData = getSelectedCountryData();
                  if (!countryData) return null;
                  
                  return (
                    <div>
                      <h3 className="text-xl font-bold text-blue-900 mb-3">
                        {countryData.flag} {countryData.name}
                      </h3>
                      <div className="space-y-2 text-sm text-blue-800">
                        <p><strong>Nom local :</strong> {countryData.nameLocal}</p>
                        <p><strong>Code pays :</strong> <span className="font-mono bg-blue-100 px-2 py-1 rounded">{countryData.dialCode}</span></p>
                        <p><strong>Capitale :</strong> {countryData.capital}</p>
                        <p><strong>Population :</strong> {countryData.population}</p>
                        <p><strong>Devise :</strong> {countryData.currency}</p>
                        <p><strong>Fuseau :</strong> {countryData.timezone}</p>
                        <p><strong>Langue(s) :</strong> {formatLanguage(countryData.language)}</p>
                        <p><strong>Opérateurs :</strong> <span className="font-semibold text-blue-900">{countryData.operators}</span></p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Statistiques Globales */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-6 mb-8 border-2 border-green-200">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              📊 Couverture Continentale
            </h2>
            <p className="text-lg text-gray-700 font-medium">
              V1.9.0 - Expansion majeure avec 3 nouveaux pays
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center border-2 border-green-300 shadow-md">
              <div className="text-3xl font-bold text-green-700">{countries.length}</div>
              <div className="text-green-800 font-semibold">Pays</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border-2 border-blue-300 shadow-md">
              <div className="text-3xl font-bold text-blue-700">65+</div>
              <div className="text-blue-800 font-semibold">Opérateurs</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border-2 border-purple-300 shadow-md">
              <div className="text-3xl font-bold text-purple-700">4</div>
              <div className="text-purple-800 font-semibold">Régions</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border-2 border-orange-300 shadow-md">
              <div className="text-3xl font-bold text-orange-700">100%</div>
              <div className="text-orange-800 font-semibold">Précision</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-green-300">
            <h3 className="text-lg font-bold text-green-900 mb-3 text-center">🗺️ Régions Couvertes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-lg font-semibold text-green-900">🌍 Afrique de l'Ouest</div>
                <div className="text-sm text-green-700">🇨🇲🇸🇳🇨🇮🇳🇬🇬🇭</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-lg font-semibold text-blue-900">🌍 Afrique de l'Est</div>
                <div className="text-sm text-blue-700">🇰🇪🇪🇹🇹🇿🇺🇬</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-lg font-semibold text-purple-900">🌍 Afrique Centrale</div>
                <div className="text-sm text-purple-700">🇨🇩🇿🇦</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-lg font-semibold text-orange-900">🌍 Afrique du Nord</div>
                <div className="text-sm text-orange-700">🇲🇦🇪🇬🇩🇿</div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Tester un Numéro</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Entrez un numéro (ex: +243811234567, +256771234567, +213512345678, +254700123456...)"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-600 font-medium text-base shadow-sm transition-all duration-200"
            />
            <button
              onClick={clearResult}
              className="px-6 py-3 bg-red-400 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors shadow-md hover:shadow-lg cursor-pointer"
            >
              🗑️ Effacer
            </button>
          </div>
          
          {/* Exemples de numéros */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">💡 Exemples de numéros :</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                { country: "🇨🇩 RDC", number: "+243811234567" },
                { country: "🇺🇬 Ouganda", number: "+256771234567" },
                { country: "🇩🇿 Algérie", number: "+213512345678" },
                { country: "🇪🇹 Éthiopie", number: "+251911234567" },
                { country: "🇪🇬 Égypte", number: "+201012345678" },
                { country: "🇹🇿 Tanzanie", number: "+255741234567" },
                { country: "🇰🇪 Kenya", number: "+254700123456" },
                { country: "🇿🇦 Afrique du Sud", number: "+27721234567" },
                { country: "🇲🇦 Maroc", number: "+212612345678" },
                { country: "🇨🇲 Cameroun", number: "+237650123456" },
                { country: "🇸🇳 Sénégal", number: "+221701234567" },
                { country: "🇨🇮 Côte d'Ivoire", number: "+22501234567" },
                { country: "🇳🇬 Nigeria", number: "+2348031234567" },
                { country: "🇬🇭 Ghana", number: "+233241234567" }
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPhoneNumber(example.number)}
                  className="text-left p-2 bg-white rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <div className="text-xs text-gray-600">{example.country}</div>
                  <div className="font-mono text-sm text-blue-600">{example.number}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap -mb-px">
              {[
                { id: 'unified-api', name: '🎯 API Unifiée', color: 'blue' },
                { id: 'classic-api', name: '📱 API Classique', color: 'green' },
                { id: 'validation', name: '🔍 Validation', color: 'purple' },
                { id: 'stats', name: '📊 Statistiques', color: 'red' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? `border-${tab.color}-500 text-${tab.color}-700 bg-${tab.color}-50`
                      : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Tab Content */}
            {activeTab === 'unified-api' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 API Unifiée - PhoneLookup.analyze()</h3>
                <p className="text-gray-800 mb-4 font-medium leading-relaxed">
                  Analyse complète d'un numéro avec toutes les informations et métadonnées en une seule fonction.
                </p>
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !phoneNumber.trim()}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold cursor-pointer rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
                >
                  {loading ? '⏳ Analyse...' : '🚀 Analyser'}
                </button>
              </div>
            )}

            {activeTab === 'classic-api' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📱 API Classique</h3>
                <p className="text-gray-800 mb-4 font-medium leading-relaxed">
                  Utilisation des fonctions classiques : detectOperator, isValidNumber, getPhoneInfo, formatPhoneNumber.
                </p>
                <button
                  onClick={handleClassicAPI}
                  disabled={loading || !phoneNumber.trim()}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg cursor-pointer"
                >
                  {loading ? '⏳ Traitement...' : '🔧 Analyser avec API Classique'}
                </button>
              </div>
            )}

            {activeTab === 'validation' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🔍 Validation Avancée</h3>
                <p className="text-gray-800 mb-4 font-medium leading-relaxed">
                  Validation détaillée avec messages d'erreur et suggestions de correction.
                </p>
                <button
                  onClick={handleValidation}
                  disabled={loading || !phoneNumber.trim()}
                  className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg cursor-pointer"
                >
                  {loading ? '⏳ Validation...' : '✅ Valider'}
                </button>
              </div>
            )}

            {activeTab === 'stats' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Statistiques Globales</h3>
                <p className="text-gray-800 mb-4 font-medium leading-relaxed">
                  Vue d'ensemble complète de la librairie : nombre de pays, opérateurs, et détails par pays.
                </p>
                <button
                  onClick={handleStats}
                  disabled={loading}
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg cursor-pointer"
                >
                  {loading ? '⏳ Calcul...' : '📊 Afficher Statistiques'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">📋 Résultats</h3>
            
            {result.error ? (
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                <p className="text-red-900 font-semibold text-lg">❌ Erreur : {result.error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeTab === 'unified-api' && result && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-3 text-lg">📱 Informations de Base</h4>
                      <div className="space-y-2 text-blue-800">
                        <p><strong className="text-blue-900">Numéro :</strong> <span className="font-mono bg-blue-100 px-2 py-1 rounded">{result.phone}</span></p>
                        <p><strong className="text-blue-900">Opérateur :</strong> <span className="font-mono bg-blue-100 px-2 py-1 rounded">{result.operator}</span></p>
                        <p><strong className="text-blue-900">Valide :</strong> {result.isValid ? '✅ Oui' : '❌ Non'}</p>
                        <p><strong className="text-blue-900">Formaté :</strong> <span className="font-mono bg-blue-100 px-2 py-1 rounded">{result.formattedNumber}</span></p>
                      </div>
                    </div>
                    {result.country && (
                      <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                        <h4 className="font-bold text-green-900 mb-3 text-lg">🌍 Métadonnées du Pays</h4>
                        <div className="space-y-2 text-green-800">
                          <p><strong className="text-green-900">Pays :</strong> {result.country.flag} {result.country.name}</p>
                          <p><strong className="text-green-900">Capitale :</strong> {result.country.capital}</p>
                          <p><strong className="text-green-900">Population :</strong> {result.country.population}</p>
                          <p><strong className="text-green-900">Devise :</strong> {result.country.currency}</p>
                          <p><strong className="text-green-900">Fuseau :</strong> {result.country.timezone}</p>
                          <p><strong className="text-green-900">Langue :</strong> {formatLanguage(result.country.language)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'classic-api' && result.classic && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                      <h4 className="font-bold text-green-900 mb-3 text-lg">📱 API Classique</h4>
                      <div className="space-y-2 text-green-800">
                        <p><strong className="text-green-900">Opérateur :</strong> <span className="font-mono bg-green-100 px-2 py-1 rounded">{result.classic.operator}</span></p>
                        <p><strong className="text-green-900">Valide :</strong> {result.classic.isValid ? '✅ Oui' : '❌ Non'}</p>
                        <p><strong className="text-green-900">Formaté :</strong> <span className="font-mono bg-green-100 px-2 py-1 rounded">{result.classic.formatted}</span></p>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-3 text-lg">📊 Informations Détaillées</h4>
                      <div className="space-y-2 text-blue-800">
                        <p><strong className="text-blue-900">Code pays :</strong> <span className="font-mono bg-blue-100 px-2 py-1 rounded">{result.classic.info.countryCode}</span></p>
                        <p><strong className="text-blue-900">Numéro local :</strong> <span className="font-mono bg-blue-100 px-2 py-1 rounded">{result.classic.info.localNumber}</span></p>
                        <p><strong className="text-blue-900">Mobile :</strong> {result.classic.info.isMobile ? '✅ Oui' : '❌ Non'}</p>
                        <p><strong className="text-blue-900">Fixe :</strong> {result.classic.info.isFixed ? '✅ Oui' : '❌ Non'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'validation' && result.validation && (
                  <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-3 text-lg">🔍 Validation</h4>
                    <div className="space-y-2 text-purple-800">
                      <p><strong className="text-purple-900">Valide :</strong> {result.validation.isValid ? '✅ Oui' : '❌ Non'}</p>
                      <p><strong className="text-purple-900">Nombre d'erreurs :</strong> {result.validation.errors.length}</p>
                    </div>
                    
                    {result.validation.errors.length > 0 && (
                      <div className="mt-4">
                        <h5 className="font-semibold text-purple-900 mb-3 text-lg">❌ Erreurs détectées :</h5>
                        <div className="space-y-3">
                          {result.validation.errors.map((error: any, index: number) => (
                            <div key={index} className="bg-white rounded-lg p-4 border-2 border-purple-200 shadow-sm">
                              <p className="font-semibold text-purple-900 text-base">{error.code}: {error.message}</p>
                              {error.suggestion && (
                                <p className="text-purple-700 mt-2 font-medium">💡 Suggestion: {error.suggestion}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'stats' && result.stats && (
                  <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
                    <h4 className="font-bold text-red-900 mb-3 text-lg">📊 Statistiques Globales</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-4 border-2 border-red-200 text-center shadow-sm">
                        <p className="text-3xl font-bold text-red-700">{result.stats.totalCountries}</p>
                        <p className="text-red-800 font-semibold">Pays Supportés</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-2 border-red-200 text-center shadow-sm">
                        <p className="text-3xl font-bold text-red-700">{result.stats.totalOperators}</p>
                        <p className="text-red-800 font-semibold">Opérateurs</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-2 border-red-200 text-center shadow-sm">
                        <p className="text-3xl font-bold text-red-700">V1.9.0</p>
                        <p className="text-red-800 font-semibold">Version</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-red-200 shadow-sm">
                      <h5 className="font-semibold text-red-900 mb-3 text-lg">📋 Détail par Pays :</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {result.stats.countries.map((country: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-200">
                            <span className="text-red-800 font-medium">{country.flag} {country.name}</span>
                            <span className="font-bold text-red-700 bg-white px-3 py-1 rounded-full border border-red-200">{country.operators} opérateurs</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-800 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <p className="mb-2 text-lg font-semibold text-gray-900">
            <strong>CM Phone Lookup V1.9.0</strong> - Librairie professionnelle pour la détection d'opérateurs africains
          </p>
          <p className="text-base text-gray-700 font-medium">
            🌍 Couverture complète de l'Afrique avec 14 pays et 65+ opérateurs
          </p>
          
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 font-medium">
              🎉 <strong>Nouveauté V1.9.0 :</strong> RDC 🇨🇩, Ouganda 🇺🇬, Algérie 🇩🇿 maintenant supportés ! (+11 opérateurs)
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border-2 border-purple-200">
            <div className="text-center">
              <h4 className="text-lg font-bold text-purple-900 mb-3">
                📦 Installation
              </h4>
              <code className="text-sm font-mono bg-gray-100 text-gray-800 px-3 py-2 rounded border border-gray-300">
                npm install @williamtessa27/cm-phone-lookup
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}