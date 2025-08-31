'use client';

import { useState } from 'react';
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

export default function DemoPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('unified-api');
  const [loading, setLoading] = useState(false);

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

  const handleMetadata = () => {
    setLoading(true);
    try {
      const countries = getAllCountries();
      const metadata = countries.map(code => getCountryMetadata(code)).filter(Boolean);
      setResult({ metadata });
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📱 CM Phone Lookup Demo
          </h1>
          <p className="text-xl text-gray-800 mb-2 font-medium">
            Démonstration interactive de votre librairie de détection d'opérateurs africains
          </p>
          <p className="text-lg text-gray-700 font-medium">
            🇨🇲🇸🇳🇨🇮🇳🇬🇬🇭 Support multi-pays avec API unifiée V1.5.0
          </p>
          <div className="mt-4">
            <a 
              href="https://www.npmjs.com/package/@williamtessa27/cm-phone-lookup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              📦 Voir sur NPM
            </a>
          </div>
        </div>

        {/* Pays Supportés Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-6 mb-8 border-2 border-green-200">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              🌍 Pays Actuellement Supportés
            </h2>
            <p className="text-lg text-gray-700 font-medium">
              V1.5.0 - Support complet avec validation et métadonnées enrichies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Cameroun */}
            <div className="bg-white rounded-lg p-4 border-2 border-green-300 shadow-md hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-green-900">🇨🇲 Cameroun</h3>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">+237</span>
              </div>
              <div className="space-y-1 text-sm text-green-800">
                <p><strong className="text-green-900">Opérateurs :</strong> 4</p>
                <p><strong className="text-green-900">Préfixes :</strong> 77+</p>
                <p><strong className="text-green-900">Langues :</strong> 🇫🇷 + 🇬🇧</p>
                <p><strong className="text-green-900">Statut :</strong> ✅ Complet</p>
              </div>
            </div>

            {/* Sénégal */}
            <div className="bg-white rounded-lg p-4 border-2 border-blue-300 shadow-md hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-blue-900">🇸🇳 Sénégal</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">+221</span>
              </div>
              <div className="space-y-1 text-sm text-blue-800">
                <p><strong className="text-blue-900">Opérateurs :</strong> 6</p>
                <p><strong className="text-blue-900">Préfixes :</strong> 8</p>
                <p><strong className="text-blue-900">Langue :</strong> 🇫🇷</p>
                <p><strong className="text-blue-900">Statut :</strong> ✅ Complet</p>
              </div>
            </div>

            {/* Côte d'Ivoire */}
            <div className="bg-white rounded-lg p-4 border-2 border-orange-300 shadow-md hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-orange-900">🇨🇮 Côte d'Ivoire</h3>
                <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">+225</span>
              </div>
              <div className="space-y-1 text-sm text-orange-800">
                <p><strong className="text-orange-900">Opérateurs :</strong> 3</p>
                <p><strong className="text-orange-900">Préfixes :</strong> 6</p>
                <p><strong className="text-orange-900">Langue :</strong> 🇫🇷</p>
                <p><strong className="text-orange-900">Statut :</strong> ✅ Complet</p>
              </div>
            </div>

            {/* Nigeria */}
            <div className="bg-white rounded-lg p-4 border-2 border-green-300 shadow-md hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-green-900">🇳🇬 Nigeria</h3>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">+234</span>
              </div>
              <div className="space-y-1 text-sm text-green-800">
                <p><strong className="text-green-900">Opérateurs :</strong> 9</p>
                <p><strong className="text-green-900">Préfixes :</strong> 50+</p>
                <p><strong className="text-green-900">Langue :</strong> 🇬🇧</p>
                <p><strong className="text-green-900">Statut :</strong> ✅ Complet</p>
              </div>
            </div>

            {/* Ghana */}
            <div className="bg-white rounded-lg p-4 border-2 border-red-300 shadow-md hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-red-900">🇬🇭 Ghana</h3>
                <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">+233</span>
              </div>
              <div className="space-y-1 text-sm text-red-800">
                <p><strong className="text-red-900">Opérateurs :</strong> 5</p>
                <p><strong className="text-red-900">Préfixes :</strong> 18</p>
                <p><strong className="text-red-900">Langue :</strong> 🇬🇧</p>
                <p><strong className="text-red-900">Statut :</strong> ✅ Complet</p>
              </div>
            </div>

            {/* Placeholder pour futurs pays */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-dashed border-purple-300 shadow-md hover:shadow-lg transition-all duration-200">
              <div className="text-center">
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="text-lg font-bold text-purple-900 mb-2">Nouveaux Pays</h3>
                <p className="text-sm text-purple-700 font-medium">
                  En cours de développement
                </p>
                <div className="mt-2">
                  <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded-full">
                    Bientôt disponible
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mise à jour en cours */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-300">
            <div className="flex items-center justify-center space-x-3">
              <div className="text-2xl">🔄</div>
              <div className="text-center">
                <h4 className="text-lg font-bold text-yellow-900 mb-1">
                  Mises à jour en cours de développement
                </h4>
                <p className="text-yellow-800 font-medium">
                  Nous travaillons activement pour ajouter plus de pays africains et améliorer la couverture des opérateurs
                </p>
              </div>
              <div className="text-2xl">🚀</div>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Entrez un numéro (ex: +237650123456, 221771234567...)"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-600 font-medium text-base shadow-sm transition-all duration-200"
            />
            <button
              onClick={clearResult}
              className="px-6 py-3 bg-red-400 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors shadow-md hover:shadow-lg cursor-pointer"
            >
              🗑️ Effacer
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap -mb-px">
              {[
                { id: 'unified-api', name: '🎯 API Unifiée', color: 'black' },
                { id: 'classic-api', name: '📱 API Classique', color: 'green' },
                { id: 'validation', name: '🔍 Validation', color: 'purple' },
                { id: 'metadata', name: '🌍 Métadonnées', color: 'orange' },
                { id: 'stats', name: '📊 Statistiques', color: 'red' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? `border-black text-black-700 bg-black`
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

            {activeTab === 'metadata' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🌍 Métadonnées des Pays</h3>
                <p className="text-gray-800 mb-4 font-medium leading-relaxed">
                  Informations complètes sur tous les pays supportés : drapeaux, capitales, populations, devises, fuseaux, langues.
                </p>
                <button
                  onClick={handleMetadata}
                  disabled={loading}
                  className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg cursor-pointer"
                >
                  {loading ? '⏳ Chargement...' : '🌍 Afficher Métadonnées'}
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
                          <p><strong className="text-green-900">Langue :</strong> {Array.isArray(result.country.language) ? result.country.language.join(' + ') : result.country.language}</p>
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

                {activeTab === 'metadata' && result.metadata && (
                  <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
                    <h4 className="font-bold text-orange-900 mb-3 text-lg">🌍 Métadonnées des Pays</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {result.metadata.map((country: any, index: number) => (
                        <div key={index} className="bg-white rounded-lg p-4 border-2 border-orange-200 shadow-sm">
                          <h5 className="font-semibold text-orange-900 mb-3 text-base">
                            {country.flag} {country.name}
                          </h5>
                          <div className="space-y-1 text-sm text-orange-800">
                            <p><strong className="text-orange-900">Capitale :</strong> {country.capital}</p>
                            <p><strong className="text-orange-900">Population :</strong> {country.population}</p>
                            <p><strong className="text-orange-900">Devise :</strong> {country.currency}</p>
                            <p><strong className="text-orange-900">Fuseau :</strong> {country.timezone}</p>
                            <p><strong className="text-orange-900">Langue :</strong> {Array.isArray(country.language) ? country.language.join(' + ') : country.language}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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
                        <p className="text-3xl font-bold text-red-700">V1.5.0</p>
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
            <strong>CM Phone Lookup V1.5.0</strong> - Librairie professionnelle pour la détection d'opérateurs africains
          </p>
          <p className="text-base text-gray-700 font-medium">
            🇨🇲🇸🇳🇨🇮🇳🇬🇬🇭 Support multi-pays avec API unifiée, validation avancée et métadonnées enrichies
          </p>
          
          {/* Informations supplémentaires */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-center">
              <div className="text-2xl mb-2">🌍</div>
              <p className="text-sm font-semibold text-gray-900">5 Pays Supportés</p>
              <p className="text-xs text-gray-600">Actuellement disponibles</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📱</div>
              <p className="text-sm font-semibold text-gray-900">18+ Opérateurs</p>
              <p className="text-xs text-gray-600">Couvrage complète</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🚀</div>
              <p className="text-sm font-semibold text-gray-900">Mises à jour</p>
              <p className="text-xs text-gray-600">En développement</p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 font-medium">
              💡 <strong>Prochainement :</strong> Plus de pays africains, nouveaux opérateurs et fonctionnalités avancées
            </p>
          </div>
          
          {/* Informations de la Librairie NPM */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border-2 border-purple-200">
            <div className="text-center">
              <h4 className="text-lg font-bold text-purple-900 mb-3">
                📦 Librairie NPM Officielle
              </h4>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <p className="text-sm font-semibold text-purple-900 mb-1">
                    Nom du Package :
                  </p>
                  <code className="text-lg font-mono bg-purple-100 text-purple-800 px-3 py-1 rounded border border-purple-300">
                    @williamtessa27/cm-phone-lookup
                  </code>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <p className="text-sm font-semibold text-purple-900 mb-2">
                    Installation :
                  </p>
                  <div className="space-y-2">
                    <code className="block text-sm font-mono bg-gray-100 text-gray-800 px-3 py-2 rounded border border-gray-300">
                      npm install @williamtessa27/cm-phone-lookup
                    </code>
                    <code className="block text-sm font-mono bg-gray-100 text-gray-800 px-3 py-2 rounded border border-gray-300">
                      yarn add @williamtessa27/cm-phone-lookup
                    </code>
                  </div>
                </div>
                
                <div className="mt-4">
                  <a 
                    href="https://www.npmjs.com/package/@williamtessa27/cm-phone-lookup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
                  >
                   <span> NPM</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
