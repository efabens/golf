(window.webpackJsonp = window.webpackJsonp || []).push([
    [38, 28], {
        "+t7s": function(e, t) {
            ! function(e, t) {
                t.shottracker.math.Vector3 = t.Base.extend({
                    x: 0,
                    y: 0,
                    z: 0,
                    constructor: function(e, t, r) {
                        this.init(e, t, r)
                    },
                    init: function(e, t, r) {
                        this.x = e || 0, this.y = t || 0, this.z = r || 0
                    },
                    clone: function() {
                        return new t.shottracker.math.Vector3(this.x, this.y, this.z)
                    },
                    plus: function(e) {
                        this.x += e.x, this.y += e.y, this.z += e.z
                    },
                    minus: function(e) {
                        this.x -= e.x, this.y -= e.y, this.z -= e.z
                    },
                    times: function(e) {
                        this.x *= e.x, this.y *= e.y, this.z *= e.z
                    },
                    divBy: function(e) {
                        this.x /= e.x, this.y /= e.y, this.z /= e.z
                    },
                    normalize: function() {
                        var e = this.lengthSquared();
                        if (t.shottracker.math.Vector3.isZero(e)) return this.x = this.y = this.z = 0, this;
                        var r = 1 / Math.sqrt(e);
                        return this.x *= r, this.y *= r, this.z *= r, this
                    },
                    distance: function(e) {
                        var t = this.x - e.x,
                            r = this.y - e.y,
                            o = this.z - e.z;
                        return Math.sqrt(t * t + r * r + o * o)
                    },
                    lengthSquared: function() {
                        return this.x * this.x + this.y * this.y + this.z * this.z
                    },
                    length: function() {
                        return Math.sqrt(this.lengthSquared())
                    }
                }, {
                    isZero: function(e) {
                        return e < .001
                    }
                })
            }(window, pgatour)
        },
        "/3NR": function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb"),
                    a = o.UserModel = o.UserModel || r.Base.extend({
                        favouritePlayers: [],
                        favouriteExpandedPlayers: {},
                        expandedPlayers: {},
                        coloredPlayers: {},
                        playByPlayOn: !1,
                        sortPreference: "position",
                        sortAscending: !0,
                        toolTipsWasShownOnTabs: [],
                        context: null,
                        constructor: function(e) {
                            this.base(), this.context = e, this.favouritePlayers = this._parsePlayerList(this._readFromCookie(a.FAVOURITE_PLAYERS_COOKIE_KEY)), this.toolTipsWasShownOnTabs = JSON.parse(this._readFromCookie(a.TOOLTIPS_TABS)) || [], this.context.config.openDrawersAtStartup && (this._parseExpandedPlayers(a.EXPANDED_PLAYERS_COOKIE_KEY, this.expandedPlayers), this._parseExpandedPlayers(a.FAVOURITE_EXPANDED_PLAYERS_COOKIE_KEY, this.favouriteExpandedPlayers));
                            var t = this._readFromCookie(a.COLORED_PLAYERS_COOKIE_KEY);
                            if (t)
                                for (var r = t.split(a.COOKIE_SPLITTER), o = 0; o < r.length; o++) {
                                    var n = r[o].split(a.COOKIE_KEY_VALUE_SEPARATOR);
                                    this.coloredPlayers[n[0]] = n[1] || 1
                                }
                        },
                        getDefaultFirstTab: function() {
                            return a.DEFAULT_FIRST_TAB
                        },
                        getDefaultMobileTab: function() {
                            return a.DEFAULT_MOBILE_TAB
                        },
                        _parseExpandedPlayers: function(e, t) {
                            var r = this._readFromCookie(e);
                            if (r)
                                for (var o = r.split(a.COOKIE_SPLITTER), n = 0; n < o.length; n++) {
                                    var i = o[n].split(a.COOKIE_KEY_VALUE_SEPARATOR);
                                    t[i[0]] = {
                                        firstTab: i[1] || this.getDefaultFirstTab(),
                                        mobileTab: i[3] || this.getDefaultMobileTab()
                                    }
                                }
                        },
                        _readFromCookie: function(t) {
                            return e.cookie(t) || null
                        },
                        _storeCookie: function(t, r, o) {
                            e.cookie(t, r, {
                                expires: o,
                                path: "/"
                            })
                        },
                        _saveToCookie: function(e, t) {
                            this._storeCookie(e, t, a.COOKIE_EXPIRATION_TIME)
                        },
                        _removeFromCookie: function(t) {
                            e.removeCookie(t)
                        },
                        _parsePlayerList: function(e) {
                            return e ? e.split(a.COOKIE_SPLITTER) : []
                        },
                        _buildPlayerList: function(e) {
                            return e ? e.join(a.COOKIE_SPLITTER) : ""
                        },
                        _buildExpandedPlayersList: function(e) {
                            var t = "";
                            for (var r in e) e.hasOwnProperty(r) && e[r] && (t && (t += a.COOKIE_SPLITTER), t += r + a.COOKIE_KEY_VALUE_SEPARATOR + e[r].firstTab + a.COOKIE_KEY_VALUE_SEPARATOR + e[r].mobileTab);
                            return t
                        },
                        setPlayByPlayOn: function(e) {
                            this.playByPlayOn = e, this.playByPlayOn ? this._saveToCookie(a.PBP_ON_COOKIE_KEY, "true") : this._removeFromCookie(a.PBP_ON_COOKIE_KEY)
                        },
                        addExpandedPlayer: function(e, t, r, o) {
                            var n, i, d = t ? this.favouriteExpandedPlayers : this.expandedPlayers;
                            this.setPlayerTabs(d, e, r, o), t ? (n = a.FAVOURITE_EXPANDED_PLAYERS_COOKIE_KEY, i = this._buildExpandedPlayersList(this.favouriteExpandedPlayers)) : (n = a.EXPANDED_PLAYERS_COOKIE_KEY, i = this._buildExpandedPlayersList(this.expandedPlayers)), this._saveToCookie(n, i)
                        },
                        setPlayerTabs: function(e, t, r, o) {
                            var a = e[t];
                            e[t] = {
                                firstTab: r || (a && a.firstTab ? a.firstTab : this.getDefaultFirstTab()),
                                mobileTab: o || (a && a.mobileTab ? a.mobileTab : this.getDefaultMobileTab())
                            }
                        },
                        removeExpandedPlayer: function(e, t) {
                            var r, o;
                            t ? (this.favouriteExpandedPlayers[e] = null, delete this.favouriteExpandedPlayers[e], r = a.FAVOURITE_EXPANDED_PLAYERS_COOKIE_KEY, o = this._buildExpandedPlayersList(this.favouriteExpandedPlayers)) : (this.expandedPlayers[e] = null, delete this.expandedPlayers[e], r = a.EXPANDED_PLAYERS_COOKIE_KEY, o = this._buildExpandedPlayersList(this.expandedPlayers)), this._saveToCookie(r, o)
                        },
                        isExpandedPlayer: function(e, t) {
                            return t ? this.favouriteExpandedPlayers[e] : this.expandedPlayers[e]
                        },
                        isFavouritePlayer: function(t) {
                            return e.inArray(t, this.favouritePlayers) > -1
                        },
                        addFavouritePlayer: function(t) {
                            e.inArray(t, this.favouritePlayers) > -1 || (this.favouritePlayers.push(t), this._saveToCookie(a.FAVOURITE_PLAYERS_COOKIE_KEY, this._buildPlayerList(this.favouritePlayers)))
                        },
                        removeFavouritePlayer: function(t) {
                            var r = e.inArray(t, this.favouritePlayers); - 1 !== r && (this.favouritePlayers = this.favouritePlayers.slice(0, r).concat(this.favouritePlayers.slice(r + 1, this.favouritePlayers.length)), this._saveToCookie(a.FAVOURITE_PLAYERS_COOKIE_KEY, this._buildPlayerList(this.favouritePlayers)), this.removeExpandedPlayer(t, !0))
                        },
                        setColoredPlayer: function(e, t) {
                            this.coloredPlayers[e] = t && 0 !== t ? t : null;
                            var r = "";
                            for (var o in this.coloredPlayers) this.coloredPlayers.hasOwnProperty(o) && this.coloredPlayers[o] && (r && (r += a.COOKIE_SPLITTER), r += o + a.COOKIE_KEY_VALUE_SEPARATOR + this.coloredPlayers[o]);
                            this._saveToCookie(a.COLORED_PLAYERS_COOKIE_KEY, r)
                        },
                        setSortPreference: function(e, t) {
                            this.sortPreference = e, this.sortAscending = t
                        },
                        showToolTips: function(e) {
                            this.toolTipsWasShownOnTabs.push(e);
                            var t = JSON.stringify(this.toolTipsWasShownOnTabs);
                            this._storeCookie(a.TOOLTIPS_TABS, t, a.TOOLTIPS_COOKIE_EXPIRATION_TIME)
                        }
                    });
                a.FAVOURITE_PLAYERS_COOKIE_KEY = "lb_myLb", a.EXPANDED_PLAYERS_COOKIE_KEY = "lb_exp", a.FAVOURITE_EXPANDED_PLAYERS_COOKIE_KEY = "myLb_exp", a.COLORED_PLAYERS_COOKIE_KEY = "lb_highlights", a.PBP_ON_COOKIE_KEY = "lb_pbp", a.SORT_COOKIE_KEY = "lb_sort", a.TOOLTIPS = "lb_tooltips", a.TOOLTIPS_TABS = "lb_tooltips_tabs", a.GIGYA_LOGIN_PROMPT_COOKIE_KEY = "lb_gygya_login", a.COOKIE_SPLITTER = ",", a.COOKIE_KEY_VALUE_SEPARATOR = "|", a.COOKIE_EXPIRATION_TIME = 3650, a.TOOLTIPS_COOKIE_EXPIRATION_TIME = 1, a.GIGYA_LOGIN_PROMPT_COOKIE_EXPIRATION_TIME = 30, a.DEFAULT_FIRST_TAB = "shottracker", a.DEFAULT_FIRST_TAB_SCORE2 = "playbyplay", a.DEFAULT_MOBILE_TAB = "shottracker", a.DEFAULT_MOBILE_TAB_SCORE2 = "playbyplay"
            }(jQuery, window, pgatour)
        },
        "131C": function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.LeaderboardPresenter = o.LeaderboardPresenter || r.BaseModule.extend({
                    MESSAGE: ".message-outer",
                    DEBUG_SECTION: "#lbnLeaderboardDebugInfo",
                    LAST_UPDATE_CONTAINER: "#lbnLastUpdateContainer",
                    LEADERBOARD_HEADER_CONTAINER: "#lbnLeaderboardHeaderContainer",
                    LIVE_BROADCAST_CONTAINER: "#lbnLiveBroadcastContainer",
                    LIVE_BROADCAST_TEMPLATE: "#lbnLiveBroadcastTemplate",
                    HEADER_VIEW_TEMPLATE: "#lbnHeaderViewTemplate",
                    SORT_SELECTOR: ".leaderboard-head .sorting .sort-trigger",
                    PBP_OFF_CLASS: ".play-by-play .off",
                    PBP_ON_CLASS: ".play-by-play .on",
                    PBP_CONTENT: ".leaderboard-item .play-by-play-content",
                    PBP_TOGGLE: ".play-by-play .switcher",
                    CUT_LINE_ELEMENT: ".cut-line",
                    CUT_LINE_AD: "#lbnCutLineAd",
                    SPONSOR_LOGO_LEGEND: "#sponsorLogoLegend",
                    HIGHLIGHT_MOVERS_LEGEND_ITEM: "#moversHighlight",
                    CONTENT_CONTAINER: ".leaderboard-main-content",
                    LIVE_VIDEO: ".btn-live.watch",
                    LIVE_AUDIO: ".btn-live.listen",
                    SIMULCAST: ".btn-live.cbs",
                    FIRST_5_LEADERBOARD_CONTAINER: "#lbnFirst5LeaderboardContainer",
                    FROM_6_TO_10_LEADERBOARD_CONTAINER: "#lbnFrom6To10LeaderboardContainer",
                    FROM_11_TO_15_LEADERBOARD_CONTAINER: "#lbnFrom11To15LeaderboardContainer",
                    FROM_16_TO_30_LEADERBOARD_CONTAINER: "#lbnFrom16To30LeaderboardContainer",
                    FROM_31_TO_50_LEADERBOARD_CONTAINER: "#lbnFrom31To50LeaderboardContainer",
                    FROM_51_TO_THE_END_LEADERBOARD_CONTAINER: "#lbnFrom51ToTheEndLeaderboardContainer",
                    CUT_LINE_TEMPLATE: "#lbnCutLineTemplate",
                    SORT_SELECTOR_PARENT: ".leaderboard-head .sorting",
                    SORT_UP_CLASS: "sort-asc",
                    SORT_DOWN_CLASS: "sort-desc",
                    NO_DATA_MESSAGE: ".no-data-message",
                    FAVOURITE_LB: ".no-data-hidden",
                    SCORE_TYPE_CLASSES: "scoring-type-1 scoring-type-2 scoring-type-3",
                    SCORE_TYPE_CLASS_PREFIX: "scoring-type-",
                    context: null,
                    initialized: !1,
                    playerRows: null,
                    $message: null,
                    $debugSection: null,
                    $lastUpdatedContainer: null,
                    $leaderboardHeaderContainer: null,
                    $headerViewTemplate: null,
                    $contentContainer: null,
                    $first5LeaderboardContainer: null,
                    $from6To10LeaderboardContainer: null,
                    $from11To15LeaderboardContainer: null,
                    $from16To30LeaderboardContainer: null,
                    $from31To50LeaderboardContainer: null,
                    $from51ToTheEndLeaderboardContainer: null,
                    $cutLineTemplate: null,
                    $liveVideo: null,
                    $liveAudio: null,
                    $simulcast: null,
                    constructor: function(e) {
                        this.context = e, this.playerRows = {}, this.base(this.context.container), this.setElements(), this.setAdvertisementElements()
                    },
                    setElements: function() {
                        this.$message = e(this.MESSAGE), this.$debugSection = e(this.DEBUG_SECTION), this.$lastUpdatedContainer = e(this.LAST_UPDATE_CONTAINER), this.$leaderboardHeaderContainer = e(this.LEADERBOARD_HEADER_CONTAINER), this.$liveBroadcastContainer = e(this.LIVE_BROADCAST_CONTAINER), this.$liveBroadcastTemplate = e(this.LIVE_BROADCAST_TEMPLATE), this.$headerViewTemplate = e(this.HEADER_VIEW_TEMPLATE), this.$highlightMoversLegendItem = e(this.HIGHLIGHT_MOVERS_LEGEND_ITEM), this.$cutLineTemplate = e(this.CUT_LINE_TEMPLATE), this.$contentContainer = e(this.CONTENT_CONTAINER)
                    },
                    setAdvertisementElements: function() {
                        this.$first5LeaderboardContainer = e(this.FIRST_5_LEADERBOARD_CONTAINER), this.$from6To10LeaderboardContainer = e(this.FROM_6_TO_10_LEADERBOARD_CONTAINER), this.$from11To15LeaderboardContainer = e(this.FROM_11_TO_15_LEADERBOARD_CONTAINER), this.$from16To30LeaderboardContainer = e(this.FROM_16_TO_30_LEADERBOARD_CONTAINER), this.$from31To50LeaderboardContainer = e(this.FROM_31_TO_50_LEADERBOARD_CONTAINER), this.$from51ToTheEndLeaderboardContainer = e(this.FROM_51_TO_THE_END_LEADERBOARD_CONTAINER)
                    },
                    init: function() {
                        this.base();
                        var e = this.context.config.broadcasts;
                        e && (this.liveId = r.CountrySchedule.getLiveId(e), this.renderLiveIcons(), r.CountrySchedule.initLiveEvents(e, this.proxy(this.onUpdateLiveIcons))), this.enableHighlightLegendItem(!1)
                    },
                    scroll: function() {
                        r.WebPerformanceTracker.trackFirstScrollEvent()
                    },
                    done: function() {
                        setTimeout(this.proxy(this.trackDefaultNREventsForOmniture), 0)
                    },
                    render: function() {
                        this.initialized || this.renderInit(), e(t).trigger("check-live-broadcast"), this.context.container.removeClass(this.SCORE_TYPE_CLASSES), this.context.container.addClass(this.SCORE_TYPE_CLASS_PREFIX + this.context.leaderboardModel.scoringType), this.renderPlayers(new o.LeaderboardPlayerComparator(this.context, {
                            preference: this.context.userModel.sortPreference,
                            ascending: this.context.userModel.sortAscending
                        })), this.renderLastUpdatedTime(), this.context.config.useGigya || this.initialized || setTimeout(this.proxy(this.updateSuspendedAds), 20), this.initialized = !0
                    },
                    renderInit: function() {
                        this.renderHeader(), this.showSponsorLegend()
                    },
                    renderLiveIcons: function() {
                        var e = this.$liveBroadcastTemplate.tmpl({
                            video: this.context.config.liveButtons.liveVideoIcon,
                            audio: this.context.config.liveButtons.liveRadioIcon,
                            simulcast: this.context.config.liveButtons.simulcastIcon
                        });
                        this.$liveBroadcastContainer.append(e), this.$liveVideo = this.container.find(this.LIVE_VIDEO), this.$liveAudio = this.container.find(this.LIVE_AUDIO), this.$simulcast = this.container.find(this.SIMULCAST), this.onUpdateLiveIcons(!1, {
                            liveId: this.liveId
                        })
                    },
                    trackDefaultNREventsForOmniture: function() {
                        r.WebPerformanceTracker.trackDefaultNREventsForOmniture()
                    },
                    showSponsorLegend: function() {
                        this.context.config.sponsorName && this.context.config.playerSponsor && this.context.config.sponsorsJson && (this.container.find(this.SPONSOR_LOGO_LEGEND).show(), this.container.find(this.SPONSOR_LOGO_LEGEND).find("img").attr("src", this.context.config.playerSponsor))
                    },
                    showMessage: function() {
                        this.$message.show();
                        var e = this;
                        setTimeout(function() {
                            e.$message.fadeOut("slow")
                        }, 5e3)
                    },
                    renderLastUpdatedTime: function() {
                        if (this.$debugSection.html(this.context.leaderboardModel.debugInfo), this.context.leaderboardModel.lastUpdatedDate && this.context.config.lastUpdatedStrings) {
                            var e = r.formatLastUpdateTime(this.context.leaderboardModel.lastUpdatedDate, this.context.config.lastUpdatedStrings.lastUpdatedSeconds, this.context.config.lastUpdatedStrings.lastUpdatedMinutes, this.context.config.lastUpdatedStrings.lastUpdatedTimestamp);
                            e && this.$lastUpdatedContainer.html(e)
                        }
                    },
                    isTop25Seeds: function() {
                        if ("h" === this.context.leaderboardModel.tourCode && this.context.config.isFinals) {
                            var e = this.context.leaderboardModel.players;
                            for (var t in e)
                                if (e.hasOwnProperty(t) && e[t].rankings && e[t].rankings.top25_seed) return !0
                        }
                        return !1
                    },
                    renderHeader: function() {
                        this.context.container.addClass("rounds-" + this.context.leaderboardModel.rounds.length), this.$leaderboardHeaderContainer.html(this.$headerViewTemplate.tmpl({
                            isProAm: this.context.config.isProAm,
                            displayCountryForProAm: this.context.config.displayCountryForProAm,
                            rounds: this.context.leaderboardModel.rounds,
                            scoringType: this.context.leaderboardModel.scoringType,
                            hideStandings: this.context.config.hideStandings,
                            standingsLabel3: this.getHeaderLabel3()
                        })), this.container.find(this.SORT_SELECTOR).click(this.proxy(function(t) {
                            var r = e(t.currentTarget).attr(o.LeaderboardPresenter.SORTING_ATTRIBUTE_KEY);
                            this.context.controller.sortLeaderboard(r)
                        })), this.context.config.isProAm || this.container.find(this.PBP_TOGGLE).click(this.proxy(this.context.controller.pbpToggle)), this.updateSortHeaders(this.context.userModel.sortPreference, this.context.userModel.sortAscending)
                    },
                    getHeaderLabel3: function() {
                        var e, t = this.context.config.headerLabel3,
                            r = this.context.leaderboardModel.tourCode,
                            o = this.context.config.isFinals,
                            a = this.context.config.championsPlayoff,
                            n = this.isTop25Seeds(),
                            i = this.context.leaderboardModel.year;
                        return "s" === r && (e = a ? t.schwabCupPoints : t.schwabCupMoney), "h" === r && (e = o ? n ? t.theFinals25 : t.priorityRank : i <= 2018 ? t.moneyRank : t.pointsRank), "c" === r && (e = t.orderOfMerit), "m" === r && (e = t.losCinco), "r" === r && (e = t.fedExCup), e
                    },
                    checkPlayByPlay: function() {
                        this.context.userModel.playByPlayOn ? (this.container.find(this.PBP_ON_CLASS).show(), this.container.find(this.PBP_OFF_CLASS).hide(), this.container.find(this.PBP_CONTENT).show()) : (this.container.find(this.PBP_ON_CLASS).hide(), this.container.find(this.PBP_OFF_CLASS).show(), this.container.find(this.PBP_CONTENT).hide()), this.context.analytics.toggleGlobalPbp(this.context.userModel.playByPlayOn)
                    },
                    renderPlayersInit: function(o) {
                        var a = this.context.leaderboardModel.getPlayers(o, null),
                            n = {
                                $anchor: null,
                                previousDestination: null,
                                $first5: e(t.document.createDocumentFragment()),
                                $from6To10: e(t.document.createDocumentFragment()),
                                $from11To15: e(t.document.createDocumentFragment()),
                                $from16To30: e(t.document.createDocumentFragment()),
                                $from31To50: e(t.document.createDocumentFragment()),
                                $from51ToTheEnd: e(t.document.createDocumentFragment())
                            };
                        e.each(a, this.proxy(this.renderPlayerInit, n, o)), this.$first5LeaderboardContainer.append(n.$first5), r.WebPerformanceTracker.trackFirstPlayerRendered(), this.$from6To10LeaderboardContainer.append(n.$from6To10), this.$from11To15LeaderboardContainer.append(n.$from11To15), this.$from16To30LeaderboardContainer.append(n.$from16To30), this.$from31To50LeaderboardContainer.append(n.$from31To50), this.$from51ToTheEndLeaderboardContainer.append(n.$from51ToTheEnd), (o && !o.isDefaultSort() || !this.context.leaderboardModel.getCutLinePosition()) && this.hideCutLine()
                    },
                    renderPlayerInit: function(t, r, a, n) {
                        var i = this.getPlayersRenderDestination(a, t),
                            d = n.player_id,
                            s = this.context.leaderboardModel.getCutLinePosition() - 1 === a;
                        this.setPlayerAnchor(t, i), this.playerRows[d] = new o.PlayerRow(i, d, !1, this.context), this.playerRows[d].render(a), t.previousDestination = i, t.$anchor = this.playerRows[d].playerRow, (!r || r.isDefaultSort() && s) && (this.renderCutLine(t.$anchor), t.$anchor = e(this.CUT_LINE_AD))
                    },
                    setPlayerAnchor: function(e, t) {
                        e.previousDestination && e.previousDestination[0] === t[0] || (e.$anchor = null)
                    },
                    renderPlayers: function(t) {
                        if (this.initialized) {
                            var r = this.context.leaderboardModel.getPlayers(t, null),
                                o = {
                                    $anchor: null,
                                    previousDestination: null,
                                    $first5: this.$first5LeaderboardContainer,
                                    $from6To10: this.$from6To10LeaderboardContainer,
                                    $from11To15: this.$from11To15LeaderboardContainer,
                                    $from16To30: this.$from16To30LeaderboardContainer,
                                    $from31To50: this.$from31To50LeaderboardContainer,
                                    $from51ToTheEnd: this.$from51ToTheEndLeaderboardContainer
                                };
                            e.each(r, this.proxy(this.renderPlayer, o, t)), this.updateCutLine(t)
                        } else this.renderPlayersInit(t)
                    },
                    renderPlayer: function(e, t, r, a) {
                        var n = this.getPlayersRenderDestination(r, e),
                            i = a.player_id;
                        this.setPlayerAnchor(e, n), this.playerRows[i] && (this.playerRows[i].playerRow.attr(o.PlayerRow.INDEX_ATTRIBUTE) !== r.toString() && (e.$anchor ? e.$anchor.after(this.playerRows[i].playerRow) : n.prepend(this.playerRows[i].playerRow), this.playerRows[i].updateAdvertisement = !0), this.playerRows[i].render(r), e.previousDestination = n, e.$anchor = this.updateCutLine(t, r, this.playerRows[i].playerRow))
                    },
                    updateCutLine: function(e, t, r) {
                        var o = this.context.leaderboardModel.getCutLinePosition();
                        if (void 0 !== t) {
                            var a = o - 1 === t;
                            return !e || e.isDefaultSort() && a ? (this.renderCutLine(r), this.container.find(this.CUT_LINE_AD)) : r
                        }
                        return (e && !e.isDefaultSort() || !o) && this.hideCutLine(), null
                    },
                    getPlayersRenderDestination: function(e, t) {
                        return e < 5 ? t.$first5 : e < 10 ? t.$from6To10 : e < 15 ? t.$from11To15 : e < 30 ? t.$from16To30 : e < 50 ? t.$from31To50 : t.$from51ToTheEnd
                    },
                    renderCutLine: function(t) {
                        if (this.container.find(this.CUT_LINE_ELEMENT).attr(o.PlayerRow.INDEX_ATTRIBUTE) !== this.context.leaderboardModel.getCutLinePosition()) {
                            this.container.find(this.CUT_LINE_ELEMENT).remove(), e(t).after(e(this.CUT_LINE_TEMPLATE).tmpl({
                                cutLine: this.context.leaderboardModel.cutLine,
                                utils: this.context.utils
                            })), this.container.find(this.CUT_LINE_ELEMENT).attr(o.PlayerRow.INDEX_ATTRIBUTE, this.context.leaderboardModel.getCutLinePosition()), this.container.find(this.CUT_LINE_ELEMENT).after(e(this.CUT_LINE_AD));
                            var r = e(this.CUT_LINE_AD).find(".js-ad").data("ad-api");
                            r && r.update && r.update()
                        }
                    },
                    hideCutLine: function() {
                        if (this.container.find(this.CUT_LINE_ELEMENT).length) {
                            this.container.find(this.CUT_LINE_ELEMENT).remove(), this.container.find(this.CUT_LINE_AD).appendTo(this.FROM_51_TO_THE_END_LEADERBOARD_CONTAINER);
                            var e = this.container.find(this.CUT_LINE_AD).find(".js-ad").data("ad-api");
                            e && e.update && e.update()
                        }
                    },
                    updateSortHeaders: function(e, t) {
                        this.container.find(this.SORT_SELECTOR_PARENT).removeClass(this.SORT_UP_CLASS), this.container.find(this.SORT_SELECTOR_PARENT).removeClass(this.SORT_DOWN_CLASS);
                        var r = o.LeaderboardPresenter.SORTING_ATTRIBUTE_KEY,
                            a = this.SORT_SELECTOR + "[" + r + "=" + e + "]",
                            n = this.container.find(a);
                        n.parents(this.SORT_SELECTOR_PARENT).addClass(t ? this.SORT_DOWN_CLASS : this.SORT_UP_CLASS), "first-name" !== e || !1 !== t ? "last-name" === e && !1 === t && n.attr(o.LeaderboardPresenter.SORTING_ATTRIBUTE_KEY, "first-name") : n.attr(o.LeaderboardPresenter.SORTING_ATTRIBUTE_KEY, "last-name")
                    },
                    updateSuspendedAds: function() {
                        var t, o, a = this.context.config.adsToRefresh;
                        if (a) {
                            o = this.$contentContainer.find(a);
                            for (var n = 0; n < o.length; n++)(t = r.getAdvertisementAPI(e(o[n]))) && !t.justOnScroll && t.resume()
                        }
                    },
                    showDataNotAvailable: function() {
                        this.container.find(this.FAVOURITE_LB).hide(), this.container.find(this.NO_DATA_MESSAGE).show()
                    },
                    setHighlightLegendItemColor: function(e) {
                        this.$highlightMoversLegendItem.find(".legend-icon.movers").css("background", e)
                    },
                    enableHighlightLegendItem: function(e) {
                        this.$highlightMoversLegendItem.toggle(e)
                    },
                    updateLiveUrls: function(e, t) {
                        r.BroadcastNotifier.updateLiveUrl(this.$liveVideo.find("a"), e.liveVideoIcon, t.noneSimulcast, e.overrideVideo), r.BroadcastNotifier.updateLiveUrl(this.$liveAudio.find("a"), e.liveRadioIcon, t.liveAudio, e.overrideRadio), r.BroadcastNotifier.updateLiveUrl(this.$simulcast.find("a"), e.simulcastIcon, t.simulcast, e.overrideSimulcast)
                    },
                    onUpdateLiveIcons: function(e, t) {
                        if (t.liveId === this.liveId) {
                            var r = this.context.config.liveButtons,
                                o = {
                                    video: r.overrideVideo || Boolean(t.noneSimulcast),
                                    audio: r.overrideRadio || Boolean(t.liveAudio),
                                    simulcast: r.overrideSimulcast || Boolean(t.simulcast)
                                };
                            this.updateLiveUrls(r, t), this.$liveVideo.toggle(o.video), this.$liveAudio.toggle(o.audio), this.$simulcast.toggle(o.simulcast)
                        }
                    }
                }), o.LeaderboardPresenter.SORTING_ATTRIBUTE_KEY = "data-sorting"
            }(jQuery, window, pgatour)
        },
        "30eI": function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.Drawer = o.Drawer || r.BaseCssCloudinaryModule.extend({
                    EXPANDED_VIEW_TEMPLATE: "#lbnExpandedViewTemplate",
                    ROUND_SELECTOR_TEMPLATE: "#roundSelectorTemplate",
                    ROUND_SELECTOR_CONTAINER: ".round-selector-container",
                    PLAYER_PHOTO: ".player-photo",
                    EXPANSION_CLOSE_BUTTON: ".row-details-close",
                    DESKTOP_AD_300: ".visible-large .sponsor-advertisement-300",
                    DESKTOP_AD: ".visible-large .sponsor-advertisement",
                    TABLET_AD: ".visible-medium .sponsor-advertisement",
                    PHONE_AD: ".visible-small .sponsor-advertisement",
                    TAB_CONTENT_PHONE: ".visible-small .cell-fix",
                    FULL_SCORECARDS_LINK: "a.full-scorecards",
                    PLAYER_PROFILE_LINK: "a.player-profile",
                    context: null,
                    pid: null,
                    adBlock: null,
                    isMyLb: null,
                    rowIndex: null,
                    advertisement: null,
                    tabs: null,
                    openedTabs: null,
                    expandedViewTemplate: null,
                    initialized: !1,
                    drawerModel: null,
                    stickyAdVisible: !0,
                    constructor: function(e, t, o, a, n) {
                        this.container = e, this.adBlock = t, this.pid = o, this.isMyLb = a, this.context = n, this.tabs = {}, this.drawerModel = new r.leaderboard2.newlb.DrawerModel, this.openedTabs = {
                            firstTab: null,
                            mobileTab: null
                        }, this.base(e)
                    },
                    startProcessing: function(e, t) {
                        this.index = e, this.type = t, this._refreshPlayer(), this.initRoundSelector(this.proxy(this.onDrawerDataComplete))
                    },
                    initTemplate: function() {
                        this.expandedViewTemplate = this.context.config.getOrCreate(this.EXPANDED_VIEW_TEMPLATE), this.roundSelectorTemplate = this.context.config.getOrCreate(this.ROUND_SELECTOR_TEMPLATE);
                        var e = this.context.leaderboardModel.tourCode + this.context.leaderboardModel.tournamentId,
                            t = this.context.leaderboardModel.players[this.pid],
                            o = {
                                id: this.pid,
                                name: t.player_bio.url_name,
                                tId: e
                            };
                        this.container.html(this.expandedViewTemplate.tmpl({
                            player: t,
                            rounds: this.context.leaderboardModel.rounds.length,
                            scoringType: this.context.leaderboardModel.scoringType,
                            hasMedia: this.context.media.hasMedia(this.pid),
                            tourCode: this.context.leaderboardModel.tourCode,
                            tournamentId: this.context.leaderboardModel.tournamentId,
                            hideProfileButton: this.context.config.hideProfileButton || r.isSmallScreen() && "dns" === t.status.toLowerCase(),
                            hideScorecardsButton: this.context.config.hideScorecardsButton || r.isSmallScreen() && "dns" === t.status.toLowerCase(),
                            hideFullStatsButton: this.context.config.hideFullStatsButton,
                            scorecardsURL: r.format(this.context.config.scorecardsURL, o),
                            profilesURL: r.format(this.context.config.profilesURL, o),
                            hideStandings: this.context.config.hideStandings,
                            hideDrawerAd: this.context.config.hideDrawerAd
                        })), this.tabContentPhone = this.container.find(this.TAB_CONTENT_PHONE), this.roundSelectorContainer = this.container.find(this.ROUND_SELECTOR_CONTAINER)
                    },
                    initBindings: function() {
                        try {
                            this.container.find(this.PLAYER_PHOTO).cloudinary(this.context.config.cloudinaryOptions)
                        } catch (e) {}
                        this.container.find(this.EXPANSION_CLOSE_BUTTON).click(this.proxy(this.onCloseClick)), this.container.find(this.FULL_SCORECARDS_LINK).click(this.proxy(this.onFullScorecardsClick)), this.container.find(this.PLAYER_PROFILE_LINK).click(this.proxy(this.onPlayerProfileClick)), this.tabs = this.context.tabsFactory.createTabs(this.container, this.pid, this.isMyLb, this.tabs, this.player), this.container.find("a.tab").click(this.proxy(function(t) {
                            var r = e(t.currentTarget).attr("data-tab-type");
                            this.context.controller.tabSelect(this.pid, this.isMyLb, r), this.context.analytics.drawerTabSelect(this.pid, r, this)
                        }))
                    },
                    layout: function() {
                        this.expandedViewTemplate && (this.base(), this.initialized && this.container.is(":visible") && this.recreateTabs(), this.updateComponents(!0))
                    },
                    updateComponents: function(e, t) {
                        this.initialized = !0, e && this.showTabs(), this._updateTabs(), this.context.config.hideDrawerAd || this.initAdvertisement(t)
                    },
                    scroll: function() {
                        e("body").trigger("toggle-ad-visibility", {
                            id: this.container[0].id,
                            visibility: !(this.container.is(":visible") && this.container.visible(!0))
                        })
                    },
                    open: function(r, o) {
                        if (e("body").trigger("toggle-ad-visibility", {
                                id: this.container[0].id,
                                visibility: !1
                            }), this.initialized && this.updateComponents(!1, r), this.onRefreshPlayerComplete(r, o), this.isSmallScreen()) {
                            var a = this.$container.parents(".tournament-leaderboard-tabs"),
                                n = a.hasClass("has-videos") && !a.hasClass("fixed-position") ? 90 : 50;
                            t.scrollTo(0, this.container.offset().top - n)
                        }
                        this.applyCloudinary()
                    },
                    close: function() {
                        e("body").trigger("toggle-ad-visibility", {
                            id: this.container[0].id,
                            visibility: !0
                        })
                    },
                    update: function() {
                        this._refreshPlayer(), this.initRoundSelector(this.proxy(this.renderRoundSelector))
                    },
                    _refreshPlayer: function() {
                        var e = this.context.leaderboardModel.players[this.pid];
                        this.drawerModel.loadFromLeaderBoard(e, this.context.leaderboardModel), this.drawerModel.loadFromPlayerInfo(this.context.leaderboardModel.playerInfo[this.pid]), this.drawerModel.loadFromPlayerRoundData(this.context.leaderboardModel.playerRoundData[this.pid], this.context.leaderboardModel.courses), this.drawerModel.loadFromRoundCourseHoleData(this.context.leaderboardModel.roundCourseHoleData), this.drawerModel.loadFromPlayerStats(this.context.leaderboardModel.playerStatsByRound[this.pid]), this.player = this.drawerModel.getPlayerModel(this.context.leaderboardModel)
                    },
                    _updateTabs: function() {
                        for (var e in this.tabs)
                            if (this.tabs.hasOwnProperty(e))
                                for (var t = 0; t < this.tabs[e].length; t++) this.updateTab(this.tabs[e][t], this.player)
                    },
                    updateTab: function(e, t) {
                        e && e.setCurrentHole && e.setCurrentHole(t.selectedHole, t.selectedRoundId), e && e.update && e.update(t)
                    },
                    initAdvertisement: function() {
                        if (this.advertisement && this.advertisement.length > 0) {
                            var e = this.context.controller.getRow(this.pid, this.isMyLb);
                            if (e.updateAdvertisement)
                                for (var t = 0; t < this.advertisement.length; t++) this.advertisement[t].update();
                            e.updateAdvertisement = !1
                        } else {
                            var o = this.context.leaderboardModel.players[this.pid],
                                a = {
                                    pos: this.context.config.drawerAdPosBig,
                                    player: (o.player_bio.first_name + "-" + o.player_bio.last_name).toLowerCase()
                                };
                            o.sponsors && o.sponsors.length && (a.sponsor = o.sponsors);
                            var n = "drawer_" + this.pid + (this.isMyLb ? "_mylb" : "_main");
                            this.advertisement = [new r.Ad(this.container.find(this.DESKTOP_AD_300), {
                                size: {
                                    large: [300, 250]
                                },
                                refreshOnResize: !0,
                                options: a,
                                group: n
                            }), new r.Ad(this.adBlock.find(this.TABLET_AD), {
                                size: {
                                    medium: [728, 90]
                                },
                                refreshOnResize: !0,
                                options: a,
                                group: n
                            }), new r.Ad(this.adBlock.find(this.PHONE_AD), {
                                size: {
                                    small: [320, 50]
                                },
                                refreshOnResize: !0,
                                options: a,
                                group: n
                            })], a.pos = this.context.config.drawerAdPosSmall, this.advertisement.push(new r.Ad(this.container.find(this.DESKTOP_AD), {
                                size: {
                                    large: [
                                        [88, 31],
                                        [131, 31]
                                    ]
                                },
                                refreshOnResize: !0,
                                options: a,
                                group: n
                            })), this.advertisement.push(new r.Ad(this.container.find(this.TABLET_AD), {
                                size: {
                                    medium: [
                                        [88, 31],
                                        [131, 31]
                                    ]
                                },
                                refreshOnResize: !0,
                                options: a,
                                group: n
                            })), this.advertisement.push(new r.Ad(this.container.find(this.PHONE_AD), {
                                size: {
                                    small: [
                                        [88, 31],
                                        [206, 31]
                                    ]
                                },
                                refreshOnResize: !0,
                                options: a,
                                group: n
                            })), this.initAdvertisementTracking()
                        }
                    },
                    initAdvertisementTracking: function() {
                        this.trackDrawerAdVisibility(), this.trackSponsorAdVisibility()
                    },
                    trackDrawerAdVisibility: function() {
                        var e = this.container.find(this.DESKTOP_AD_300).data("ad-api"),
                            t = this.adBlock.find(this.TABLET_AD).data("ad-api"),
                            r = this.adBlock.find(this.PHONE_AD).data("ad-api");
                        e.addViewableCallback(this.proxy(this.onDrawerAdViewable)), t.addViewableCallback(this.proxy(this.onDrawerAdViewable)), r.addViewableCallback(this.proxy(this.onDrawerAdViewable)), e.addRequestCallback(this.proxy(this.onDrawerAdRequest)), t.addRequestCallback(this.proxy(this.onDrawerAdRequest)), r.addRequestCallback(this.proxy(this.onDrawerAdRequest))
                    },
                    trackSponsorAdVisibility: function() {
                        var e = this.container.find(this.DESKTOP_AD).data("ad-api"),
                            t = this.container.find(this.TABLET_AD).data("ad-api"),
                            r = this.container.find(this.PHONE_AD).data("ad-api");
                        e.addViewableCallback(this.proxy(this.onSponsorAdViewable)), t.addViewableCallback(this.proxy(this.onSponsorAdViewable)), r.addViewableCallback(this.proxy(this.onSponsorAdViewable)), e.addRequestCallback(this.proxy(this.onSponsorAdRequest)), t.addRequestCallback(this.proxy(this.onSponsorAdRequest)), r.addRequestCallback(this.proxy(this.onSponsorAdRequest))
                    },
                    hideTab: function(e, t) {
                        if (e && this.tabs[e] && t && this.tabs[t])
                            for (var r = 0; r < this.tabs[e].length; r++) this.tabs[e][r].hide()
                    },
                    showTab: function(e, t) {
                        var r;
                        if (t && this.tabs[t]) {
                            for (var o = 0; o < this.tabs[t].length; o++)(r = this.tabs[t][o]).tabSize === this.getScreenSize() && r.show(t);
                            this.tabContentPhone.removeClass().addClass("cell-fix cell-" + t)
                        }
                    },
                    showTabs: function() {
                        var e;
                        if (e = this.isMyLb ? this.context.userModel.favouriteExpandedPlayers[this.pid] : this.context.userModel.expandedPlayers[this.pid]) {
                            var t = this.openedTabs.firstTab,
                                r = this.openedTabs.mobileTab;
                            this.openedTabs.firstTab = e.firstTab, this.openedTabs.mobileTab = e.mobileTab, this.hideTab(t, this.openedTabs.firstTab), this.hideTab(r, this.openedTabs.mobileTab), this.isLargeScreen() ? this.showTab(t, this.openedTabs.firstTab) : this.showTab(r, this.openedTabs.mobileTab)
                        }
                    },
                    recreateTabs: function() {
                        var t = this.context.tabsFactory.createTabs(this.container, this.pid, this.isMyLb, this.tabs, this.player);
                        if (t) {
                            var r = this;
                            for (var o in t) t.hasOwnProperty(o) && t[o] && (this.tabs[o] = t[o]);
                            var a = this.container.find("a.tab");
                            a.unbind("click"), a.click(function() {
                                r.context.controller.tabSelect(r.pid, r.isMyLb, e(this).attr("data-tab-type"))
                            })
                        }
                    },
                    updateIcons: function() {
                        this.tabs.videos && this.context.media.hasVideos(this.pid) && this.context.dataLoader.loadVideos(this.pid), this.tabs.photos && this.context.media.hasPhotos(this.pid) && this.context.dataLoader.loadPhotos(this.pid), this.tabs.articles && this.context.media.hasArticles(this.pid) && this.context.dataLoader.loadArticles(this.pid)
                    },
                    initRoundSelector: function(e) {
                        var t = e,
                            r = parseInt(this.player.current_round || 0, 10);
                        r > 1 || this.player.isCutWithPreviousRounds ? (this.player.current_round !== this.player.selectedRoundId || this.player.isCutWithPreviousRounds || (t(), t = null), this.context.dataLoader.loadPlayersPreviousRounds(this.player, this.proxy(t)), r > 1 && this.container.addClass("round-selector-initialized")) : (this.container.removeClass("round-selector-initialized"), t && t())
                    },
                    renderRoundSelector: function() {
                        this._refreshPlayer(), this.roundSelectorContainer.html(this.roundSelectorTemplate.tmpl({
                            player: this.player,
                            roundText: this.context.config.roundText
                        })), this.roundSelectorContainer.find("[data-round]").on("click", this.proxy(this.onRoundSelectorChange)), this._updateTabs()
                    },
                    changeSelectedRound: function(e) {
                        this.roundSelectorContainer.addClass("in-progress"), this.drawerModel.updateSelectedRound(e), this._refreshPlayer(), this.initRoundSelector(this.proxy(function() {
                            this.drawerModel.updateSelectedRound(e), this.renderRoundSelector(), this.roundSelectorContainer.removeClass("in-progress")
                        }))
                    },
                    changeSelectedHole: function(e) {
                        this.drawerModel.updateSelectedHole(e), this._refreshPlayer(), this._updateTabs()
                    },
                    getCourseHoleId: function(e) {
                        for (var t, r = e.start_hole, o = e.holes, a = 0; a < o.length && (o[t = (e.start_hole - 1 + a) % 18].shots && o[t].shots.length); a++) r = parseInt(o[t].course_hole_id || 0, 10);
                        return r
                    },
                    onDrawerDataComplete: function() {
                        this.initTemplate(), t.requestAnimationFrame(this.proxy(this.onDrawerOpen)), this.initBindings(), this.open(this.index, this.type), this.player.isCutWithPreviousRounds && this.updateComponents(!0)
                    },
                    onRefreshPlayerComplete: function(e, t) {
                        this.renderRoundSelector(), this.rowIndex = e, "videos" === t && this.tabs[t] && r.isMediumScreen() && this.showTabs()
                    },
                    onRoundSelectorChange: function(t) {
                        var r = e(t.target),
                            o = parseInt(r.attr("data-round"), 10);
                        o !== this.player.selectedRoundId && this.changeSelectedRound(o)
                    },
                    onCloseClick: function(t) {
                        var r = e(t.target);
                        this.context.analytics.toggleDrawer(this.pid, !1, null, r), this.context.controller.closeDrawer(this.pid, this.isMyLb)
                    },
                    onFullScorecardsClick: function(t) {
                        var r = e(t.target).attr("data-player-id");
                        this.context.analytics.drawerFullScorecards(r)
                    },
                    onPlayerProfileClick: function(t) {
                        var r = e(t.target).attr("data-player-id");
                        this.context.analytics.drawerPlayerProfile(r)
                    },
                    onDrawerOpen: function() {
                        this.context.customEventTracker.trackDrawerOpen()
                    },
                    onDrawerAdViewable: function() {
                        this.context.customEventTracker.trackDrawerAdRender()
                    },
                    onSponsorAdViewable: function() {
                        this.context.customEventTracker.trackDrawerAdSponsorRender()
                    },
                    onDrawerAdRequest: function() {
                        this.context.customEventTracker.trackDrawerAdRequest()
                    },
                    onSponsorAdRequest: function() {
                        this.context.customEventTracker.trackSponsorAdRequest()
                    }
                })
            }(jQuery, window, pgatour)
        },
        "57wg": function(e, t) {
            (function() {
                var e = void 0;
                (function() {
                    ! function(t) {
                        var r, o, a = "hasOwnProperty",
                            n = /[\.\/]/,
                            i = function() {},
                            d = function(e, t) {
                                return e - t
                            },
                            s = {
                                n: {}
                            },
                            l = function(e, t) {
                                e = String(e);
                                var a, n = o,
                                    i = Array.prototype.slice.call(arguments, 2),
                                    s = l.listeners(e),
                                    c = 0,
                                    h = [],
                                    p = {},
                                    u = [],
                                    m = r;
                                r = e, o = 0;
                                for (var b = 0, f = s.length; b < f; b++) "zIndex" in s[b] && (h.push(s[b].zIndex), s[b].zIndex < 0 && (p[s[b].zIndex] = s[b]));
                                for (h.sort(d); h[c] < 0;)
                                    if (a = p[h[c++]], u.push(a.apply(t, i)), o) return o = n, u;
                                for (b = 0; b < f; b++)
                                    if ("zIndex" in (a = s[b]))
                                        if (a.zIndex == h[c]) {
                                            if (u.push(a.apply(t, i)), o) break;
                                            do {
                                                if ((a = p[h[++c]]) && u.push(a.apply(t, i)), o) break
                                            } while (a)
                                        } else p[a.zIndex] = a;
                                else if (u.push(a.apply(t, i)), o) break;
                                return o = n, r = m, u.length ? u : null
                            };
                        l._events = s, l.listeners = function(e) {
                            var t, r, o, a, i, d, l, c, h = e.split(n),
                                p = s,
                                u = [p],
                                m = [];
                            for (a = 0, i = h.length; a < i; a++) {
                                for (c = [], d = 0, l = u.length; d < l; d++)
                                    for (r = [(p = u[d].n)[h[a]], p["*"]], o = 2; o--;)(t = r[o]) && (c.push(t), m = m.concat(t.f || []));
                                u = c
                            }
                            return m
                        }, l.on = function(e, t) {
                            if (e = String(e), "function" != typeof t) return function() {};
                            for (var r = e.split(n), o = s, a = 0, d = r.length; a < d; a++) o = (o = o.n).hasOwnProperty(r[a]) && o[r[a]] || (o[r[a]] = {
                                n: {}
                            });
                            for (o.f = o.f || [], a = 0, d = o.f.length; a < d; a++)
                                if (o.f[a] == t) return i;
                            return o.f.push(t),
                                function(e) {
                                    +e == +e && (t.zIndex = +e)
                                }
                        }, l.f = function(e) {
                            var t = [].slice.call(arguments, 1);
                            return function() {
                                l.apply(null, [e, null].concat(t).concat([].slice.call(arguments, 0)))
                            }
                        }, l.stop = function() {
                            o = 1
                        }, l.nt = function(e) {
                            return e ? new RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)").test(r) : r
                        }, l.nts = function() {
                            return r.split(n)
                        }, l.off = l.unbind = function(e, t) {
                            if (e) {
                                var r, o, i, d, c, h, p, u = e.split(n),
                                    m = [s];
                                for (d = 0, c = u.length; d < c; d++)
                                    for (h = 0; h < m.length; h += i.length - 2) {
                                        if (i = [h, 1], r = m[h].n, "*" != u[d]) r[u[d]] && i.push(r[u[d]]);
                                        else
                                            for (o in r) r[a](o) && i.push(r[o]);
                                        m.splice.apply(m, i)
                                    }
                                for (d = 0, c = m.length; d < c; d++)
                                    for (r = m[d]; r.n;) {
                                        if (t) {
                                            if (r.f) {
                                                for (h = 0, p = r.f.length; h < p; h++)
                                                    if (r.f[h] == t) {
                                                        r.f.splice(h, 1);
                                                        break
                                                    }!r.f.length && delete r.f
                                            }
                                            for (o in r.n)
                                                if (r.n[a](o) && r.n[o].f) {
                                                    var b = r.n[o].f;
                                                    for (h = 0, p = b.length; h < p; h++)
                                                        if (b[h] == t) {
                                                            b.splice(h, 1);
                                                            break
                                                        }!b.length && delete r.n[o].f
                                                }
                                        } else
                                            for (o in delete r.f, r.n) r.n[a](o) && r.n[o].f && delete r.n[o].f;
                                        r = r.n
                                    }
                            } else l._events = s = {
                                n: {}
                            }
                        }, l.once = function(e, t) {
                            var r = function() {
                                return l.unbind(e, r), t.apply(this, arguments)
                            };
                            return l.on(e, r)
                        }, l.version = "0.4.2", l.toString = function() {
                            return "You are running Eve 0.4.2"
                        }, (!1).exports || (void 0 !== e ? e("eve", [], function() {
                            return l
                        }) : t.eve = l)
                    }(this),
                    function(t, r) {
                        "function" == typeof e && e.amd ? e(["eve"], function(e) {
                            return r(t, e)
                        }) : r(t, t.eve)
                    }(this, function(e, t) {
                        function r(e) {
                            if (r.is(e, "function")) return o ? e() : t.on("raphael.DOMload", e);
                            if (r.is(e, A)) return r._engine.create[p](r, e.splice(0, 3 + r.is(e[0], S))).add(e);
                            var a = Array.prototype.slice.call(arguments, 0);
                            if (r.is(a[a.length - 1], "function")) {
                                var n = a.pop();
                                return o ? n.call(r._engine.create[p](r, a)) : t.on("raphael.DOMload", function() {
                                    n.call(r._engine.create[p](r, a))
                                })
                            }
                            return r._engine.create[p](r, arguments)
                        }
                        r.version = "2.1.2", r.eve = t;
                        var o, a, n = /[, ]+/,
                            i = {
                                circle: 1,
                                rect: 1,
                                path: 1,
                                ellipse: 1,
                                text: 1,
                                image: 1
                            },
                            d = /\{(\d+)\}/g,
                            s = "hasOwnProperty",
                            l = {
                                doc: document,
                                win: e
                            },
                            c = {
                                was: Object.prototype[s].call(l.win, "Raphael"),
                                is: l.win.Raphael
                            },
                            h = function() {
                                this.ca = this.customAttributes = {}
                            },
                            p = "apply",
                            u = "concat",
                            m = "ontouchstart" in l.win || l.win.DocumentTouch && l.doc instanceof DocumentTouch,
                            b = "",
                            f = " ",
                            g = String,
                            w = "split",
                            x = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [w](f),
                            y = {
                                mousedown: "touchstart",
                                mousemove: "touchmove",
                                mouseup: "touchend"
                            },
                            v = g.prototype.toLowerCase,
                            k = Math,
                            _ = k.max,
                            T = k.min,
                            E = k.abs,
                            C = k.pow,
                            R = k.PI,
                            S = "number",
                            A = "array",
                            P = Object.prototype.toString,
                            L = (r._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),
                            M = {
                                NaN: 1,
                                Infinity: 1,
                                "-Infinity": 1
                            },
                            B = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
                            O = k.round,
                            I = parseFloat,
                            N = parseInt,
                            D = g.prototype.toUpperCase,
                            F = r._availableAttrs = {
                                "arrow-end": "none",
                                "arrow-start": "none",
                                blur: 0,
                                "clip-rect": "0 0 1e9 1e9",
                                cursor: "default",
                                cx: 0,
                                cy: 0,
                                fill: "#fff",
                                "fill-opacity": 1,
                                font: '10px "Arial"',
                                "font-family": '"Arial"',
                                "font-size": "10",
                                "font-style": "normal",
                                "font-weight": 400,
                                gradient: 0,
                                height: 0,
                                href: "http://raphaeljs.com/",
                                "letter-spacing": 0,
                                opacity: 1,
                                path: "M0,0",
                                r: 0,
                                rx: 0,
                                ry: 0,
                                src: "",
                                stroke: "#000",
                                "stroke-dasharray": "",
                                "stroke-linecap": "butt",
                                "stroke-linejoin": "butt",
                                "stroke-miterlimit": 0,
                                "stroke-opacity": 1,
                                "stroke-width": 1,
                                target: "_blank",
                                "text-anchor": "middle",
                                title: "Raphael",
                                transform: "",
                                width: 0,
                                x: 0,
                                y: 0
                            },
                            H = r._availableAnimAttrs = {
                                blur: S,
                                "clip-rect": "csv",
                                cx: S,
                                cy: S,
                                fill: "colour",
                                "fill-opacity": S,
                                "font-size": S,
                                height: S,
                                opacity: S,
                                path: "path",
                                r: S,
                                rx: S,
                                ry: S,
                                stroke: "colour",
                                "stroke-opacity": S,
                                "stroke-width": S,
                                transform: "transform",
                                width: S,
                                x: S,
                                y: S
                            },
                            V = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
                            z = {
                                hs: 1,
                                rg: 1
                            },
                            G = /,?([achlmqrstvxz]),?/gi,
                            U = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
                            j = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
                            Y = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
                            W = (r._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, {}),
                            q = function(e, t) {
                                return I(e) - I(t)
                            },
                            $ = function(e) {
                                return e
                            },
                            K = r._rectPath = function(e, t, r, o, a) {
                                return a ? [
                                    ["M", e + a, t],
                                    ["l", r - 2 * a, 0],
                                    ["a", a, a, 0, 0, 1, a, a],
                                    ["l", 0, o - 2 * a],
                                    ["a", a, a, 0, 0, 1, -a, a],
                                    ["l", 2 * a - r, 0],
                                    ["a", a, a, 0, 0, 1, -a, -a],
                                    ["l", 0, 2 * a - o],
                                    ["a", a, a, 0, 0, 1, a, -a],
                                    ["z"]
                                ] : [
                                    ["M", e, t],
                                    ["l", r, 0],
                                    ["l", 0, o],
                                    ["l", -r, 0],
                                    ["z"]
                                ]
                            },
                            Q = function(e, t, r, o) {
                                return null == o && (o = r), [
                                    ["M", e, t],
                                    ["m", 0, -o],
                                    ["a", r, o, 0, 1, 1, 0, 2 * o],
                                    ["a", r, o, 0, 1, 1, 0, -2 * o],
                                    ["z"]
                                ]
                            },
                            X = r._getPath = {
                                path: function(e) {
                                    return e.attr("path")
                                },
                                circle: function(e) {
                                    var t = e.attrs;
                                    return Q(t.cx, t.cy, t.r)
                                },
                                ellipse: function(e) {
                                    var t = e.attrs;
                                    return Q(t.cx, t.cy, t.rx, t.ry)
                                },
                                rect: function(e) {
                                    var t = e.attrs;
                                    return K(t.x, t.y, t.width, t.height, t.r)
                                },
                                image: function(e) {
                                    var t = e.attrs;
                                    return K(t.x, t.y, t.width, t.height)
                                },
                                text: function(e) {
                                    var t = e._getBBox();
                                    return K(t.x, t.y, t.width, t.height)
                                },
                                set: function(e) {
                                    var t = e._getBBox();
                                    return K(t.x, t.y, t.width, t.height)
                                }
                            },
                            J = r.mapPath = function(e, t) {
                                if (!t) return e;
                                var r, o, a, n, i, d, s;
                                for (a = 0, i = (e = Ce(e)).length; a < i; a++)
                                    for (n = 1, d = (s = e[a]).length; n < d; n += 2) r = t.x(s[n], s[n + 1]), o = t.y(s[n], s[n + 1]), s[n] = r, s[n + 1] = o;
                                return e
                            };
                        if (r._g = l, r.type = l.win.SVGAngle || l.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == r.type) {
                            var Z, ee = l.doc.createElement("div");
                            if (ee.innerHTML = '<v:shape adj="1"/>', (Z = ee.firstChild).style.behavior = "url(#default#VML)", !Z || "object" != typeof Z.adj) return r.type = b;
                            ee = null
                        }

                        function te(e) {
                            if ("function" == typeof e || Object(e) !== e) return e;
                            var t = new e.constructor;
                            for (var r in e) e[s](r) && (t[r] = te(e[r]));
                            return t
                        }
                        r.svg = !(r.vml = "VML" == r.type), r._Paper = h, r.fn = a = h.prototype = r.prototype, r._id = 0, r._oid = 0, r.is = function(e, t) {
                            return "finite" == (t = v.call(t)) ? !M[s](+e) : "array" == t ? e instanceof Array : "null" == t && null === e || t == typeof e && null !== e || "object" == t && e === Object(e) || "array" == t && Array.isArray && Array.isArray(e) || P.call(e).slice(8, -1).toLowerCase() == t
                        }, r.angle = function(e, t, o, a, n, i) {
                            if (null == n) {
                                var d = e - o,
                                    s = t - a;
                                return d || s ? (180 + 180 * k.atan2(-s, -d) / R + 360) % 360 : 0
                            }
                            return r.angle(e, t, n, i) - r.angle(o, a, n, i)
                        }, r.rad = function(e) {
                            return e % 360 * R / 180
                        }, r.deg = function(e) {
                            return 180 * e / R % 360
                        }, r.snapTo = function(e, t, o) {
                            if (o = r.is(o, "finite") ? o : 10, r.is(e, A)) {
                                for (var a = e.length; a--;)
                                    if (E(e[a] - t) <= o) return e[a]
                            } else {
                                var n = t % (e = +e);
                                if (n < o) return t - n;
                                if (n > e - o) return t - n + e
                            }
                            return t
                        };
                        r.createUUID = function(e, t) {
                            return function() {
                                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(e, t).toUpperCase()
                            }
                        }(/[xy]/g, function(e) {
                            var t = 16 * k.random() | 0;
                            return ("x" == e ? t : 3 & t | 8).toString(16)
                        });
                        r.setWindow = function(e) {
                            t("raphael.setWindow", r, l.win, e), l.win = e, l.doc = l.win.document, r._engine.initWin && r._engine.initWin(l.win)
                        };
                        var re = function(e) {
                                if (r.vml) {
                                    var t, o = /^\s+|\s+$/g;
                                    try {
                                        var a = new ActiveXObject("htmlfile");
                                        a.write("<body>"), a.close(), t = a.body
                                    } catch (e) {
                                        t = createPopup().document.body
                                    }
                                    var n = t.createTextRange();
                                    re = se(function(e) {
                                        try {
                                            t.style.color = g(e).replace(o, b);
                                            var r = n.queryCommandValue("ForeColor");
                                            return "#" + ("000000" + (r = (255 & r) << 16 | 65280 & r | (16711680 & r) >>> 16).toString(16)).slice(-6)
                                        } catch (e) {
                                            return "none"
                                        }
                                    })
                                } else {
                                    var i = l.doc.createElement("i");
                                    i.title = "Raphaël Colour Picker", i.style.display = "none", l.doc.body.appendChild(i), re = se(function(e) {
                                        return i.style.color = e, l.doc.defaultView.getComputedStyle(i, b).getPropertyValue("color")
                                    })
                                }
                                return re(e)
                            },
                            oe = function() {
                                return "hsb(" + [this.h, this.s, this.b] + ")"
                            },
                            ae = function() {
                                return "hsl(" + [this.h, this.s, this.l] + ")"
                            },
                            ne = function() {
                                return this.hex
                            },
                            ie = function(e, t, o) {
                                if (null == t && r.is(e, "object") && "r" in e && "g" in e && "b" in e && (o = e.b, t = e.g, e = e.r), null == t && r.is(e, "string")) {
                                    var a = r.getRGB(e);
                                    e = a.r, t = a.g, o = a.b
                                }
                                return (e > 1 || t > 1 || o > 1) && (e /= 255, t /= 255, o /= 255), [e, t, o]
                            },
                            de = function(e, t, o, a) {
                                var n = {
                                    r: e *= 255,
                                    g: t *= 255,
                                    b: o *= 255,
                                    hex: r.rgb(e, t, o),
                                    toString: ne
                                };
                                return r.is(a, "finite") && (n.opacity = a), n
                            };

                        function se(e, t, r) {
                            return function o() {
                                var a = Array.prototype.slice.call(arguments, 0),
                                    n = a.join("␀"),
                                    i = o.cache = o.cache || {},
                                    d = o.count = o.count || [];
                                return i[s](n) ? (function(e, t) {
                                    for (var r = 0, o = e.length; r < o; r++)
                                        if (e[r] === t) return e.push(e.splice(r, 1)[0])
                                }(d, n), r ? r(i[n]) : i[n]) : (d.length >= 1e3 && delete i[d.shift()], d.push(n), i[n] = e[p](t, a), r ? r(i[n]) : i[n])
                            }
                        }
                        r.color = function(e) {
                            var t;
                            return r.is(e, "object") && "h" in e && "s" in e && "b" in e ? (t = r.hsb2rgb(e), e.r = t.r, e.g = t.g, e.b = t.b, e.hex = t.hex) : r.is(e, "object") && "h" in e && "s" in e && "l" in e ? (t = r.hsl2rgb(e), e.r = t.r, e.g = t.g, e.b = t.b, e.hex = t.hex) : (r.is(e, "string") ? e = r.getRGB(e) : r.is(e, "number") && ((e = {
                                r: (16711680 & e) >> 16,
                                g: (65280 & e) >> 8,
                                b: 255 & e
                            }).hex = r.rgb(e.r, e.g, e.b)), r.is(e, "object") && "r" in e && "g" in e && "b" in e ? (t = r.rgb2hsl(e), e.h = t.h, e.s = t.s, e.l = t.l, t = r.rgb2hsb(e), e.v = t.b) : (e = {
                                hex: "none"
                            }).r = e.g = e.b = e.h = e.s = e.v = e.l = -1), e.toString = ne, e
                        }, r.hsb2rgb = function(e, t, r, o) {
                            var a, n, i, d, s;
                            return this.is(e, "object") && "h" in e && "s" in e && "b" in e && (r = e.b, t = e.s, o = (e = e.h).o), d = (s = r * t) * (1 - E((e = (e *= 360) % 360 / 60) % 2 - 1)), a = n = i = r - s, de(a += [s, d, 0, 0, d, s][e = ~~e], n += [d, s, s, d, 0, 0][e], i += [0, 0, d, s, s, d][e], o)
                        }, r.hsl2rgb = function(e, t, r, o) {
                            var a, n, i, d, s;
                            return this.is(e, "object") && "h" in e && "s" in e && "l" in e && (r = e.l, t = e.s, e = e.h), (e > 1 || t > 1 || r > 1) && (e /= 360, t /= 100, r /= 100), e = (e *= 360) % 360 / 60, d = (s = 2 * t * (r < .5 ? r : 1 - r)) * (1 - E(e % 2 - 1)), a = n = i = r - s / 2, de(a += [s, d, 0, 0, d, s][e = ~~e], n += [d, s, s, d, 0, 0][e], i += [0, 0, d, s, s, d][e], o)
                        }, r.rgb2hsb = function(e, t, r) {
                            var o, a;
                            return e = (r = ie(e, t, r))[0], t = r[1], r = r[2], {
                                h: ((0 == (a = (o = _(e, t, r)) - T(e, t, r)) ? null : o == e ? (t - r) / a : o == t ? (r - e) / a + 2 : (e - t) / a + 4) + 360) % 6 * 60 / 360,
                                s: 0 == a ? 0 : a / o,
                                b: o,
                                toString: oe
                            }
                        }, r.rgb2hsl = function(e, t, r) {
                            var o, a, n, i;
                            return e = (r = ie(e, t, r))[0], t = r[1], r = r[2], o = ((a = _(e, t, r)) + (n = T(e, t, r))) / 2, {
                                h: ((0 == (i = a - n) ? null : a == e ? (t - r) / i : a == t ? (r - e) / i + 2 : (e - t) / i + 4) + 360) % 6 * 60 / 360,
                                s: 0 == i ? 0 : o < .5 ? i / (2 * o) : i / (2 - 2 * o),
                                l: o,
                                toString: ae
                            }
                        }, r._path2string = function() {
                            return this.join(",").replace(G, "$1")
                        };
                        r._preload = function(e, t) {
                            var r = l.doc.createElement("img");
                            r.style.cssText = "position:absolute;left:-9999em;top:-9999em", r.onload = function() {
                                t.call(this), this.onload = null, l.doc.body.removeChild(this)
                            }, r.onerror = function() {
                                l.doc.body.removeChild(this)
                            }, l.doc.body.appendChild(r), r.src = e
                        };

                        function le() {
                            return this.hex
                        }

                        function ce(e, t) {
                            for (var r = [], o = 0, a = e.length; a - 2 * !t > o; o += 2) {
                                var n = [{
                                    x: +e[o - 2],
                                    y: +e[o - 1]
                                }, {
                                    x: +e[o],
                                    y: +e[o + 1]
                                }, {
                                    x: +e[o + 2],
                                    y: +e[o + 3]
                                }, {
                                    x: +e[o + 4],
                                    y: +e[o + 5]
                                }];
                                t ? o ? a - 4 == o ? n[3] = {
                                    x: +e[0],
                                    y: +e[1]
                                } : a - 2 == o && (n[2] = {
                                    x: +e[0],
                                    y: +e[1]
                                }, n[3] = {
                                    x: +e[2],
                                    y: +e[3]
                                }) : n[0] = {
                                    x: +e[a - 2],
                                    y: +e[a - 1]
                                } : a - 4 == o ? n[3] = n[2] : o || (n[0] = {
                                    x: +e[o],
                                    y: +e[o + 1]
                                }), r.push(["C", (-n[0].x + 6 * n[1].x + n[2].x) / 6, (-n[0].y + 6 * n[1].y + n[2].y) / 6, (n[1].x + 6 * n[2].x - n[3].x) / 6, (n[1].y + 6 * n[2].y - n[3].y) / 6, n[2].x, n[2].y])
                            }
                            return r
                        }
                        r.getRGB = se(function(e) {
                            if (!e || (e = g(e)).indexOf("-") + 1) return {
                                r: -1,
                                g: -1,
                                b: -1,
                                hex: "none",
                                error: 1,
                                toString: le
                            };
                            if ("none" == e) return {
                                r: -1,
                                g: -1,
                                b: -1,
                                hex: "none",
                                toString: le
                            };
                            !z[s](e.toLowerCase().substring(0, 2)) && "#" != e.charAt() && (e = re(e));
                            var t, o, a, n, i, d, l = e.match(L);
                            return l ? (l[2] && (a = N(l[2].substring(5), 16), o = N(l[2].substring(3, 5), 16), t = N(l[2].substring(1, 3), 16)), l[3] && (a = N((i = l[3].charAt(3)) + i, 16), o = N((i = l[3].charAt(2)) + i, 16), t = N((i = l[3].charAt(1)) + i, 16)), l[4] && (d = l[4][w](V), t = I(d[0]), "%" == d[0].slice(-1) && (t *= 2.55), o = I(d[1]), "%" == d[1].slice(-1) && (o *= 2.55), a = I(d[2]), "%" == d[2].slice(-1) && (a *= 2.55), "rgba" == l[1].toLowerCase().slice(0, 4) && (n = I(d[3])), d[3] && "%" == d[3].slice(-1) && (n /= 100)), l[5] ? (d = l[5][w](V), t = I(d[0]), "%" == d[0].slice(-1) && (t *= 2.55), o = I(d[1]), "%" == d[1].slice(-1) && (o *= 2.55), a = I(d[2]), "%" == d[2].slice(-1) && (a *= 2.55), ("deg" == d[0].slice(-3) || "°" == d[0].slice(-1)) && (t /= 360), "hsba" == l[1].toLowerCase().slice(0, 4) && (n = I(d[3])), d[3] && "%" == d[3].slice(-1) && (n /= 100), r.hsb2rgb(t, o, a, n)) : l[6] ? (d = l[6][w](V), t = I(d[0]), "%" == d[0].slice(-1) && (t *= 2.55), o = I(d[1]), "%" == d[1].slice(-1) && (o *= 2.55), a = I(d[2]), "%" == d[2].slice(-1) && (a *= 2.55), ("deg" == d[0].slice(-3) || "°" == d[0].slice(-1)) && (t /= 360), "hsla" == l[1].toLowerCase().slice(0, 4) && (n = I(d[3])), d[3] && "%" == d[3].slice(-1) && (n /= 100), r.hsl2rgb(t, o, a, n)) : ((l = {
                                r: t,
                                g: o,
                                b: a,
                                toString: le
                            }).hex = "#" + (16777216 | a | o << 8 | t << 16).toString(16).slice(1), r.is(n, "finite") && (l.opacity = n), l)) : {
                                r: -1,
                                g: -1,
                                b: -1,
                                hex: "none",
                                error: 1,
                                toString: le
                            }
                        }, r), r.hsb = se(function(e, t, o) {
                            return r.hsb2rgb(e, t, o).hex
                        }), r.hsl = se(function(e, t, o) {
                            return r.hsl2rgb(e, t, o).hex
                        }), r.rgb = se(function(e, t, r) {
                            return "#" + (16777216 | r | t << 8 | e << 16).toString(16).slice(1)
                        }), r.getColor = function(e) {
                            var t = this.getColor.start = this.getColor.start || {
                                    h: 0,
                                    s: 1,
                                    b: e || .75
                                },
                                r = this.hsb2rgb(t.h, t.s, t.b);
                            return t.h += .075, t.h > 1 && (t.h = 0, t.s -= .2, t.s <= 0 && (this.getColor.start = {
                                h: 0,
                                s: 1,
                                b: t.b
                            })), r.hex
                        }, r.getColor.reset = function() {
                            delete this.start
                        }, r.parsePathString = function(e) {
                            if (!e) return null;
                            var t = he(e);
                            if (t.arr) return we(t.arr);
                            var o = {
                                    a: 7,
                                    c: 6,
                                    h: 1,
                                    l: 2,
                                    m: 2,
                                    r: 4,
                                    q: 4,
                                    s: 4,
                                    t: 2,
                                    v: 1,
                                    z: 0
                                },
                                a = [];
                            return r.is(e, A) && r.is(e[0], A) && (a = we(e)), a.length || g(e).replace(U, function(e, t, r) {
                                var n = [],
                                    i = t.toLowerCase();
                                if (r.replace(Y, function(e, t) {
                                        t && n.push(+t)
                                    }), "m" == i && n.length > 2 && (a.push([t][u](n.splice(0, 2))), i = "l", t = "m" == t ? "l" : "L"), "r" == i) a.push([t][u](n));
                                else
                                    for (; n.length >= o[i] && (a.push([t][u](n.splice(0, o[i]))), o[i]););
                            }), a.toString = r._path2string, t.arr = we(a), a
                        }, r.parseTransformString = se(function(e) {
                            if (!e) return null;
                            var t = [];
                            return r.is(e, A) && r.is(e[0], A) && (t = we(e)), t.length || g(e).replace(j, function(e, r, o) {
                                var a = [];
                                v.call(r);
                                o.replace(Y, function(e, t) {
                                    t && a.push(+t)
                                }), t.push([r][u](a))
                            }), t.toString = r._path2string, t
                        });
                        var he = function(e) {
                            var t = he.ps = he.ps || {};
                            return t[e] ? t[e].sleep = 100 : t[e] = {
                                sleep: 100
                            }, setTimeout(function() {
                                for (var r in t) t[s](r) && r != e && (t[r].sleep--, !t[r].sleep && delete t[r])
                            }), t[e]
                        };

                        function pe(e, t, r, o, a) {
                            return e * (e * (-3 * t + 9 * r - 9 * o + 3 * a) + 6 * t - 12 * r + 6 * o) - 3 * t + 3 * r
                        }

                        function ue(e, t, r, o, a, n, i, d, s) {
                            null == s && (s = 1);
                            for (var l = (s = s > 1 ? 1 : s < 0 ? 0 : s) / 2, c = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], h = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], p = 0, u = 0; u < 12; u++) {
                                var m = l * c[u] + l,
                                    b = pe(m, e, r, a, i),
                                    f = pe(m, t, o, n, d),
                                    g = b * b + f * f;
                                p += h[u] * k.sqrt(g)
                            }
                            return l * p
                        }

                        function me(e, t, r, o, a, n, i, d) {
                            if (!(_(e, r) < T(a, i) || T(e, r) > _(a, i) || _(t, o) < T(n, d) || T(t, o) > _(n, d))) {
                                var s = (e - r) * (n - d) - (t - o) * (a - i);
                                if (s) {
                                    var l = ((e * o - t * r) * (a - i) - (e - r) * (a * d - n * i)) / s,
                                        c = ((e * o - t * r) * (n - d) - (t - o) * (a * d - n * i)) / s,
                                        h = +l.toFixed(2),
                                        p = +c.toFixed(2);
                                    if (!(h < +T(e, r).toFixed(2) || h > +_(e, r).toFixed(2) || h < +T(a, i).toFixed(2) || h > +_(a, i).toFixed(2) || p < +T(t, o).toFixed(2) || p > +_(t, o).toFixed(2) || p < +T(n, d).toFixed(2) || p > +_(n, d).toFixed(2))) return {
                                        x: l,
                                        y: c
                                    }
                                }
                            }
                        }

                        function be(e, t, o) {
                            var a = r.bezierBBox(e),
                                n = r.bezierBBox(t);
                            if (!r.isBBoxIntersect(a, n)) return o ? 0 : [];
                            for (var i = ue.apply(0, e), d = ue.apply(0, t), s = _(~~(i / 5), 1), l = _(~~(d / 5), 1), c = [], h = [], p = {}, u = o ? 0 : [], m = 0; m < s + 1; m++) {
                                var b = r.findDotsAtSegment.apply(r, e.concat(m / s));
                                c.push({
                                    x: b.x,
                                    y: b.y,
                                    t: m / s
                                })
                            }
                            for (m = 0; m < l + 1; m++) b = r.findDotsAtSegment.apply(r, t.concat(m / l)), h.push({
                                x: b.x,
                                y: b.y,
                                t: m / l
                            });
                            for (m = 0; m < s; m++)
                                for (var f = 0; f < l; f++) {
                                    var g = c[m],
                                        w = c[m + 1],
                                        x = h[f],
                                        y = h[f + 1],
                                        v = E(w.x - g.x) < .001 ? "y" : "x",
                                        k = E(y.x - x.x) < .001 ? "y" : "x",
                                        C = me(g.x, g.y, w.x, w.y, x.x, x.y, y.x, y.y);
                                    if (C) {
                                        if (p[C.x.toFixed(4)] == C.y.toFixed(4)) continue;
                                        p[C.x.toFixed(4)] = C.y.toFixed(4);
                                        var R = g.t + E((C[v] - g[v]) / (w[v] - g[v])) * (w.t - g.t),
                                            S = x.t + E((C[k] - x[k]) / (y[k] - x[k])) * (y.t - x.t);
                                        R >= 0 && R <= 1.001 && S >= 0 && S <= 1.001 && (o ? u++ : u.push({
                                            x: C.x,
                                            y: C.y,
                                            t1: T(R, 1),
                                            t2: T(S, 1)
                                        }))
                                    }
                                }
                            return u
                        }

                        function fe(e, t, o) {
                            e = r._path2curve(e), t = r._path2curve(t);
                            for (var a, n, i, d, s, l, c, h, p, u, m = o ? 0 : [], b = 0, f = e.length; b < f; b++) {
                                var g = e[b];
                                if ("M" == g[0]) a = s = g[1], n = l = g[2];
                                else {
                                    "C" == g[0] ? (a = (p = [a, n].concat(g.slice(1)))[6], n = p[7]) : (p = [a, n, a, n, s, l, s, l], a = s, n = l);
                                    for (var w = 0, x = t.length; w < x; w++) {
                                        var y = t[w];
                                        if ("M" == y[0]) i = c = y[1], d = h = y[2];
                                        else {
                                            "C" == y[0] ? (i = (u = [i, d].concat(y.slice(1)))[6], d = u[7]) : (u = [i, d, i, d, c, h, c, h], i = c, d = h);
                                            var v = be(p, u, o);
                                            if (o) m += v;
                                            else {
                                                for (var k = 0, _ = v.length; k < _; k++) v[k].segment1 = b, v[k].segment2 = w, v[k].bez1 = p, v[k].bez2 = u;
                                                m = m.concat(v)
                                            }
                                        }
                                    }
                                }
                            }
                            return m
                        }
                        r.findDotsAtSegment = function(e, t, r, o, a, n, i, d, s) {
                            var l = 1 - s,
                                c = C(l, 3),
                                h = C(l, 2),
                                p = s * s,
                                u = p * s,
                                m = c * e + 3 * h * s * r + 3 * l * s * s * a + u * i,
                                b = c * t + 3 * h * s * o + 3 * l * s * s * n + u * d,
                                f = e + 2 * s * (r - e) + p * (a - 2 * r + e),
                                g = t + 2 * s * (o - t) + p * (n - 2 * o + t),
                                w = r + 2 * s * (a - r) + p * (i - 2 * a + r),
                                x = o + 2 * s * (n - o) + p * (d - 2 * n + o),
                                y = l * e + s * r,
                                v = l * t + s * o,
                                _ = l * a + s * i,
                                T = l * n + s * d,
                                E = 90 - 180 * k.atan2(f - w, g - x) / R;
                            return (f > w || g < x) && (E += 180), {
                                x: m,
                                y: b,
                                m: {
                                    x: f,
                                    y: g
                                },
                                n: {
                                    x: w,
                                    y: x
                                },
                                start: {
                                    x: y,
                                    y: v
                                },
                                end: {
                                    x: _,
                                    y: T
                                },
                                alpha: E
                            }
                        }, r.bezierBBox = function(e, t, o, a, n, i, d, s) {
                            r.is(e, "array") || (e = [e, t, o, a, n, i, d, s]);
                            var l = Ee.apply(null, e);
                            return {
                                x: l.min.x,
                                y: l.min.y,
                                x2: l.max.x,
                                y2: l.max.y,
                                width: l.max.x - l.min.x,
                                height: l.max.y - l.min.y
                            }
                        }, r.isPointInsideBBox = function(e, t, r) {
                            return t >= e.x && t <= e.x2 && r >= e.y && r <= e.y2
                        }, r.isBBoxIntersect = function(e, t) {
                            var o = r.isPointInsideBBox;
                            return o(t, e.x, e.y) || o(t, e.x2, e.y) || o(t, e.x, e.y2) || o(t, e.x2, e.y2) || o(e, t.x, t.y) || o(e, t.x2, t.y) || o(e, t.x, t.y2) || o(e, t.x2, t.y2) || (e.x < t.x2 && e.x > t.x || t.x < e.x2 && t.x > e.x) && (e.y < t.y2 && e.y > t.y || t.y < e.y2 && t.y > e.y)
                        }, r.pathIntersection = function(e, t) {
                            return fe(e, t)
                        }, r.pathIntersectionNumber = function(e, t) {
                            return fe(e, t, 1)
                        }, r.isPointInsidePath = function(e, t, o) {
                            var a = r.pathBBox(e);
                            return r.isPointInsideBBox(a, t, o) && fe(e, [
                                ["M", t, o],
                                ["H", a.x2 + 10]
                            ], 1) % 2 == 1
                        }, r._removedFactory = function(e) {
                            return function() {
                                t("raphael.log", null, "Raphaël: you are calling to method “" + e + "” of removed object", e)
                            }
                        };
                        var ge = r.pathBBox = function(e) {
                                var t = he(e);
                                if (t.bbox) return te(t.bbox);
                                if (!e) return {
                                    x: 0,
                                    y: 0,
                                    width: 0,
                                    height: 0,
                                    x2: 0,
                                    y2: 0
                                };
                                for (var r, o = 0, a = 0, n = [], i = [], d = 0, s = (e = Ce(e)).length; d < s; d++)
                                    if ("M" == (r = e[d])[0]) o = r[1], a = r[2], n.push(o), i.push(a);
                                    else {
                                        var l = Ee(o, a, r[1], r[2], r[3], r[4], r[5], r[6]);
                                        n = n[u](l.min.x, l.max.x), i = i[u](l.min.y, l.max.y), o = r[5], a = r[6]
                                    }
                                var c = T[p](0, n),
                                    h = T[p](0, i),
                                    m = _[p](0, n),
                                    b = _[p](0, i),
                                    f = m - c,
                                    g = b - h,
                                    w = {
                                        x: c,
                                        y: h,
                                        x2: m,
                                        y2: b,
                                        width: f,
                                        height: g,
                                        cx: c + f / 2,
                                        cy: h + g / 2
                                    };
                                return t.bbox = te(w), w
                            },
                            we = function(e) {
                                var t = te(e);
                                return t.toString = r._path2string, t
                            },
                            xe = r._pathToRelative = function(e) {
                                var t = he(e);
                                if (t.rel) return we(t.rel);
                                r.is(e, A) && r.is(e && e[0], A) || (e = r.parsePathString(e));
                                var o = [],
                                    a = 0,
                                    n = 0,
                                    i = 0,
                                    d = 0,
                                    s = 0;
                                "M" == e[0][0] && (i = a = e[0][1], d = n = e[0][2], s++, o.push(["M", a, n]));
                                for (var l = s, c = e.length; l < c; l++) {
                                    var h = o[l] = [],
                                        p = e[l];
                                    if (p[0] != v.call(p[0])) switch (h[0] = v.call(p[0]), h[0]) {
                                        case "a":
                                            h[1] = p[1], h[2] = p[2], h[3] = p[3], h[4] = p[4], h[5] = p[5], h[6] = +(p[6] - a).toFixed(3), h[7] = +(p[7] - n).toFixed(3);
                                            break;
                                        case "v":
                                            h[1] = +(p[1] - n).toFixed(3);
                                            break;
                                        case "m":
                                            i = p[1], d = p[2];
                                        default:
                                            for (var u = 1, m = p.length; u < m; u++) h[u] = +(p[u] - (u % 2 ? a : n)).toFixed(3)
                                    } else {
                                        h = o[l] = [], "m" == p[0] && (i = p[1] + a, d = p[2] + n);
                                        for (var b = 0, f = p.length; b < f; b++) o[l][b] = p[b]
                                    }
                                    var g = o[l].length;
                                    switch (o[l][0]) {
                                        case "z":
                                            a = i, n = d;
                                            break;
                                        case "h":
                                            a += +o[l][g - 1];
                                            break;
                                        case "v":
                                            n += +o[l][g - 1];
                                            break;
                                        default:
                                            a += +o[l][g - 2], n += +o[l][g - 1]
                                    }
                                }
                                return o.toString = r._path2string, t.rel = we(o), o
                            },
                            ye = r._pathToAbsolute = function(e) {
                                var t = he(e);
                                if (t.abs) return we(t.abs);
                                if (r.is(e, A) && r.is(e && e[0], A) || (e = r.parsePathString(e)), !e || !e.length) return [
                                    ["M", 0, 0]
                                ];
                                var o = [],
                                    a = 0,
                                    n = 0,
                                    i = 0,
                                    d = 0,
                                    s = 0;
                                "M" == e[0][0] && (i = a = +e[0][1], d = n = +e[0][2], s++, o[0] = ["M", a, n]);
                                for (var l, c, h = 3 == e.length && "M" == e[0][0] && "R" == e[1][0].toUpperCase() && "Z" == e[2][0].toUpperCase(), p = s, m = e.length; p < m; p++) {
                                    if (o.push(l = []), (c = e[p])[0] != D.call(c[0])) switch (l[0] = D.call(c[0]), l[0]) {
                                            case "A":
                                                l[1] = c[1], l[2] = c[2], l[3] = c[3], l[4] = c[4], l[5] = c[5], l[6] = +(c[6] + a), l[7] = +(c[7] + n);
                                                break;
                                            case "V":
                                                l[1] = +c[1] + n;
                                                break;
                                            case "H":
                                                l[1] = +c[1] + a;
                                                break;
                                            case "R":
                                                for (var b = [a, n][u](c.slice(1)), f = 2, g = b.length; f < g; f++) b[f] = +b[f] + a, b[++f] = +b[f] + n;
                                                o.pop(), o = o[u](ce(b, h));
                                                break;
                                            case "M":
                                                i = +c[1] + a, d = +c[2] + n;
                                            default:
                                                for (f = 1, g = c.length; f < g; f++) l[f] = +c[f] + (f % 2 ? a : n)
                                        } else if ("R" == c[0]) b = [a, n][u](c.slice(1)), o.pop(), o = o[u](ce(b, h)), l = ["R"][u](c.slice(-2));
                                        else
                                            for (var w = 0, x = c.length; w < x; w++) l[w] = c[w];
                                    switch (l[0]) {
                                        case "Z":
                                            a = i, n = d;
                                            break;
                                        case "H":
                                            a = l[1];
                                            break;
                                        case "V":
                                            n = l[1];
                                            break;
                                        case "M":
                                            i = l[l.length - 2], d = l[l.length - 1];
                                        default:
                                            a = l[l.length - 2], n = l[l.length - 1]
                                    }
                                }
                                return o.toString = r._path2string, t.abs = we(o), o
                            },
                            ve = function(e, t, r, o) {
                                return [e, t, r, o, r, o]
                            },
                            ke = function(e, t, r, o, a, n) {
                                return [1 / 3 * e + 2 / 3 * r, 1 / 3 * t + 2 / 3 * o, 1 / 3 * a + 2 / 3 * r, 1 / 3 * n + 2 / 3 * o, a, n]
                            },
                            _e = function(e, t, r, o, a, n, i, d, s, l) {
                                var c, h = 120 * R / 180,
                                    p = R / 180 * (+a || 0),
                                    m = [],
                                    b = se(function(e, t, r) {
                                        return {
                                            x: e * k.cos(r) - t * k.sin(r),
                                            y: e * k.sin(r) + t * k.cos(r)
                                        }
                                    });
                                if (l) S = l[0], A = l[1], T = l[2], C = l[3];
                                else {
                                    e = (c = b(e, t, -p)).x, t = c.y, d = (c = b(d, s, -p)).x, s = c.y;
                                    k.cos(R / 180 * a), k.sin(R / 180 * a);
                                    var f = (e - d) / 2,
                                        g = (t - s) / 2,
                                        x = f * f / (r * r) + g * g / (o * o);
                                    x > 1 && (r *= x = k.sqrt(x), o *= x);
                                    var y = r * r,
                                        v = o * o,
                                        _ = (n == i ? -1 : 1) * k.sqrt(E((y * v - y * g * g - v * f * f) / (y * g * g + v * f * f))),
                                        T = _ * r * g / o + (e + d) / 2,
                                        C = _ * -o * f / r + (t + s) / 2,
                                        S = k.asin(((t - C) / o).toFixed(9)),
                                        A = k.asin(((s - C) / o).toFixed(9));
                                    S = e < T ? R - S : S, A = d < T ? R - A : A, S < 0 && (S = 2 * R + S), A < 0 && (A = 2 * R + A), i && S > A && (S -= 2 * R), !i && A > S && (A -= 2 * R)
                                }
                                var P = A - S;
                                if (E(P) > h) {
                                    var L = A,
                                        M = d,
                                        B = s;
                                    A = S + h * (i && A > S ? 1 : -1), d = T + r * k.cos(A), s = C + o * k.sin(A), m = _e(d, s, r, o, a, 0, i, M, B, [A, L, T, C])
                                }
                                P = A - S;
                                var O = k.cos(S),
                                    I = k.sin(S),
                                    N = k.cos(A),
                                    D = k.sin(A),
                                    F = k.tan(P / 4),
                                    H = 4 / 3 * r * F,
                                    V = 4 / 3 * o * F,
                                    z = [e, t],
                                    G = [e + H * I, t - V * O],
                                    U = [d + H * D, s - V * N],
                                    j = [d, s];
                                if (G[0] = 2 * z[0] - G[0], G[1] = 2 * z[1] - G[1], l) return [G, U, j][u](m);
                                for (var Y = [], W = 0, q = (m = [G, U, j][u](m).join()[w](",")).length; W < q; W++) Y[W] = W % 2 ? b(m[W - 1], m[W], p).y : b(m[W], m[W + 1], p).x;
                                return Y
                            },
                            Te = function(e, t, r, o, a, n, i, d, s) {
                                var l = 1 - s;
                                return {
                                    x: C(l, 3) * e + 3 * C(l, 2) * s * r + 3 * l * s * s * a + C(s, 3) * i,
                                    y: C(l, 3) * t + 3 * C(l, 2) * s * o + 3 * l * s * s * n + C(s, 3) * d
                                }
                            },
                            Ee = se(function(e, t, r, o, a, n, i, d) {
                                var s, l = a - 2 * r + e - (i - 2 * a + r),
                                    c = 2 * (r - e) - 2 * (a - r),
                                    h = e - r,
                                    u = (-c + k.sqrt(c * c - 4 * l * h)) / 2 / l,
                                    m = (-c - k.sqrt(c * c - 4 * l * h)) / 2 / l,
                                    b = [t, d],
                                    f = [e, i];
                                return E(u) > "1e12" && (u = .5), E(m) > "1e12" && (m = .5), u > 0 && u < 1 && (s = Te(e, t, r, o, a, n, i, d, u), f.push(s.x), b.push(s.y)), m > 0 && m < 1 && (s = Te(e, t, r, o, a, n, i, d, m), f.push(s.x), b.push(s.y)), l = n - 2 * o + t - (d - 2 * n + o), h = t - o, u = (-(c = 2 * (o - t) - 2 * (n - o)) + k.sqrt(c * c - 4 * l * h)) / 2 / l, m = (-c - k.sqrt(c * c - 4 * l * h)) / 2 / l, E(u) > "1e12" && (u = .5), E(m) > "1e12" && (m = .5), u > 0 && u < 1 && (s = Te(e, t, r, o, a, n, i, d, u), f.push(s.x), b.push(s.y)), m > 0 && m < 1 && (s = Te(e, t, r, o, a, n, i, d, m), f.push(s.x), b.push(s.y)), {
                                    min: {
                                        x: T[p](0, f),
                                        y: T[p](0, b)
                                    },
                                    max: {
                                        x: _[p](0, f),
                                        y: _[p](0, b)
                                    }
                                }
                            }),
                            Ce = r._path2curve = se(function(e, t) {
                                var r = !t && he(e);
                                if (!t && r.curve) return we(r.curve);
                                for (var o = ye(e), a = t && ye(t), n = {
                                        x: 0,
                                        y: 0,
                                        bx: 0,
                                        by: 0,
                                        X: 0,
                                        Y: 0,
                                        qx: null,
                                        qy: null
                                    }, i = {
                                        x: 0,
                                        y: 0,
                                        bx: 0,
                                        by: 0,
                                        X: 0,
                                        Y: 0,
                                        qx: null,
                                        qy: null
                                    }, d = function(e, t, r) {
                                        var o, a;
                                        if (!e) return ["C", t.x, t.y, t.x, t.y, t.x, t.y];
                                        switch (!(e[0] in {
                                            T: 1,
                                            Q: 1
                                        }) && (t.qx = t.qy = null), e[0]) {
                                            case "M":
                                                t.X = e[1], t.Y = e[2];
                                                break;
                                            case "A":
                                                e = ["C"][u](_e[p](0, [t.x, t.y][u](e.slice(1))));
                                                break;
                                            case "S":
                                                "C" == r || "S" == r ? (o = 2 * t.x - t.bx, a = 2 * t.y - t.by) : (o = t.x, a = t.y), e = ["C", o, a][u](e.slice(1));
                                                break;
                                            case "T":
                                                "Q" == r || "T" == r ? (t.qx = 2 * t.x - t.qx, t.qy = 2 * t.y - t.qy) : (t.qx = t.x, t.qy = t.y), e = ["C"][u](ke(t.x, t.y, t.qx, t.qy, e[1], e[2]));
                                                break;
                                            case "Q":
                                                t.qx = e[1], t.qy = e[2], e = ["C"][u](ke(t.x, t.y, e[1], e[2], e[3], e[4]));
                                                break;
                                            case "L":
                                                e = ["C"][u](ve(t.x, t.y, e[1], e[2]));
                                                break;
                                            case "H":
                                                e = ["C"][u](ve(t.x, t.y, e[1], t.y));
                                                break;
                                            case "V":
                                                e = ["C"][u](ve(t.x, t.y, t.x, e[1]));
                                                break;
                                            case "Z":
                                                e = ["C"][u](ve(t.x, t.y, t.X, t.Y))
                                        }
                                        return e
                                    }, s = function(e, t) {
                                        if (e[t].length > 7) {
                                            e[t].shift();
                                            for (var r = e[t]; r.length;) e.splice(t++, 0, ["C"][u](r.splice(0, 6)));
                                            e.splice(t, 1), h = _(o.length, a && a.length || 0)
                                        }
                                    }, l = function(e, t, r, n, i) {
                                        e && t && "M" == e[i][0] && "M" != t[i][0] && (t.splice(i, 0, ["M", n.x, n.y]), r.bx = 0, r.by = 0, r.x = e[i][1], r.y = e[i][2], h = _(o.length, a && a.length || 0))
                                    }, c = 0, h = _(o.length, a && a.length || 0); c < h; c++) {
                                    o[c] = d(o[c], n), s(o, c), a && (a[c] = d(a[c], i)), a && s(a, c), l(o, a, n, i, c), l(a, o, i, n, c);
                                    var m = o[c],
                                        b = a && a[c],
                                        f = m.length,
                                        g = a && b.length;
                                    n.x = m[f - 2], n.y = m[f - 1], n.bx = I(m[f - 4]) || n.x, n.by = I(m[f - 3]) || n.y, i.bx = a && (I(b[g - 4]) || i.x), i.by = a && (I(b[g - 3]) || i.y), i.x = a && b[g - 2], i.y = a && b[g - 1]
                                }
                                return a || (r.curve = we(o)), a ? [o, a] : o
                            }, null, we),
                            Re = (r._parseDots = se(function(e) {
                                for (var t = [], o = 0, a = e.length; o < a; o++) {
                                    var n = {},
                                        i = e[o].match(/^([^:]*):?([\d\.]*)/);
                                    if (n.color = r.getRGB(i[1]), n.color.error) return null;
                                    n.color = n.color.hex, i[2] && (n.offset = i[2] + "%"), t.push(n)
                                }
                                for (o = 1, a = t.length - 1; o < a; o++)
                                    if (!t[o].offset) {
                                        for (var d = I(t[o - 1].offset || 0), s = 0, l = o + 1; l < a; l++)
                                            if (t[l].offset) {
                                                s = t[l].offset;
                                                break
                                            }
                                        s || (s = 100, l = a);
                                        for (var c = ((s = I(s)) - d) / (l - o + 1); o < l; o++) d += c, t[o].offset = d + "%"
                                    }
                                return t
                            }), r._tear = function(e, t) {
                                e == t.top && (t.top = e.prev), e == t.bottom && (t.bottom = e.next), e.next && (e.next.prev = e.prev), e.prev && (e.prev.next = e.next)
                            }),
                            Se = (r._tofront = function(e, t) {
                                t.top !== e && (Re(e, t), e.next = null, e.prev = t.top, t.top.next = e, t.top = e)
                            }, r._toback = function(e, t) {
                                t.bottom !== e && (Re(e, t), e.next = t.bottom, e.prev = null, t.bottom.prev = e, t.bottom = e)
                            }, r._insertafter = function(e, t, r) {
                                Re(e, r), t == r.top && (r.top = e), t.next && (t.next.prev = e), e.next = t.next, e.prev = t, t.next = e
                            }, r._insertbefore = function(e, t, r) {
                                Re(e, r), t == r.bottom && (r.bottom = e), t.prev && (t.prev.next = e), e.prev = t.prev, t.prev = e, e.next = t
                            }, r.toMatrix = function(e, t) {
                                var r = ge(e),
                                    o = {
                                        _: {
                                            transform: b
                                        },
                                        getBBox: function() {
                                            return r
                                        }
                                    };
                                return Ae(o, t), o.matrix
                            }),
                            Ae = (r.transformPath = function(e, t) {
                                return J(e, Se(e, t))
                            }, r._extractTransform = function(e, t) {
                                if (null == t) return e._.transform;
                                t = g(t).replace(/\.{3}|\u2026/g, e._.transform || b);
                                var o, a, n = r.parseTransformString(t),
                                    i = 0,
                                    d = 1,
                                    s = 1,
                                    l = e._,
                                    c = new Me;
                                if (l.transform = n || [], n)
                                    for (var h = 0, p = n.length; h < p; h++) {
                                        var u, m, f, w, x, y = n[h],
                                            v = y.length,
                                            k = g(y[0]).toLowerCase(),
                                            _ = y[0] != k,
                                            T = _ ? c.invert() : 0;
                                        "t" == k && 3 == v ? _ ? (u = T.x(0, 0), m = T.y(0, 0), f = T.x(y[1], y[2]), w = T.y(y[1], y[2]), c.translate(f - u, w - m)) : c.translate(y[1], y[2]) : "r" == k ? 2 == v ? (x = x || e.getBBox(1), c.rotate(y[1], x.x + x.width / 2, x.y + x.height / 2), i += y[1]) : 4 == v && (_ ? (f = T.x(y[2], y[3]), w = T.y(y[2], y[3]), c.rotate(y[1], f, w)) : c.rotate(y[1], y[2], y[3]), i += y[1]) : "s" == k ? 2 == v || 3 == v ? (x = x || e.getBBox(1), c.scale(y[1], y[v - 1], x.x + x.width / 2, x.y + x.height / 2), d *= y[1], s *= y[v - 1]) : 5 == v && (_ ? (f = T.x(y[3], y[4]), w = T.y(y[3], y[4]), c.scale(y[1], y[2], f, w)) : c.scale(y[1], y[2], y[3], y[4]), d *= y[1], s *= y[2]) : "m" == k && 7 == v && c.add(y[1], y[2], y[3], y[4], y[5], y[6]), l.dirtyT = 1, e.matrix = c
                                    }
                                e.matrix = c, l.sx = d, l.sy = s, l.deg = i, l.dx = o = c.e, l.dy = a = c.f, 1 == d && 1 == s && !i && l.bbox ? (l.bbox.x += +o, l.bbox.y += +a) : l.dirtyT = 1
                            }),
                            Pe = function(e) {
                                var t = e[0];
                                switch (t.toLowerCase()) {
                                    case "t":
                                        return [t, 0, 0];
                                    case "m":
                                        return [t, 1, 0, 0, 1, 0, 0];
                                    case "r":
                                        return 4 == e.length ? [t, 0, e[2], e[3]] : [t, 0];
                                    case "s":
                                        return 5 == e.length ? [t, 1, 1, e[3], e[4]] : 3 == e.length ? [t, 1, 1] : [t, 1]
                                }
                            },
                            Le = r._equaliseTransform = function(e, t) {
                                t = g(t).replace(/\.{3}|\u2026/g, e), e = r.parseTransformString(e) || [], t = r.parseTransformString(t) || [];
                                for (var o, a, n, i, d = _(e.length, t.length), s = [], l = [], c = 0; c < d; c++) {
                                    if (n = e[c] || Pe(t[c]), i = t[c] || Pe(n), n[0] != i[0] || "r" == n[0].toLowerCase() && (n[2] != i[2] || n[3] != i[3]) || "s" == n[0].toLowerCase() && (n[3] != i[3] || n[4] != i[4])) return;
                                    for (s[c] = [], l[c] = [], o = 0, a = _(n.length, i.length); o < a; o++) o in n && (s[c][o] = n[o]), o in i && (l[c][o] = i[o])
                                }
                                return {
                                    from: s,
                                    to: l
                                }
                            };

                        function Me(e, t, r, o, a, n) {
                            null != e ? (this.a = +e, this.b = +t, this.c = +r, this.d = +o, this.e = +a, this.f = +n) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)
                        }
                        r._getContainer = function(e, t, o, a) {
                                var n;
                                if (null != (n = null != a || r.is(e, "object") ? e : l.doc.getElementById(e))) return n.tagName ? null == t ? {
                                    container: n,
                                    width: n.style.pixelWidth || n.offsetWidth,
                                    height: n.style.pixelHeight || n.offsetHeight
                                } : {
                                    container: n,
                                    width: t,
                                    height: o
                                } : {
                                    container: 1,
                                    x: e,
                                    y: t,
                                    width: o,
                                    height: a
                                }
                            }, r.pathToRelative = xe, r._engine = {}, r.path2curve = Ce, r.matrix = function(e, t, r, o, a, n) {
                                return new Me(e, t, r, o, a, n)
                            },
                            function(e) {
                                function t(e) {
                                    return e[0] * e[0] + e[1] * e[1]
                                }

                                function o(e) {
                                    var r = k.sqrt(t(e));
                                    e[0] && (e[0] /= r), e[1] && (e[1] /= r)
                                }
                                e.add = function(e, t, r, o, a, n) {
                                    var i, d, s, l, c = [
                                            [],
                                            [],
                                            []
                                        ],
                                        h = [
                                            [this.a, this.c, this.e],
                                            [this.b, this.d, this.f],
                                            [0, 0, 1]
                                        ],
                                        p = [
                                            [e, r, a],
                                            [t, o, n],
                                            [0, 0, 1]
                                        ];
                                    for (e && e instanceof Me && (p = [
                                            [e.a, e.c, e.e],
                                            [e.b, e.d, e.f],
                                            [0, 0, 1]
                                        ]), i = 0; i < 3; i++)
                                        for (d = 0; d < 3; d++) {
                                            for (l = 0, s = 0; s < 3; s++) l += h[i][s] * p[s][d];
                                            c[i][d] = l
                                        }
                                    this.a = c[0][0], this.b = c[1][0], this.c = c[0][1], this.d = c[1][1], this.e = c[0][2], this.f = c[1][2]
                                }, e.invert = function() {
                                    var e = this,
                                        t = e.a * e.d - e.b * e.c;
                                    return new Me(e.d / t, -e.b / t, -e.c / t, e.a / t, (e.c * e.f - e.d * e.e) / t, (e.b * e.e - e.a * e.f) / t)
                                }, e.clone = function() {
                                    return new Me(this.a, this.b, this.c, this.d, this.e, this.f)
                                }, e.translate = function(e, t) {
                                    this.add(1, 0, 0, 1, e, t)
                                }, e.scale = function(e, t, r, o) {
                                    null == t && (t = e), (r || o) && this.add(1, 0, 0, 1, r, o), this.add(e, 0, 0, t, 0, 0), (r || o) && this.add(1, 0, 0, 1, -r, -o)
                                }, e.rotate = function(e, t, o) {
                                    e = r.rad(e), t = t || 0, o = o || 0;
                                    var a = +k.cos(e).toFixed(9),
                                        n = +k.sin(e).toFixed(9);
                                    this.add(a, n, -n, a, t, o), this.add(1, 0, 0, 1, -t, -o)
                                }, e.x = function(e, t) {
                                    return e * this.a + t * this.c + this.e
                                }, e.y = function(e, t) {
                                    return e * this.b + t * this.d + this.f
                                }, e.get = function(e) {
                                    return +this[g.fromCharCode(97 + e)].toFixed(4)
                                }, e.toString = function() {
                                    return r.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
                                }, e.toFilter = function() {
                                    return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
                                }, e.offset = function() {
                                    return [this.e.toFixed(4), this.f.toFixed(4)]
                                }, e.split = function() {
                                    var e = {};
                                    e.dx = this.e, e.dy = this.f;
                                    var a = [
                                        [this.a, this.c],
                                        [this.b, this.d]
                                    ];
                                    e.scalex = k.sqrt(t(a[0])), o(a[0]), e.shear = a[0][0] * a[1][0] + a[0][1] * a[1][1], a[1] = [a[1][0] - a[0][0] * e.shear, a[1][1] - a[0][1] * e.shear], e.scaley = k.sqrt(t(a[1])), o(a[1]), e.shear /= e.scaley;
                                    var n = -a[0][1],
                                        i = a[1][1];
                                    return i < 0 ? (e.rotate = r.deg(k.acos(i)), n < 0 && (e.rotate = 360 - e.rotate)) : e.rotate = r.deg(k.asin(n)), e.isSimple = !(+e.shear.toFixed(9) || e.scalex.toFixed(9) != e.scaley.toFixed(9) && e.rotate), e.isSuperSimple = !+e.shear.toFixed(9) && e.scalex.toFixed(9) == e.scaley.toFixed(9) && !e.rotate, e.noRotation = !+e.shear.toFixed(9) && !e.rotate, e
                                }, e.toTransformString = function(e) {
                                    var t = e || this[w]();
                                    return t.isSimple ? (t.scalex = +t.scalex.toFixed(4), t.scaley = +t.scaley.toFixed(4), t.rotate = +t.rotate.toFixed(4), (t.dx || t.dy ? "t" + [t.dx, t.dy] : b) + (1 != t.scalex || 1 != t.scaley ? "s" + [t.scalex, t.scaley, 0, 0] : b) + (t.rotate ? "r" + [t.rotate, 0, 0] : b)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
                                }
                            }(Me.prototype);
                        var Be = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
                        "Apple Computer, Inc." == navigator.vendor && (Be && Be[1] < 4 || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && Be && Be[1] < 8 ? a.safari = function() {
                            var e = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
                                stroke: "none"
                            });
                            setTimeout(function() {
                                e.remove()
                            })
                        } : a.safari = function() {};
                        for (var Oe = function() {
                                this.returnValue = !1
                            }, Ie = function() {
                                return this.originalEvent.preventDefault()
                            }, Ne = function() {
                                this.cancelBubble = !0
                            }, De = function() {
                                return this.originalEvent.stopPropagation()
                            }, Fe = function(e) {
                                var t = l.doc.documentElement.scrollTop || l.doc.body.scrollTop,
                                    r = l.doc.documentElement.scrollLeft || l.doc.body.scrollLeft;
                                return {
                                    x: e.clientX + r,
                                    y: e.clientY + t
                                }
                            }, He = l.doc.addEventListener ? function(e, t, r, o) {
                                var a = function(e) {
                                    var t = Fe(e);
                                    return r.call(o, e, t.x, t.y)
                                };
                                return e.addEventListener(t, a, !1), m && y[t] && e.addEventListener(y[t], function(t) {
                                        for (var a = Fe(t), n = t, i = 0, d = t.targetTouches && t.targetTouches.length; i < d; i++)
                                            if (t.targetTouches[i].target == e) {
                                                (t = t.targetTouches[i]).originalEvent = n, t.preventDefault = Ie, t.stopPropagation = De;
                                                break
                                            }
                                        return r.call(o, t, a.x, a.y)
                                    }, !1),
                                    function() {
                                        return e.removeEventListener(t, a, !1), m && y[t] && e.removeEventListener(y[t], a, !1), !0
                                    }
                            } : l.doc.attachEvent ? function(e, t, r, o) {
                                var a = function(e) {
                                    e = e || l.win.event;
                                    var t = l.doc.documentElement.scrollTop || l.doc.body.scrollTop,
                                        a = l.doc.documentElement.scrollLeft || l.doc.body.scrollLeft,
                                        n = e.clientX + a,
                                        i = e.clientY + t;
                                    return e.preventDefault = e.preventDefault || Oe, e.stopPropagation = e.stopPropagation || Ne, r.call(o, e, n, i)
                                };
                                return e.attachEvent("on" + t, a),
                                    function() {
                                        return e.detachEvent("on" + t, a), !0
                                    }
                            } : void 0, Ve = [], ze = function(e) {
                                for (var r, o = e.clientX, a = e.clientY, n = l.doc.documentElement.scrollTop || l.doc.body.scrollTop, i = l.doc.documentElement.scrollLeft || l.doc.body.scrollLeft, d = Ve.length; d--;) {
                                    if (r = Ve[d], m && e.touches) {
                                        for (var s, c = e.touches.length; c--;)
                                            if ((s = e.touches[c]).identifier == r.el._drag.id) {
                                                o = s.clientX, a = s.clientY, (e.originalEvent ? e.originalEvent : e).preventDefault();
                                                break
                                            }
                                    } else e.preventDefault();
                                    var h, p = r.el.node,
                                        u = p.nextSibling,
                                        b = p.parentNode,
                                        f = p.style.display;
                                    l.win.opera && b.removeChild(p), p.style.display = "none", h = r.el.paper.getElementByPoint(o, a), p.style.display = f, l.win.opera && (u ? b.insertBefore(p, u) : b.appendChild(p)), h && t("raphael.drag.over." + r.el.id, r.el, h), o += i, a += n, t("raphael.drag.move." + r.el.id, r.move_scope || r.el, o - r.el._drag.x, a - r.el._drag.y, o, a, e)
                                }
                            }, Ge = function(e) {
                                r.unmousemove(ze).unmouseup(Ge);
                                for (var o, a = Ve.length; a--;)(o = Ve[a]).el._drag = {}, t("raphael.drag.end." + o.el.id, o.end_scope || o.start_scope || o.move_scope || o.el, e);
                                Ve = []
                            }, Ue = r.el = {}, je = x.length; je--;) ! function(e) {
                            r[e] = Ue[e] = function(t, o) {
                                return r.is(t, "function") && (this.events = this.events || [], this.events.push({
                                    name: e,
                                    f: t,
                                    unbind: He(this.shape || this.node || l.doc, e, t, o || this)
                                })), this
                            }, r["un" + e] = Ue["un" + e] = function(t) {
                                for (var o = this.events || [], a = o.length; a--;) o[a].name != e || !r.is(t, "undefined") && o[a].f != t || (o[a].unbind(), o.splice(a, 1), !o.length && delete this.events);
                                return this
                            }
                        }(x[je]);
                        Ue.data = function(e, o) {
                            var a = W[this.id] = W[this.id] || {};
                            if (0 == arguments.length) return a;
                            if (1 == arguments.length) {
                                if (r.is(e, "object")) {
                                    for (var n in e) e[s](n) && this.data(n, e[n]);
                                    return this
                                }
                                return t("raphael.data.get." + this.id, this, a[e], e), a[e]
                            }
                            return a[e] = o, t("raphael.data.set." + this.id, this, o, e), this
                        }, Ue.removeData = function(e) {
                            return null == e ? W[this.id] = {} : W[this.id] && delete W[this.id][e], this
                        }, Ue.getData = function() {
                            return te(W[this.id] || {})
                        }, Ue.hover = function(e, t, r, o) {
                            return this.mouseover(e, r).mouseout(t, o || r)
                        }, Ue.unhover = function(e, t) {
                            return this.unmouseover(e).unmouseout(t)
                        };
                        var Ye = [];
                        Ue.drag = function(e, o, a, n, i, d) {
                            function s(s) {
                                (s.originalEvent || s).preventDefault();
                                var c = s.clientX,
                                    h = s.clientY,
                                    p = l.doc.documentElement.scrollTop || l.doc.body.scrollTop,
                                    u = l.doc.documentElement.scrollLeft || l.doc.body.scrollLeft;
                                if (this._drag.id = s.identifier, m && s.touches)
                                    for (var b, f = s.touches.length; f--;)
                                        if (b = s.touches[f], this._drag.id = b.identifier, b.identifier == this._drag.id) {
                                            c = b.clientX, h = b.clientY;
                                            break
                                        }
                                this._drag.x = c + u, this._drag.y = h + p, !Ve.length && r.mousemove(ze).mouseup(Ge), Ve.push({
                                    el: this,
                                    move_scope: n,
                                    start_scope: i,
                                    end_scope: d
                                }), o && t.on("raphael.drag.start." + this.id, o), e && t.on("raphael.drag.move." + this.id, e), a && t.on("raphael.drag.end." + this.id, a), t("raphael.drag.start." + this.id, i || n || this, s.clientX + u, s.clientY + p, s)
                            }
                            return this._drag = {}, Ye.push({
                                el: this,
                                start: s
                            }), this.mousedown(s), this
                        }, Ue.onDragOver = function(e) {
                            e ? t.on("raphael.drag.over." + this.id, e) : t.unbind("raphael.drag.over." + this.id)
                        }, Ue.undrag = function() {
                            for (var e = Ye.length; e--;) Ye[e].el == this && (this.unmousedown(Ye[e].start), Ye.splice(e, 1), t.unbind("raphael.drag.*." + this.id));
                            !Ye.length && r.unmousemove(ze).unmouseup(Ge), Ve = []
                        }, a.circle = function(e, t, o) {
                            var a = r._engine.circle(this, e || 0, t || 0, o || 0);
                            return this.__set__ && this.__set__.push(a), a
                        }, a.rect = function(e, t, o, a, n) {
                            var i = r._engine.rect(this, e || 0, t || 0, o || 0, a || 0, n || 0);
                            return this.__set__ && this.__set__.push(i), i
                        }, a.ellipse = function(e, t, o, a) {
                            var n = r._engine.ellipse(this, e || 0, t || 0, o || 0, a || 0);
                            return this.__set__ && this.__set__.push(n), n
                        }, a.path = function(e) {
                            e && !r.is(e, "string") && !r.is(e[0], A) && (e += b);
                            var t = r._engine.path(r.format[p](r, arguments), this);
                            return this.__set__ && this.__set__.push(t), t
                        }, a.image = function(e, t, o, a, n) {
                            var i = r._engine.image(this, e || "about:blank", t || 0, o || 0, a || 0, n || 0);
                            return this.__set__ && this.__set__.push(i), i
                        }, a.text = function(e, t, o) {
                            var a = r._engine.text(this, e || 0, t || 0, g(o));
                            return this.__set__ && this.__set__.push(a), a
                        }, a.set = function(e) {
                            !r.is(e, "array") && (e = Array.prototype.splice.call(arguments, 0, arguments.length));
                            var t = new dt(e);
                            return this.__set__ && this.__set__.push(t), t.paper = this, t.type = "set", t
                        }, a.setStart = function(e) {
                            this.__set__ = e || this.set()
                        }, a.setFinish = function(e) {
                            var t = this.__set__;
                            return delete this.__set__, t
                        }, a.getSize = function() {
                            var e = this.canvas.parentNode;
                            return {
                                width: e.offsetWidth,
                                height: e.offsetHeight
                            }
                        }, a.setSize = function(e, t) {
                            return r._engine.setSize.call(this, e, t)
                        }, a.setViewBox = function(e, t, o, a, n) {
                            return r._engine.setViewBox.call(this, e, t, o, a, n)
                        }, a.top = a.bottom = null, a.raphael = r;

                        function We() {
                            return this.x + f + this.y + f + this.width + " × " + this.height
                        }
                        a.getElementByPoint = function(e, t) {
                            var r = this.canvas,
                                o = l.doc.elementFromPoint(e, t);
                            if (l.win.opera && "svg" == o.tagName) {
                                var a = function(e) {
                                        var t = e.getBoundingClientRect(),
                                            r = e.ownerDocument,
                                            o = r.body,
                                            a = r.documentElement,
                                            n = a.clientTop || o.clientTop || 0,
                                            i = a.clientLeft || o.clientLeft || 0;
                                        return {
                                            y: t.top + (l.win.pageYOffset || a.scrollTop || o.scrollTop) - n,
                                            x: t.left + (l.win.pageXOffset || a.scrollLeft || o.scrollLeft) - i
                                        }
                                    }(r),
                                    n = r.createSVGRect();
                                n.x = e - a.x, n.y = t - a.y, n.width = n.height = 1;
                                var i = r.getIntersectionList(n, null);
                                i.length && (o = i[i.length - 1])
                            }
                            if (!o) return null;
                            for (; o.parentNode && o != r.parentNode && !o.raphael;) o = o.parentNode;
                            return o == this.canvas.parentNode && (o = r), o = o && o.raphael ? this.getById(o.raphaelid) : null
                        }, a.getElementsByBBox = function(e) {
                            var t = this.set();
                            return this.forEach(function(o) {
                                r.isBBoxIntersect(o.getBBox(), e) && t.push(o)
                            }), t
                        }, a.getById = function(e) {
                            for (var t = this.bottom; t;) {
                                if (t.id == e) return t;
                                t = t.next
                            }
                            return null
                        }, a.forEach = function(e, t) {
                            for (var r = this.bottom; r;) {
                                if (!1 === e.call(t, r)) return this;
                                r = r.next
                            }
                            return this
                        }, a.getElementsByPoint = function(e, t) {
                            var r = this.set();
                            return this.forEach(function(o) {
                                o.isPointInside(e, t) && r.push(o)
                            }), r
                        }, Ue.isPointInside = function(e, t) {
                            var o = this.realPath = X[this.type](this);
                            return this.attr("transform") && this.attr("transform").length && (o = r.transformPath(o, this.attr("transform"))), r.isPointInsidePath(o, e, t)
                        }, Ue.getBBox = function(e) {
                            if (this.removed) return {};
                            var t = this._;
                            return e ? (!t.dirty && t.bboxwt || (this.realPath = X[this.type](this), t.bboxwt = ge(this.realPath), t.bboxwt.toString = We, t.dirty = 0), t.bboxwt) : ((t.dirty || t.dirtyT || !t.bbox) && (!t.dirty && this.realPath || (t.bboxwt = 0, this.realPath = X[this.type](this)), t.bbox = ge(J(this.realPath, this.matrix)), t.bbox.toString = We, t.dirty = t.dirtyT = 0), t.bbox)
                        }, Ue.clone = function() {
                            if (this.removed) return null;
                            var e = this.paper[this.type]().attr(this.attr());
                            return this.__set__ && this.__set__.push(e), e
                        }, Ue.glow = function(e) {
                            if ("text" == this.type) return null;
                            var t = {
                                    width: ((e = e || {}).width || 10) + (+this.attr("stroke-width") || 1),
                                    fill: e.fill || !1,
                                    opacity: e.opacity || .5,
                                    offsetx: e.offsetx || 0,
                                    offsety: e.offsety || 0,
                                    color: e.color || "#000"
                                },
                                r = t.width / 2,
                                o = this.paper,
                                a = o.set(),
                                n = this.realPath || X[this.type](this);
                            n = this.matrix ? J(n, this.matrix) : n;
                            for (var i = 1; i < r + 1; i++) a.push(o.path(n).attr({
                                stroke: t.color,
                                fill: t.fill ? t.color : "none",
                                "stroke-linejoin": "round",
                                "stroke-linecap": "round",
                                "stroke-width": +(t.width / r * i).toFixed(3),
                                opacity: +(t.opacity / r).toFixed(3)
                            }));
                            return a.insertBefore(this).translate(t.offsetx, t.offsety)
                        };
                        var qe = function(e, t, o, a, n, i, d, s, l) {
                                return null == l ? ue(e, t, o, a, n, i, d, s) : r.findDotsAtSegment(e, t, o, a, n, i, d, s, function(e, t, r, o, a, n, i, d, s) {
                                    if (!(s < 0 || ue(e, t, r, o, a, n, i, d) < s)) {
                                        var l, c = .5,
                                            h = 1 - c;
                                        for (l = ue(e, t, r, o, a, n, i, d, h); E(l - s) > .01;) c /= 2, l = ue(e, t, r, o, a, n, i, d, h += (l < s ? 1 : -1) * c);
                                        return h
                                    }
                                }(e, t, o, a, n, i, d, s, l))
                            },
                            $e = function(e, t) {
                                return function(o, a, n) {
                                    for (var i, d, s, l, c, h = "", p = {}, u = 0, m = 0, b = (o = Ce(o)).length; m < b; m++) {
                                        if ("M" == (s = o[m])[0]) i = +s[1], d = +s[2];
                                        else {
                                            if (u + (l = qe(i, d, s[1], s[2], s[3], s[4], s[5], s[6])) > a) {
                                                if (t && !p.start) {
                                                    if (h += ["C" + (c = qe(i, d, s[1], s[2], s[3], s[4], s[5], s[6], a - u)).start.x, c.start.y, c.m.x, c.m.y, c.x, c.y], n) return h;
                                                    p.start = h, h = ["M" + c.x, c.y + "C" + c.n.x, c.n.y, c.end.x, c.end.y, s[5], s[6]].join(), u += l, i = +s[5], d = +s[6];
                                                    continue
                                                }
                                                if (!e && !t) return {
                                                    x: (c = qe(i, d, s[1], s[2], s[3], s[4], s[5], s[6], a - u)).x,
                                                    y: c.y,
                                                    alpha: c.alpha
                                                }
                                            }
                                            u += l, i = +s[5], d = +s[6]
                                        }
                                        h += s.shift() + s
                                    }
                                    return p.end = h, (c = e ? u : t ? p : r.findDotsAtSegment(i, d, s[0], s[1], s[2], s[3], s[4], s[5], 1)).alpha && (c = {
                                        x: c.x,
                                        y: c.y,
                                        alpha: c.alpha
                                    }), c
                                }
                            },
                            Ke = $e(1),
                            Qe = $e(),
                            Xe = $e(0, 1);
                        r.getTotalLength = Ke, r.getPointAtLength = Qe, r.getSubpath = function(e, t, r) {
                            if (this.getTotalLength(e) - r < 1e-6) return Xe(e, t).end;
                            var o = Xe(e, r, 1);
                            return t ? Xe(o, t).end : o
                        }, Ue.getTotalLength = function() {
                            var e = this.getPath();
                            if (e) return this.node.getTotalLength ? this.node.getTotalLength() : Ke(e)
                        }, Ue.getPointAtLength = function(e) {
                            var t = this.getPath();
                            if (t) return Qe(t, e)
                        }, Ue.getPath = function() {
                            var e, t = r._getPath[this.type];
                            if ("text" != this.type && "set" != this.type) return t && (e = t(this)), e
                        }, Ue.getSubpath = function(e, t) {
                            var o = this.getPath();
                            if (o) return r.getSubpath(o, e, t)
                        };
                        var Je = r.easing_formulas = {
                            linear: function(e) {
                                return e
                            },
                            "<": function(e) {
                                return C(e, 1.7)
                            },
                            ">": function(e) {
                                return C(e, .48)
                            },
                            "<>": function(e) {
                                var t = .48 - e / 1.04,
                                    r = k.sqrt(.1734 + t * t),
                                    o = r - t,
                                    a = -r - t,
                                    n = C(E(o), 1 / 3) * (o < 0 ? -1 : 1) + C(E(a), 1 / 3) * (a < 0 ? -1 : 1) + .5;
                                return 3 * (1 - n) * n * n + n * n * n
                            },
                            backIn: function(e) {
                                var t = 1.70158;
                                return e * e * ((t + 1) * e - t)
                            },
                            backOut: function(e) {
                                var t = 1.70158;
                                return (e -= 1) * e * ((t + 1) * e + t) + 1
                            },
                            elastic: function(e) {
                                return e == !!e ? e : C(2, -10 * e) * k.sin(2 * R * (e - .075) / .3) + 1
                            },
                            bounce: function(e) {
                                var t = 7.5625,
                                    r = 2.75;
                                return e < 1 / r ? t * e * e : e < 2 / r ? t * (e -= 1.5 / r) * e + .75 : e < 2.5 / r ? t * (e -= 2.25 / r) * e + .9375 : t * (e -= 2.625 / r) * e + .984375
                            }
                        };
                        Je.easeIn = Je["ease-in"] = Je["<"], Je.easeOut = Je["ease-out"] = Je[">"], Je.easeInOut = Je["ease-in-out"] = Je["<>"], Je["back-in"] = Je.backIn, Je["back-out"] = Je.backOut;
                        var Ze = [],
                            et = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(e) {
                                setTimeout(e, 16)
                            },
                            tt = function() {
                                for (var e = +new Date, o = 0; o < Ze.length; o++) {
                                    var a = Ze[o];
                                    if (!a.el.removed && !a.paused) {
                                        var n, i, d = e - a.start,
                                            l = a.ms,
                                            c = a.easing,
                                            h = a.from,
                                            p = a.diff,
                                            m = a.to,
                                            b = (a.t, a.el),
                                            g = {},
                                            w = {};
                                        if (a.initstatus ? (d = (a.initstatus * a.anim.top - a.prev) / (a.percent - a.prev) * l, a.status = a.initstatus, delete a.initstatus, a.stop && Ze.splice(o--, 1)) : a.status = (a.prev + (a.percent - a.prev) * (d / l)) / a.anim.top, !(d < 0))
                                            if (d < l) {
                                                var x = c(d / l);
                                                for (var y in h)
                                                    if (h[s](y)) {
                                                        switch (H[y]) {
                                                            case S:
                                                                n = +h[y] + x * l * p[y];
                                                                break;
                                                            case "colour":
                                                                n = "rgb(" + [rt(O(h[y].r + x * l * p[y].r)), rt(O(h[y].g + x * l * p[y].g)), rt(O(h[y].b + x * l * p[y].b))].join(",") + ")";
                                                                break;
                                                            case "path":
                                                                n = [];
                                                                for (var v = 0, k = h[y].length; v < k; v++) {
                                                                    n[v] = [h[y][v][0]];
                                                                    for (var _ = 1, T = h[y][v].length; _ < T; _++) n[v][_] = +h[y][v][_] + x * l * p[y][v][_];
                                                                    n[v] = n[v].join(f)
                                                                }
                                                                n = n.join(f);
                                                                break;
                                                            case "transform":
                                                                if (p[y].real)
                                                                    for (n = [], v = 0, k = h[y].length; v < k; v++)
                                                                        for (n[v] = [h[y][v][0]], _ = 1, T = h[y][v].length; _ < T; _++) n[v][_] = h[y][v][_] + x * l * p[y][v][_];
                                                                else {
                                                                    var E = function(e) {
                                                                        return +h[y][e] + x * l * p[y][e]
                                                                    };
                                                                    n = [
                                                                        ["m", E(0), E(1), E(2), E(3), E(4), E(5)]
                                                                    ]
                                                                }
                                                                break;
                                                            case "csv":
                                                                if ("clip-rect" == y)
                                                                    for (n = [], v = 4; v--;) n[v] = +h[y][v] + x * l * p[y][v];
                                                                break;
                                                            default:
                                                                var C = [][u](h[y]);
                                                                for (n = [], v = b.paper.customAttributes[y].length; v--;) n[v] = +C[v] + x * l * p[y][v]
                                                        }
                                                        g[y] = n
                                                    }
                                                b.attr(g),
                                                    function(e, r, o) {
                                                        setTimeout(function() {
                                                            t("raphael.anim.frame." + e, r, o)
                                                        })
                                                    }(b.id, b, a.anim)
                                            } else {
                                                if (function(e, o, a) {
                                                        setTimeout(function() {
                                                            t("raphael.anim.frame." + o.id, o, a), t("raphael.anim.finish." + o.id, o, a), r.is(e, "function") && e.call(o)
                                                        })
                                                    }(a.callback, b, a.anim), b.attr(m), Ze.splice(o--, 1), a.repeat > 1 && !a.next) {
                                                    for (i in m) m[s](i) && (w[i] = a.totalOrigin[i]);
                                                    a.el.attr(w), nt(a.anim, a.el, a.anim.percents[0], null, a.totalOrigin, a.repeat - 1)
                                                }
                                                a.next && !a.stop && nt(a.anim, a.el, a.next, null, a.totalOrigin, a.repeat)
                                            }
                                    }
                                }
                                r.svg && b && b.paper && b.paper.safari(), Ze.length && et(tt)
                            },
                            rt = function(e) {
                                return e > 255 ? 255 : e < 0 ? 0 : e
                            };

                        function ot(e, t, r, o, a, n) {
                            var i = 3 * t,
                                d = 3 * (o - t) - i,
                                s = 1 - i - d,
                                l = 3 * r,
                                c = 3 * (a - r) - l,
                                h = 1 - l - c;

                            function p(e) {
                                return ((s * e + d) * e + i) * e
                            }
                            return function(e, t) {
                                var r = function(e, t) {
                                    var r, o, a, n, l, c;
                                    for (a = e, c = 0; c < 8; c++) {
                                        if (n = p(a) - e, E(n) < t) return a;
                                        if (E(l = (3 * s * a + 2 * d) * a + i) < 1e-6) break;
                                        a -= n / l
                                    }
                                    if (o = 1, (a = e) < (r = 0)) return r;
                                    if (a > o) return o;
                                    for (; r < o;) {
                                        if (n = p(a), E(n - e) < t) return a;
                                        e > n ? r = a : o = a, a = (o - r) / 2 + r
                                    }
                                    return a
                                }(e, t);
                                return ((h * r + c) * r + l) * r
                            }(e, 1 / (200 * n))
                        }

                        function at(e, t) {
                            var r = [],
                                o = {};
                            if (this.ms = t, this.times = 1, e) {
                                for (var a in e) e[s](a) && (o[I(a)] = e[a], r.push(I(a)));
                                r.sort(q)
                            }
                            this.anim = o, this.top = r[r.length - 1], this.percents = r
                        }

                        function nt(e, o, a, i, d, l) {
                            a = I(a);
                            var c, h, p, m, b, f, x = e.ms,
                                y = {},
                                v = {},
                                k = {};
                            if (i)
                                for (T = 0, E = Ze.length; T < E; T++) {
                                    var _ = Ze[T];
                                    if (_.el.id == o.id && _.anim == e) {
                                        _.percent != a ? (Ze.splice(T, 1), p = 1) : h = _, o.attr(_.totalOrigin);
                                        break
                                    }
                                } else i = +v;
                            for (var T = 0, E = e.percents.length; T < E; T++) {
                                if (e.percents[T] == a || e.percents[T] > i * e.top) {
                                    a = e.percents[T], b = e.percents[T - 1] || 0, x = x / e.top * (a - b), m = e.percents[T + 1], c = e.anim[a];
                                    break
                                }
                                i && o.attr(e.anim[e.percents[T]])
                            }
                            if (c) {
                                if (h) h.initstatus = i, h.start = new Date - h.ms * i;
                                else {
                                    for (var C in c)
                                        if (c[s](C) && (H[s](C) || o.paper.customAttributes[s](C))) switch (y[C] = o.attr(C), null == y[C] && (y[C] = F[C]), v[C] = c[C], H[C]) {
                                            case S:
                                                k[C] = (v[C] - y[C]) / x;
                                                break;
                                            case "colour":
                                                y[C] = r.getRGB(y[C]);
                                                var R = r.getRGB(v[C]);
                                                k[C] = {
                                                    r: (R.r - y[C].r) / x,
                                                    g: (R.g - y[C].g) / x,
                                                    b: (R.b - y[C].b) / x
                                                };
                                                break;
                                            case "path":
                                                var A = Ce(y[C], v[C]),
                                                    P = A[1];
                                                for (y[C] = A[0], k[C] = [], T = 0, E = y[C].length; T < E; T++) {
                                                    k[C][T] = [0];
                                                    for (var L = 1, M = y[C][T].length; L < M; L++) k[C][T][L] = (P[T][L] - y[C][T][L]) / x
                                                }
                                                break;
                                            case "transform":
                                                var O = o._,
                                                    N = Le(O[C], v[C]);
                                                if (N)
                                                    for (y[C] = N.from, v[C] = N.to, k[C] = [], k[C].real = !0, T = 0, E = y[C].length; T < E; T++)
                                                        for (k[C][T] = [y[C][T][0]], L = 1, M = y[C][T].length; L < M; L++) k[C][T][L] = (v[C][T][L] - y[C][T][L]) / x;
                                                else {
                                                    var D = o.matrix || new Me,
                                                        V = {
                                                            _: {
                                                                transform: O.transform
                                                            },
                                                            getBBox: function() {
                                                                return o.getBBox(1)
                                                            }
                                                        };
                                                    y[C] = [D.a, D.b, D.c, D.d, D.e, D.f], Ae(V, v[C]), v[C] = V._.transform, k[C] = [(V.matrix.a - D.a) / x, (V.matrix.b - D.b) / x, (V.matrix.c - D.c) / x, (V.matrix.d - D.d) / x, (V.matrix.e - D.e) / x, (V.matrix.f - D.f) / x]
                                                }
                                                break;
                                            case "csv":
                                                var z = g(c[C])[w](n),
                                                    G = g(y[C])[w](n);
                                                if ("clip-rect" == C)
                                                    for (y[C] = G, k[C] = [], T = G.length; T--;) k[C][T] = (z[T] - y[C][T]) / x;
                                                v[C] = z;
                                                break;
                                            default:
                                                for (z = [][u](c[C]), G = [][u](y[C]), k[C] = [], T = o.paper.customAttributes[C].length; T--;) k[C][T] = ((z[T] || 0) - (G[T] || 0)) / x
                                        }
                                        var U = c.easing,
                                            j = r.easing_formulas[U];
                                    if (!j)
                                        if ((j = g(U).match(B)) && 5 == j.length) {
                                            var Y = j;
                                            j = function(e) {
                                                return ot(e, +Y[1], +Y[2], +Y[3], +Y[4], x)
                                            }
                                        } else j = $;
                                    if (_ = {
                                            anim: e,
                                            percent: a,
                                            timestamp: f = c.start || e.start || +new Date,
                                            start: f + (e.del || 0),
                                            status: 0,
                                            initstatus: i || 0,
                                            stop: !1,
                                            ms: x,
                                            easing: j,
                                            from: y,
                                            diff: k,
                                            to: v,
                                            el: o,
                                            callback: c.callback,
                                            prev: b,
                                            next: m,
                                            repeat: l || e.times,
                                            origin: o.attr(),
                                            totalOrigin: d
                                        }, Ze.push(_), i && !h && !p && (_.stop = !0, _.start = new Date - x * i, 1 == Ze.length)) return tt();
                                    p && (_.start = new Date - _.ms * i), 1 == Ze.length && et(tt)
                                }
                                t("raphael.anim.start." + o.id, o, e)
                            }
                        }

                        function it(e) {
                            for (var t = 0; t < Ze.length; t++) Ze[t].el.paper == e && Ze.splice(t--, 1)
                        }
                        Ue.animateWith = function(e, t, o, a, n, i) {
                            if (this.removed) return i && i.call(this), this;
                            var d = o instanceof at ? o : r.animation(o, a, n, i);
                            nt(d, this, d.percents[0], null, this.attr());
                            for (var s = 0, l = Ze.length; s < l; s++)
                                if (Ze[s].anim == t && Ze[s].el == e) {
                                    Ze[l - 1].start = Ze[s].start;
                                    break
                                }
                            return this
                        }, Ue.onAnimation = function(e) {
                            return e ? t.on("raphael.anim.frame." + this.id, e) : t.unbind("raphael.anim.frame." + this.id), this
                        }, at.prototype.delay = function(e) {
                            var t = new at(this.anim, this.ms);
                            return t.times = this.times, t.del = +e || 0, t
                        }, at.prototype.repeat = function(e) {
                            var t = new at(this.anim, this.ms);
                            return t.del = this.del, t.times = k.floor(_(e, 0)) || 1, t
                        }, r.animation = function(e, t, o, a) {
                            if (e instanceof at) return e;
                            !r.is(o, "function") && o || (a = a || o || null, o = null), e = Object(e), t = +t || 0;
                            var n, i, d = {};
                            for (i in e) e[s](i) && I(i) != i && I(i) + "%" != i && (n = !0, d[i] = e[i]);
                            return n ? (o && (d.easing = o), a && (d.callback = a), new at({
                                100: d
                            }, t)) : new at(e, t)
                        }, Ue.animate = function(e, t, o, a) {
                            if (this.removed) return a && a.call(this), this;
                            var n = e instanceof at ? e : r.animation(e, t, o, a);
                            return nt(n, this, n.percents[0], null, this.attr()), this
                        }, Ue.setTime = function(e, t) {
                            return e && null != t && this.status(e, T(t, e.ms) / e.ms), this
                        }, Ue.status = function(e, t) {
                            var r, o, a = [],
                                n = 0;
                            if (null != t) return nt(e, this, -1, T(t, 1)), this;
                            for (r = Ze.length; n < r; n++)
                                if ((o = Ze[n]).el.id == this.id && (!e || o.anim == e)) {
                                    if (e) return o.status;
                                    a.push({
                                        anim: o.anim,
                                        status: o.status
                                    })
                                }
                            return e ? 0 : a
                        }, Ue.pause = function(e) {
                            for (var r = 0; r < Ze.length; r++) Ze[r].el.id != this.id || e && Ze[r].anim != e || !1 !== t("raphael.anim.pause." + this.id, this, Ze[r].anim) && (Ze[r].paused = !0);
                            return this
                        }, Ue.resume = function(e) {
                            for (var r = 0; r < Ze.length; r++)
                                if (Ze[r].el.id == this.id && (!e || Ze[r].anim == e)) {
                                    var o = Ze[r];
                                    !1 !== t("raphael.anim.resume." + this.id, this, o.anim) && (delete o.paused, this.status(o.anim, o.status))
                                }
                            return this
                        }, Ue.stop = function(e) {
                            for (var r = 0; r < Ze.length; r++) Ze[r].el.id != this.id || e && Ze[r].anim != e || !1 !== t("raphael.anim.stop." + this.id, this, Ze[r].anim) && Ze.splice(r--, 1);
                            return this
                        }, t.on("raphael.remove", it), t.on("raphael.clear", it), Ue.toString = function() {
                            return "Raphaël’s object"
                        };
                        var dt = function(e) {
                                if (this.items = [], this.length = 0, this.type = "set", e)
                                    for (var t = 0, r = e.length; t < r; t++) !e[t] || e[t].constructor != Ue.constructor && e[t].constructor != dt || (this[this.items.length] = this.items[this.items.length] = e[t], this.length++)
                            },
                            st = dt.prototype;
                        for (var lt in st.push = function() {
                                for (var e, t, r = 0, o = arguments.length; r < o; r++) !(e = arguments[r]) || e.constructor != Ue.constructor && e.constructor != dt || (this[t = this.items.length] = this.items[t] = e, this.length++);
                                return this
                            }, st.pop = function() {
                                return this.length && delete this[this.length--], this.items.pop()
                            }, st.forEach = function(e, t) {
                                for (var r = 0, o = this.items.length; r < o; r++)
                                    if (!1 === e.call(t, this.items[r], r)) return this;
                                return this
                            }, Ue) Ue[s](lt) && (st[lt] = function(e) {
                            return function() {
                                var t = arguments;
                                return this.forEach(function(r) {
                                    r[e][p](r, t)
                                })
                            }
                        }(lt));
                        return st.attr = function(e, t) {
                                if (e && r.is(e, A) && r.is(e[0], "object"))
                                    for (var o = 0, a = e.length; o < a; o++) this.items[o].attr(e[o]);
                                else
                                    for (var n = 0, i = this.items.length; n < i; n++) this.items[n].attr(e, t);
                                return this
                            }, st.clear = function() {
                                for (; this.length;) this.pop()
                            }, st.splice = function(e, t, r) {
                                e = e < 0 ? _(this.length + e, 0) : e, t = _(0, T(this.length - e, t));
                                var o, a = [],
                                    n = [],
                                    i = [];
                                for (o = 2; o < arguments.length; o++) i.push(arguments[o]);
                                for (o = 0; o < t; o++) n.push(this[e + o]);
                                for (; o < this.length - e; o++) a.push(this[e + o]);
                                var d = i.length;
                                for (o = 0; o < d + a.length; o++) this.items[e + o] = this[e + o] = o < d ? i[o] : a[o - d];
                                for (o = this.items.length = this.length -= t - d; this[o];) delete this[o++];
                                return new dt(n)
                            }, st.exclude = function(e) {
                                for (var t = 0, r = this.length; t < r; t++)
                                    if (this[t] == e) return this.splice(t, 1), !0
                            }, st.animate = function(e, t, o, a) {
                                (r.is(o, "function") || !o) && (a = o || null);
                                var n, i, d = this.items.length,
                                    s = d,
                                    l = this;
                                if (!d) return this;
                                a && (i = function() {
                                    !--d && a.call(l)
                                }), o = r.is(o, "string") ? o : i;
                                var c = r.animation(e, t, o, i);
                                for (n = this.items[--s].animate(c); s--;) this.items[s] && !this.items[s].removed && this.items[s].animateWith(n, c, c), this.items[s] && !this.items[s].removed || d--;
                                return this
                            }, st.insertAfter = function(e) {
                                for (var t = this.items.length; t--;) this.items[t].insertAfter(e);
                                return this
                            }, st.getBBox = function() {
                                for (var e = [], t = [], r = [], o = [], a = this.items.length; a--;)
                                    if (!this.items[a].removed) {
                                        var n = this.items[a].getBBox();
                                        e.push(n.x), t.push(n.y), r.push(n.x + n.width), o.push(n.y + n.height)
                                    }
                                return {
                                    x: e = T[p](0, e),
                                    y: t = T[p](0, t),
                                    x2: r = _[p](0, r),
                                    y2: o = _[p](0, o),
                                    width: r - e,
                                    height: o - t
                                }
                            }, st.clone = function(e) {
                                e = this.paper.set();
                                for (var t = 0, r = this.items.length; t < r; t++) e.push(this.items[t].clone());
                                return e
                            }, st.toString = function() {
                                return "Raphaël‘s set"
                            }, st.glow = function(e) {
                                var t = this.paper.set();
                                return this.forEach(function(r, o) {
                                    var a = r.glow(e);
                                    null != a && a.forEach(function(e, r) {
                                        t.push(e)
                                    })
                                }), t
                            }, st.isPointInside = function(e, t) {
                                var r = !1;
                                return this.forEach(function(o) {
                                    if (o.isPointInside(e, t)) return console.log("runned"), r = !0, !1
                                }), r
                            }, r.registerFont = function(e) {
                                if (!e.face) return e;
                                this.fonts = this.fonts || {};
                                var t = {
                                        w: e.w,
                                        face: {},
                                        glyphs: {}
                                    },
                                    r = e.face["font-family"];
                                for (var o in e.face) e.face[s](o) && (t.face[o] = e.face[o]);
                                if (this.fonts[r] ? this.fonts[r].push(t) : this.fonts[r] = [t], !e.svg)
                                    for (var a in t.face["units-per-em"] = N(e.face["units-per-em"], 10), e.glyphs)
                                        if (e.glyphs[s](a)) {
                                            var n = e.glyphs[a];
                                            if (t.glyphs[a] = {
                                                    w: n.w,
                                                    k: {},
                                                    d: n.d && "M" + n.d.replace(/[mlcxtrv]/g, function(e) {
                                                        return {
                                                            l: "L",
                                                            c: "C",
                                                            x: "z",
                                                            t: "m",
                                                            r: "l",
                                                            v: "c"
                                                        }[e] || "M"
                                                    }) + "z"
                                                }, n.k)
                                                for (var i in n.k) n[s](i) && (t.glyphs[a].k[i] = n.k[i])
                                        }
                                return e
                            }, a.getFont = function(e, t, o, a) {
                                if (a = a || "normal", o = o || "normal", t = +t || {
                                        normal: 400,
                                        bold: 700,
                                        lighter: 300,
                                        bolder: 800
                                    }[t] || 400, r.fonts) {
                                    var n, i = r.fonts[e];
                                    if (!i) {
                                        var d = new RegExp("(^|\\s)" + e.replace(/[^\w\d\s+!~.:_-]/g, b) + "(\\s|$)", "i");
                                        for (var l in r.fonts)
                                            if (r.fonts[s](l) && d.test(l)) {
                                                i = r.fonts[l];
                                                break
                                            }
                                    }
                                    if (i)
                                        for (var c = 0, h = i.length; c < h && ((n = i[c]).face["font-weight"] != t || n.face["font-style"] != o && n.face["font-style"] || n.face["font-stretch"] != a); c++);
                                    return n
                                }
                            }, a.print = function(e, t, o, a, i, d, s, l) {
                                d = d || "middle", s = _(T(s || 0, 1), -1), l = _(T(l || 1, 3), 1);
                                var c, h = g(o)[w](b),
                                    p = 0,
                                    u = 0,
                                    m = b;
                                if (r.is(a, "string") && (a = this.getFont(a)), a) {
                                    c = (i || 16) / a.face["units-per-em"];
                                    for (var f = a.face.bbox[w](n), x = +f[0], y = f[3] - f[1], v = 0, k = +f[1] + ("baseline" == d ? y + +a.face.descent : y / 2), E = 0, C = h.length; E < C; E++) {
                                        if ("\n" == h[E]) p = 0, S = 0, u = 0, v += y * l;
                                        else {
                                            var R = u && a.glyphs[h[E - 1]] || {},
                                                S = a.glyphs[h[E]];
                                            p += u ? (R.w || a.w) + (R.k && R.k[h[E]] || 0) + a.w * s : 0, u = 1
                                        }
                                        S && S.d && (m += r.transformPath(S.d, ["t", p * c, v * c, "s", c, c, x, k, "t", (e - x) / c, (t - k) / c]))
                                    }
                                }
                                return this.path(m).attr({
                                    fill: "#000",
                                    stroke: "none"
                                })
                            }, a.add = function(e) {
                                if (r.is(e, "array"))
                                    for (var t, o = this.set(), a = 0, n = e.length; a < n; a++) t = e[a] || {}, i[s](t.type) && o.push(this[t.type]().attr(t));
                                return o
                            }, r.format = function(e, t) {
                                var o = r.is(t, A) ? [0][u](t) : arguments;
                                return e && r.is(e, "string") && o.length - 1 && (e = e.replace(d, function(e, t) {
                                    return null == o[++t] ? b : o[t]
                                })), e || b
                            }, r.fullfill = function() {
                                var e = /\{([^\}]+)\}/g,
                                    t = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g;
                                return function(r, o) {
                                    return String(r).replace(e, function(e, r) {
                                        return function(e, r, o) {
                                            var a = o;
                                            return r.replace(t, function(e, t, r, o, n) {
                                                t = t || o, a && (t in a && (a = a[t]), "function" == typeof a && n && (a = a()))
                                            }), a = (null == a || a == o ? e : a) + ""
                                        }(e, r, o)
                                    })
                                }
                            }(), r.ninja = function() {
                                return c.was ? l.win.Raphael = c.is : delete Raphael, r
                            }, r.st = st,
                            function(e, t, o) {
                                null == e.readyState && e.addEventListener && (e.addEventListener("DOMContentLoaded", o = function() {
                                        e.removeEventListener("DOMContentLoaded", o, !1), e.readyState = "complete"
                                    }, !1), e.readyState = "loading"),
                                    function t() {
                                        /in/.test(e.readyState) ? setTimeout(t, 9) : r.eve("raphael.DOMload")
                                    }()
                            }(document), t.on("raphael.DOMload", function() {
                                o = !0
                            }),
                            function() {
                                if (r.svg) {
                                    var e = "hasOwnProperty",
                                        t = String,
                                        o = parseFloat,
                                        a = parseInt,
                                        n = Math,
                                        i = n.max,
                                        d = n.abs,
                                        s = n.pow,
                                        l = /[, ]+/,
                                        c = r.eve,
                                        h = "",
                                        p = " ",
                                        u = "http://www.w3.org/1999/xlink",
                                        m = {
                                            block: "M5,0 0,2.5 5,5z",
                                            classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                                            diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                                            open: "M6,1 1,3.5 6,6",
                                            oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
                                        },
                                        b = {};
                                    r.toString = function() {
                                        return "Your browser supports SVG.\nYou are running Raphaël " + this.version
                                    };
                                    var f = function(o, a) {
                                            if (a)
                                                for (var n in "string" == typeof o && (o = f(o)), a) a[e](n) && ("xlink:" == n.substring(0, 6) ? o.setAttributeNS(u, n.substring(6), t(a[n])) : o.setAttribute(n, t(a[n])));
                                            else(o = r._g.doc.createElementNS("http://www.w3.org/2000/svg", o)).style && (o.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                                            return o
                                        },
                                        g = function(e, a) {
                                            var l = "linear",
                                                c = e.id + a,
                                                p = .5,
                                                u = .5,
                                                m = e.node,
                                                b = e.paper,
                                                g = m.style,
                                                w = r._g.doc.getElementById(c);
                                            if (!w) {
                                                if (a = (a = t(a).replace(r._radial_gradient, function(e, t, r) {
                                                        if (l = "radial", t && r) {
                                                            p = o(t);
                                                            var a = 2 * ((u = o(r)) > .5) - 1;
                                                            s(p - .5, 2) + s(u - .5, 2) > .25 && (u = n.sqrt(.25 - s(p - .5, 2)) * a + .5) && .5 != u && (u = u.toFixed(5) - 1e-5 * a)
                                                        }
                                                        return h
                                                    })).split(/\s*\-\s*/), "linear" == l) {
                                                    var x = a.shift();
                                                    if (x = -o(x), isNaN(x)) return null;
                                                    var y = [0, 0, n.cos(r.rad(x)), n.sin(r.rad(x))],
                                                        v = 1 / (i(d(y[2]), d(y[3])) || 1);
                                                    y[2] *= v, y[3] *= v, y[2] < 0 && (y[0] = -y[2], y[2] = 0), y[3] < 0 && (y[1] = -y[3], y[3] = 0)
                                                }
                                                var k = r._parseDots(a);
                                                if (!k) return null;
                                                if (c = c.replace(/[\(\)\s,\xb0#]/g, "_"), e.gradient && c != e.gradient.id && (b.defs.removeChild(e.gradient), delete e.gradient), !e.gradient) {
                                                    w = f(l + "Gradient", {
                                                        id: c
                                                    }), e.gradient = w, f(w, "radial" == l ? {
                                                        fx: p,
                                                        fy: u
                                                    } : {
                                                        x1: y[0],
                                                        y1: y[1],
                                                        x2: y[2],
                                                        y2: y[3],
                                                        gradientTransform: e.matrix.invert()
                                                    }), b.defs.appendChild(w);
                                                    for (var _ = 0, T = k.length; _ < T; _++) w.appendChild(f("stop", {
                                                        offset: k[_].offset ? k[_].offset : _ ? "100%" : "0%",
                                                        "stop-color": k[_].color || "#fff"
                                                    }))
                                                }
                                            }
                                            return f(m, {
                                                fill: "url(#" + c + ")",
                                                opacity: 1,
                                                "fill-opacity": 1
                                            }), g.fill = h, g.opacity = 1, g.fillOpacity = 1, 1
                                        },
                                        w = function(e) {
                                            var t = e.getBBox(1);
                                            f(e.pattern, {
                                                patternTransform: e.matrix.invert() + " translate(" + t.x + "," + t.y + ")"
                                            })
                                        },
                                        x = function(o, a, n) {
                                            if ("path" == o.type) {
                                                for (var i, d, s, l, c, p = t(a).toLowerCase().split("-"), u = o.paper, g = n ? "end" : "start", w = o.node, x = o.attrs, y = x["stroke-width"], v = p.length, k = "classic", _ = 3, T = 3, E = 5; v--;) switch (p[v]) {
                                                    case "block":
                                                    case "classic":
                                                    case "oval":
                                                    case "diamond":
                                                    case "open":
                                                    case "none":
                                                        k = p[v];
                                                        break;
                                                    case "wide":
                                                        T = 5;
                                                        break;
                                                    case "narrow":
                                                        T = 2;
                                                        break;
                                                    case "long":
                                                        _ = 5;
                                                        break;
                                                    case "short":
                                                        _ = 2
                                                }
                                                if ("open" == k ? (_ += 2, T += 2, E += 2, s = 1, l = n ? 4 : 1, c = {
                                                        fill: "none",
                                                        stroke: x.stroke
                                                    }) : (l = s = _ / 2, c = {
                                                        fill: x.stroke,
                                                        stroke: "none"
                                                    }), o._.arrows ? n ? (o._.arrows.endPath && b[o._.arrows.endPath]--, o._.arrows.endMarker && b[o._.arrows.endMarker]--) : (o._.arrows.startPath && b[o._.arrows.startPath]--, o._.arrows.startMarker && b[o._.arrows.startMarker]--) : o._.arrows = {}, "none" != k) {
                                                    var C = "raphael-marker-" + k,
                                                        R = "raphael-marker-" + g + k + _ + T;
                                                    r._g.doc.getElementById(C) ? b[C]++ : (u.defs.appendChild(f(f("path"), {
                                                        "stroke-linecap": "round",
                                                        d: m[k],
                                                        id: C
                                                    })), b[C] = 1);
                                                    var S, A = r._g.doc.getElementById(R);
                                                    A ? (b[R]++, S = A.getElementsByTagName("use")[0]) : (A = f(f("marker"), {
                                                        id: R,
                                                        markerHeight: T,
                                                        markerWidth: _,
                                                        orient: "auto",
                                                        refX: l,
                                                        refY: T / 2
                                                    }), S = f(f("use"), {
                                                        "xlink:href": "#" + C,
                                                        transform: (n ? "rotate(180 " + _ / 2 + " " + T / 2 + ") " : h) + "scale(" + _ / E + "," + T / E + ")",
                                                        "stroke-width": (1 / ((_ / E + T / E) / 2)).toFixed(4)
                                                    }), A.appendChild(S), u.defs.appendChild(A), b[R] = 1), f(S, c);
                                                    var P = s * ("diamond" != k && "oval" != k);
                                                    n ? (i = o._.arrows.startdx * y || 0, d = r.getTotalLength(x.path) - P * y) : (i = P * y, d = r.getTotalLength(x.path) - (o._.arrows.enddx * y || 0)), (c = {})["marker-" + g] = "url(#" + R + ")", (d || i) && (c.d = r.getSubpath(x.path, i, d)), f(w, c), o._.arrows[g + "Path"] = C, o._.arrows[g + "Marker"] = R, o._.arrows[g + "dx"] = P, o._.arrows[g + "Type"] = k, o._.arrows[g + "String"] = a
                                                } else n ? (i = o._.arrows.startdx * y || 0, d = r.getTotalLength(x.path) - i) : (i = 0, d = r.getTotalLength(x.path) - (o._.arrows.enddx * y || 0)), o._.arrows[g + "Path"] && f(w, {
                                                    d: r.getSubpath(x.path, i, d)
                                                }), delete o._.arrows[g + "Path"], delete o._.arrows[g + "Marker"], delete o._.arrows[g + "dx"], delete o._.arrows[g + "Type"], delete o._.arrows[g + "String"];
                                                for (c in b)
                                                    if (b[e](c) && !b[c]) {
                                                        var L = r._g.doc.getElementById(c);
                                                        L && L.parentNode.removeChild(L)
                                                    }
                                            }
                                        },
                                        y = {
                                            "": [0],
                                            none: [0],
                                            "-": [3, 1],
                                            ".": [1, 1],
                                            "-.": [3, 1, 1, 1],
                                            "-..": [3, 1, 1, 1, 1, 1],
                                            ". ": [1, 3],
                                            "- ": [4, 3],
                                            "--": [8, 3],
                                            "- .": [4, 3, 1, 3],
                                            "--.": [8, 3, 1, 3],
                                            "--..": [8, 3, 1, 3, 1, 3]
                                        },
                                        v = function(e, r, o) {
                                            if (r = y[t(r).toLowerCase()]) {
                                                for (var a = e.attrs["stroke-width"] || "1", n = {
                                                        round: a,
                                                        square: a,
                                                        butt: 0
                                                    }[e.attrs["stroke-linecap"] || o["stroke-linecap"]] || 0, i = [], d = r.length; d--;) i[d] = r[d] * a + (d % 2 ? 1 : -1) * n;
                                                f(e.node, {
                                                    "stroke-dasharray": i.join(",")
                                                })
                                            }
                                        },
                                        k = function(o, n) {
                                            var s = o.node,
                                                c = o.attrs,
                                                p = s.style.visibility;
                                            for (var m in s.style.visibility = "hidden", n)
                                                if (n[e](m)) {
                                                    if (!r._availableAttrs[e](m)) continue;
                                                    var b = n[m];
                                                    switch (c[m] = b, m) {
                                                        case "blur":
                                                            o.blur(b);
                                                            break;
                                                        case "href":
                                                        case "title":
                                                            var y = f("title"),
                                                                k = r._g.doc.createTextNode(b);
                                                            y.appendChild(k), s.appendChild(y);
                                                            break;
                                                        case "target":
                                                            var T = s.parentNode;
                                                            if ("a" != T.tagName.toLowerCase()) {
                                                                y = f("a");
                                                                T.insertBefore(y, s), y.appendChild(s), T = y
                                                            }
                                                            "target" == m ? T.setAttributeNS(u, "show", "blank" == b ? "new" : b) : T.setAttributeNS(u, m, b);
                                                            break;
                                                        case "cursor":
                                                            s.style.cursor = b;
                                                            break;
                                                        case "transform":
                                                            o.transform(b);
                                                            break;
                                                        case "arrow-start":
                                                            x(o, b);
                                                            break;
                                                        case "arrow-end":
                                                            x(o, b, 1);
                                                            break;
                                                        case "clip-rect":
                                                            var E = t(b).split(l);
                                                            if (4 == E.length) {
                                                                o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                                                                var C = f("clipPath"),
                                                                    R = f("rect");
                                                                C.id = r.createUUID(), f(R, {
                                                                    x: E[0],
                                                                    y: E[1],
                                                                    width: E[2],
                                                                    height: E[3]
                                                                }), C.appendChild(R), o.paper.defs.appendChild(C), f(s, {
                                                                    "clip-path": "url(#" + C.id + ")"
                                                                }), o.clip = R
                                                            }
                                                            if (!b) {
                                                                var S = s.getAttribute("clip-path");
                                                                if (S) {
                                                                    var A = r._g.doc.getElementById(S.replace(/(^url\(#|\)$)/g, h));
                                                                    A && A.parentNode.removeChild(A), f(s, {
                                                                        "clip-path": h
                                                                    }), delete o.clip
                                                                }
                                                            }
                                                            break;
                                                        case "path":
                                                            "path" == o.type && (f(s, {
                                                                d: b ? c.path = r._pathToAbsolute(b) : "M0,0"
                                                            }), o._.dirty = 1, o._.arrows && ("startString" in o._.arrows && x(o, o._.arrows.startString), "endString" in o._.arrows && x(o, o._.arrows.endString, 1)));
                                                            break;
                                                        case "width":
                                                            if (s.setAttribute(m, b), o._.dirty = 1, !c.fx) break;
                                                            m = "x", b = c.x;
                                                        case "x":
                                                            c.fx && (b = -c.x - (c.width || 0));
                                                        case "rx":
                                                            if ("rx" == m && "rect" == o.type) break;
                                                        case "cx":
                                                            s.setAttribute(m, b), o.pattern && w(o), o._.dirty = 1;
                                                            break;
                                                        case "height":
                                                            if (s.setAttribute(m, b), o._.dirty = 1, !c.fy) break;
                                                            m = "y", b = c.y;
                                                        case "y":
                                                            c.fy && (b = -c.y - (c.height || 0));
                                                        case "ry":
                                                            if ("ry" == m && "rect" == o.type) break;
                                                        case "cy":
                                                            s.setAttribute(m, b), o.pattern && w(o), o._.dirty = 1;
                                                            break;
                                                        case "r":
                                                            "rect" == o.type ? f(s, {
                                                                rx: b,
                                                                ry: b
                                                            }) : s.setAttribute(m, b), o._.dirty = 1;
                                                            break;
                                                        case "src":
                                                            "image" == o.type && s.setAttributeNS(u, "href", b);
                                                            break;
                                                        case "stroke-width":
                                                            1 == o._.sx && 1 == o._.sy || (b /= i(d(o._.sx), d(o._.sy)) || 1), o.paper._vbSize && (b *= o.paper._vbSize), s.setAttribute(m, b), c["stroke-dasharray"] && v(o, c["stroke-dasharray"], n), o._.arrows && ("startString" in o._.arrows && x(o, o._.arrows.startString), "endString" in o._.arrows && x(o, o._.arrows.endString, 1));
                                                            break;
                                                        case "stroke-dasharray":
                                                            v(o, b, n);
                                                            break;
                                                        case "fill":
                                                            var P = t(b).match(r._ISURL);
                                                            if (P) {
                                                                C = f("pattern");
                                                                var L = f("image");
                                                                C.id = r.createUUID(), f(C, {
                                                                        x: 0,
                                                                        y: 0,
                                                                        patternUnits: "userSpaceOnUse",
                                                                        height: 1,
                                                                        width: 1
                                                                    }), f(L, {
                                                                        x: 0,
                                                                        y: 0,
                                                                        "xlink:href": P[1]
                                                                    }), C.appendChild(L),
                                                                    function(e) {
                                                                        r._preload(P[1], function() {
                                                                            var t = this.offsetWidth,
                                                                                r = this.offsetHeight;
                                                                            f(e, {
                                                                                width: t,
                                                                                height: r
                                                                            }), f(L, {
                                                                                width: t,
                                                                                height: r
                                                                            }), o.paper.safari()
                                                                        })
                                                                    }(C), o.paper.defs.appendChild(C), f(s, {
                                                                        fill: "url(#" + C.id + ")"
                                                                    }), o.pattern = C, o.pattern && w(o);
                                                                break
                                                            }
                                                            var M = r.getRGB(b);
                                                            if (M.error) {
                                                                if (("circle" == o.type || "ellipse" == o.type || "r" != t(b).charAt()) && g(o, b)) {
                                                                    if ("opacity" in c || "fill-opacity" in c) {
                                                                        var B = r._g.doc.getElementById(s.getAttribute("fill").replace(/^url\(#|\)$/g, h));
                                                                        if (B) {
                                                                            var O = B.getElementsByTagName("stop");
                                                                            f(O[O.length - 1], {
                                                                                "stop-opacity": ("opacity" in c ? c.opacity : 1) * ("fill-opacity" in c ? c["fill-opacity"] : 1)
                                                                            })
                                                                        }
                                                                    }
                                                                    c.gradient = b, c.fill = "none";
                                                                    break
                                                                }
                                                            } else delete n.gradient, delete c.gradient, !r.is(c.opacity, "undefined") && r.is(n.opacity, "undefined") && f(s, {
                                                                opacity: c.opacity
                                                            }), !r.is(c["fill-opacity"], "undefined") && r.is(n["fill-opacity"], "undefined") && f(s, {
                                                                "fill-opacity": c["fill-opacity"]
                                                            });
                                                            M[e]("opacity") && f(s, {
                                                                "fill-opacity": M.opacity > 1 ? M.opacity / 100 : M.opacity
                                                            });
                                                        case "stroke":
                                                            M = r.getRGB(b), s.setAttribute(m, M.hex), "stroke" == m && M[e]("opacity") && f(s, {
                                                                "stroke-opacity": M.opacity > 1 ? M.opacity / 100 : M.opacity
                                                            }), "stroke" == m && o._.arrows && ("startString" in o._.arrows && x(o, o._.arrows.startString), "endString" in o._.arrows && x(o, o._.arrows.endString, 1));
                                                            break;
                                                        case "gradient":
                                                            ("circle" == o.type || "ellipse" == o.type || "r" != t(b).charAt()) && g(o, b);
                                                            break;
                                                        case "opacity":
                                                            c.gradient && !c[e]("stroke-opacity") && f(s, {
                                                                "stroke-opacity": b > 1 ? b / 100 : b
                                                            });
                                                        case "fill-opacity":
                                                            if (c.gradient) {
                                                                (B = r._g.doc.getElementById(s.getAttribute("fill").replace(/^url\(#|\)$/g, h))) && (O = B.getElementsByTagName("stop"), f(O[O.length - 1], {
                                                                    "stop-opacity": b
                                                                }));
                                                                break
                                                            }
                                                        default:
                                                            "font-size" == m && (b = a(b, 10) + "px");
                                                            var I = m.replace(/(\-.)/g, function(e) {
                                                                return e.substring(1).toUpperCase()
                                                            });
                                                            s.style[I] = b, o._.dirty = 1, s.setAttribute(m, b)
                                                    }
                                                }
                                            _(o, n), s.style.visibility = p
                                        },
                                        _ = function(o, n) {
                                            if ("text" == o.type && (n[e]("text") || n[e]("font") || n[e]("font-size") || n[e]("x") || n[e]("y"))) {
                                                var i = o.attrs,
                                                    d = o.node,
                                                    s = d.firstChild ? a(r._g.doc.defaultView.getComputedStyle(d.firstChild, h).getPropertyValue("font-size"), 10) : 10;
                                                if (n[e]("text")) {
                                                    for (i.text = n.text; d.firstChild;) d.removeChild(d.firstChild);
                                                    for (var l, c = t(n.text).split("\n"), p = [], u = 0, m = c.length; u < m; u++) l = f("tspan"), u && f(l, {
                                                        dy: 1.2 * s,
                                                        x: i.x
                                                    }), l.appendChild(r._g.doc.createTextNode(c[u])), d.appendChild(l), p[u] = l
                                                } else
                                                    for (u = 0, m = (p = d.getElementsByTagName("tspan")).length; u < m; u++) u ? f(p[u], {
                                                        dy: 1.2 * s,
                                                        x: i.x
                                                    }) : f(p[0], {
                                                        dy: 0
                                                    });
                                                f(d, {
                                                    x: i.x,
                                                    y: i.y
                                                }), o._.dirty = 1;
                                                var b = o._getBBox(),
                                                    g = i.y - (b.y + b.height / 2);
                                                g && r.is(g, "finite") && f(p[0], {
                                                    dy: g
                                                })
                                            }
                                        },
                                        T = function(e, t) {
                                            this[0] = this.node = e, e.raphael = !0, this.id = r._oid++, e.raphaelid = this.id, this.matrix = r.matrix(), this.realPath = null, this.paper = t, this.attrs = this.attrs || {}, this._ = {
                                                transform: [],
                                                sx: 1,
                                                sy: 1,
                                                deg: 0,
                                                dx: 0,
                                                dy: 0,
                                                dirty: 1
                                            }, !t.bottom && (t.bottom = this), this.prev = t.top, t.top && (t.top.next = this), t.top = this, this.next = null
                                        },
                                        E = r.el;
                                    T.prototype = E, E.constructor = T, r._engine.path = function(e, t) {
                                        var r = f("path");
                                        t.canvas && t.canvas.appendChild(r);
                                        var o = new T(r, t);
                                        return o.type = "path", k(o, {
                                            fill: "none",
                                            stroke: "#000",
                                            path: e
                                        }), o
                                    }, E.rotate = function(e, r, a) {
                                        if (this.removed) return this;
                                        if ((e = t(e).split(l)).length - 1 && (r = o(e[1]), a = o(e[2])), e = o(e[0]), null == a && (r = a), null == r || null == a) {
                                            var n = this.getBBox(1);
                                            r = n.x + n.width / 2, a = n.y + n.height / 2
                                        }
                                        return this.transform(this._.transform.concat([
                                            ["r", e, r, a]
                                        ])), this
                                    }, E.scale = function(e, r, a, n) {
                                        if (this.removed) return this;
                                        if ((e = t(e).split(l)).length - 1 && (r = o(e[1]), a = o(e[2]), n = o(e[3])), e = o(e[0]), null == r && (r = e), null == n && (a = n), null == a || null == n) var i = this.getBBox(1);
                                        return a = null == a ? i.x + i.width / 2 : a, n = null == n ? i.y + i.height / 2 : n, this.transform(this._.transform.concat([
                                            ["s", e, r, a, n]
                                        ])), this
                                    }, E.translate = function(e, r) {
                                        return this.removed ? this : ((e = t(e).split(l)).length - 1 && (r = o(e[1])), e = o(e[0]) || 0, r = +r || 0, this.transform(this._.transform.concat([
                                            ["t", e, r]
                                        ])), this)
                                    }, E.transform = function(t) {
                                        var o = this._;
                                        if (null == t) return o.transform;
                                        if (r._extractTransform(this, t), this.clip && f(this.clip, {
                                                transform: this.matrix.invert()
                                            }), this.pattern && w(this), this.node && f(this.node, {
                                                transform: this.matrix
                                            }), 1 != o.sx || 1 != o.sy) {
                                            var a = this.attrs[e]("stroke-width") ? this.attrs["stroke-width"] : 1;
                                            this.attr({
                                                "stroke-width": a
                                            })
                                        }
                                        return this
                                    }, E.hide = function() {
                                        return !this.removed && this.paper.safari(this.node.style.display = "none"), this
                                    }, E.show = function() {
                                        return !this.removed && this.paper.safari(this.node.style.display = ""), this
                                    }, E.remove = function() {
                                        if (!this.removed && this.node.parentNode) {
                                            var e = this.paper;
                                            for (var t in e.__set__ && e.__set__.exclude(this), c.unbind("raphael.*.*." + this.id), this.gradient && e.defs.removeChild(this.gradient), r._tear(this, e), "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node), this) this[t] = "function" == typeof this[t] ? r._removedFactory(t) : null;
                                            this.removed = !0
                                        }
                                    }, E._getBBox = function() {
                                        if ("none" == this.node.style.display) {
                                            this.show();
                                            var e = !0
                                        }
                                        var t = {};
                                        try {
                                            t = this.node.getBBox()
                                        } catch (e) {} finally {
                                            t = t || {}
                                        }
                                        return e && this.hide(), t
                                    }, E.attr = function(t, o) {
                                        if (this.removed) return this;
                                        if (null == t) {
                                            var a = {};
                                            for (var n in this.attrs) this.attrs[e](n) && (a[n] = this.attrs[n]);
                                            return a.gradient && "none" == a.fill && (a.fill = a.gradient) && delete a.gradient, a.transform = this._.transform, a
                                        }
                                        if (null == o && r.is(t, "string")) {
                                            if ("fill" == t && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                                            if ("transform" == t) return this._.transform;
                                            for (var i = t.split(l), d = {}, s = 0, h = i.length; s < h; s++)(t = i[s]) in this.attrs ? d[t] = this.attrs[t] : r.is(this.paper.customAttributes[t], "function") ? d[t] = this.paper.customAttributes[t].def : d[t] = r._availableAttrs[t];
                                            return h - 1 ? d : d[i[0]]
                                        }
                                        if (null == o && r.is(t, "array")) {
                                            for (d = {}, s = 0, h = t.length; s < h; s++) d[t[s]] = this.attr(t[s]);
                                            return d
                                        }
                                        if (null != o) {
                                            var p = {};
                                            p[t] = o
                                        } else null != t && r.is(t, "object") && (p = t);
                                        for (var u in p) c("raphael.attr." + u + "." + this.id, this, p[u]);
                                        for (u in this.paper.customAttributes)
                                            if (this.paper.customAttributes[e](u) && p[e](u) && r.is(this.paper.customAttributes[u], "function")) {
                                                var m = this.paper.customAttributes[u].apply(this, [].concat(p[u]));
                                                for (var b in this.attrs[u] = p[u], m) m[e](b) && (p[b] = m[b])
                                            }
                                        return k(this, p), this
                                    }, E.toFront = function() {
                                        if (this.removed) return this;
                                        "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
                                        var e = this.paper;
                                        return e.top != this && r._tofront(this, e), this
                                    }, E.toBack = function() {
                                        if (this.removed) return this;
                                        var e = this.node.parentNode;
                                        "a" == e.tagName.toLowerCase() ? e.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : e.firstChild != this.node && e.insertBefore(this.node, this.node.parentNode.firstChild), r._toback(this, this.paper);
                                        this.paper;
                                        return this
                                    }, E.insertAfter = function(e) {
                                        if (this.removed) return this;
                                        var t = e.node || e[e.length - 1].node;
                                        return t.nextSibling ? t.parentNode.insertBefore(this.node, t.nextSibling) : t.parentNode.appendChild(this.node), r._insertafter(this, e, this.paper), this
                                    }, E.insertBefore = function(e) {
                                        if (this.removed) return this;
                                        var t = e.node || e[0].node;
                                        return t.parentNode.insertBefore(this.node, t), r._insertbefore(this, e, this.paper), this
                                    }, E.blur = function(e) {
                                        var t = this;
                                        if (0 != +e) {
                                            var o = f("filter"),
                                                a = f("feGaussianBlur");
                                            t.attrs.blur = e, o.id = r.createUUID(), f(a, {
                                                stdDeviation: +e || 1.5
                                            }), o.appendChild(a), t.paper.defs.appendChild(o), t._blur = o, f(t.node, {
                                                filter: "url(#" + o.id + ")"
                                            })
                                        } else t._blur && (t._blur.parentNode.removeChild(t._blur), delete t._blur, delete t.attrs.blur), t.node.removeAttribute("filter");
                                        return t
                                    }, r._engine.circle = function(e, t, r, o) {
                                        var a = f("circle");
                                        e.canvas && e.canvas.appendChild(a);
                                        var n = new T(a, e);
                                        return n.attrs = {
                                            cx: t,
                                            cy: r,
                                            r: o,
                                            fill: "none",
                                            stroke: "#000"
                                        }, n.type = "circle", f(a, n.attrs), n
                                    }, r._engine.rect = function(e, t, r, o, a, n) {
                                        var i = f("rect");
                                        e.canvas && e.canvas.appendChild(i);
                                        var d = new T(i, e);
                                        return d.attrs = {
                                            x: t,
                                            y: r,
                                            width: o,
                                            height: a,
                                            r: n || 0,
                                            rx: n || 0,
                                            ry: n || 0,
                                            fill: "none",
                                            stroke: "#000"
                                        }, d.type = "rect", f(i, d.attrs), d
                                    }, r._engine.ellipse = function(e, t, r, o, a) {
                                        var n = f("ellipse");
                                        e.canvas && e.canvas.appendChild(n);
                                        var i = new T(n, e);
                                        return i.attrs = {
                                            cx: t,
                                            cy: r,
                                            rx: o,
                                            ry: a,
                                            fill: "none",
                                            stroke: "#000"
                                        }, i.type = "ellipse", f(n, i.attrs), i
                                    }, r._engine.image = function(e, t, r, o, a, n) {
                                        var i = f("image");
                                        f(i, {
                                            x: r,
                                            y: o,
                                            width: a,
                                            height: n,
                                            preserveAspectRatio: "none"
                                        }), i.setAttributeNS(u, "href", t), e.canvas && e.canvas.appendChild(i);
                                        var d = new T(i, e);
                                        return d.attrs = {
                                            x: r,
                                            y: o,
                                            width: a,
                                            height: n,
                                            src: t
                                        }, d.type = "image", d
                                    }, r._engine.text = function(e, t, o, a) {
                                        var n = f("text");
                                        e.canvas && e.canvas.appendChild(n);
                                        var i = new T(n, e);
                                        return i.attrs = {
                                            x: t,
                                            y: o,
                                            "text-anchor": "middle",
                                            text: a,
                                            font: r._availableAttrs.font,
                                            stroke: "none",
                                            fill: "#000"
                                        }, i.type = "text", k(i, i.attrs), i
                                    }, r._engine.setSize = function(e, t) {
                                        return this.width = e || this.width, this.height = t || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this
                                    }, r._engine.create = function() {
                                        var e = r._getContainer.apply(0, arguments),
                                            t = e && e.container,
                                            o = e.x,
                                            a = e.y,
                                            n = e.width,
                                            i = e.height;
                                        if (!t) throw new Error("SVG container not found.");
                                        var d, s = f("svg"),
                                            l = "overflow:hidden;";
                                        return o = o || 0, a = a || 0, n = n || 512, f(s, {
                                            height: i = i || 342,
                                            version: 1.1,
                                            width: n,
                                            xmlns: "http://www.w3.org/2000/svg"
                                        }), 1 == t ? (s.style.cssText = l + "position:absolute;left:" + o + "px;top:" + a + "px", r._g.doc.body.appendChild(s), d = 1) : (s.style.cssText = l + "position:relative", t.firstChild ? t.insertBefore(s, t.firstChild) : t.appendChild(s)), (t = new r._Paper).width = n, t.height = i, t.canvas = s, t.clear(), t._left = t._top = 0, d && (t.renderfix = function() {}), t.renderfix(), t
                                    }, r._engine.setViewBox = function(e, t, r, o, a) {
                                        c("raphael.setViewBox", this, this._viewBox, [e, t, r, o, a]);
                                        var n, d, s = this.getSize(),
                                            l = i(r / s.width, o / s.height),
                                            h = this.top,
                                            u = a ? "meet" : "xMinYMin";
                                        for (null == e ? (this._vbSize && (l = 1), delete this._vbSize, n = "0 0 " + this.width + p + this.height) : (this._vbSize = l, n = e + p + t + p + r + p + o), f(this.canvas, {
                                                viewBox: n,
                                                preserveAspectRatio: u
                                            }); l && h;) d = "stroke-width" in h.attrs ? h.attrs["stroke-width"] : 1, h.attr({
                                            "stroke-width": d
                                        }), h._.dirty = 1, h._.dirtyT = 1, h = h.prev;
                                        return this._viewBox = [e, t, r, o, !!a], this
                                    }, r.prototype.renderfix = function() {
                                        var e, t = this.canvas,
                                            r = t.style;
                                        try {
                                            e = t.getScreenCTM() || t.createSVGMatrix()
                                        } catch (r) {
                                            e = t.createSVGMatrix()
                                        }
                                        var o = -e.e % 1,
                                            a = -e.f % 1;
                                        (o || a) && (o && (this._left = (this._left + o) % 1, r.left = this._left + "px"), a && (this._top = (this._top + a) % 1, r.top = this._top + "px"))
                                    }, r.prototype.clear = function() {
                                        r.eve("raphael.clear", this);
                                        for (var e = this.canvas; e.firstChild;) e.removeChild(e.firstChild);
                                        this.bottom = this.top = null, (this.desc = f("desc")).appendChild(r._g.doc.createTextNode("Created with Raphaël " + r.version)), e.appendChild(this.desc), e.appendChild(this.defs = f("defs"))
                                    }, r.prototype.remove = function() {
                                        for (var e in c("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this) this[e] = "function" == typeof this[e] ? r._removedFactory(e) : null
                                    };
                                    var C = r.st;
                                    for (var R in E) E[e](R) && !C[e](R) && (C[R] = function(e) {
                                        return function() {
                                            var t = arguments;
                                            return this.forEach(function(r) {
                                                r[e].apply(r, t)
                                            })
                                        }
                                    }(R))
                                }
                            }(),
                            function() {
                                if (r.vml) {
                                    var e = "hasOwnProperty",
                                        t = String,
                                        o = parseFloat,
                                        a = Math,
                                        n = a.round,
                                        i = a.max,
                                        d = a.min,
                                        s = a.abs,
                                        l = /[, ]+/,
                                        c = r.eve,
                                        h = " ",
                                        p = "",
                                        u = {
                                            M: "m",
                                            L: "l",
                                            C: "c",
                                            Z: "x",
                                            m: "t",
                                            l: "r",
                                            c: "v",
                                            z: "x"
                                        },
                                        m = /([clmz]),?([^clmz]*)/gi,
                                        b = / progid:\S+Blur\([^\)]+\)/g,
                                        f = /-?[^,\s-]+/g,
                                        g = "position:absolute;left:0;top:0;width:1px;height:1px",
                                        w = 21600,
                                        x = {
                                            path: 1,
                                            rect: 1,
                                            image: 1
                                        },
                                        y = {
                                            circle: 1,
                                            ellipse: 1
                                        },
                                        v = function(e, t, o) {
                                            var a = r.matrix();
                                            return a.rotate(-e, .5, .5), {
                                                dx: a.x(t, o),
                                                dy: a.y(t, o)
                                            }
                                        },
                                        k = function(e, t, r, o, a, n) {
                                            var i = e._,
                                                d = e.matrix,
                                                l = i.fillpos,
                                                c = e.node,
                                                p = c.style,
                                                u = 1,
                                                m = "",
                                                b = w / t,
                                                f = w / r;
                                            if (p.visibility = "hidden", t && r) {
                                                if (c.coordsize = s(b) + h + s(f), p.rotation = n * (t * r < 0 ? -1 : 1), n) {
                                                    var g = v(n, o, a);
                                                    o = g.dx, a = g.dy
                                                }
                                                if (t < 0 && (m += "x"), r < 0 && (m += " y") && (u = -1), p.flip = m, c.coordorigin = o * -b + h + a * -f, l || i.fillsize) {
                                                    var x = c.getElementsByTagName("fill");
                                                    x = x && x[0], c.removeChild(x), l && (g = v(n, d.x(l[0], l[1]), d.y(l[0], l[1])), x.position = g.dx * u + h + g.dy * u), i.fillsize && (x.size = i.fillsize[0] * s(t) + h + i.fillsize[1] * s(r)), c.appendChild(x)
                                                }
                                                p.visibility = "visible"
                                            }
                                        };
                                    r.toString = function() {
                                        return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
                                    };
                                    var _, T = function(e, r, o) {
                                            for (var a = t(r).toLowerCase().split("-"), n = o ? "end" : "start", i = a.length, d = "classic", s = "medium", l = "medium"; i--;) switch (a[i]) {
                                                case "block":
                                                case "classic":
                                                case "oval":
                                                case "diamond":
                                                case "open":
                                                case "none":
                                                    d = a[i];
                                                    break;
                                                case "wide":
                                                case "narrow":
                                                    l = a[i];
                                                    break;
                                                case "long":
                                                case "short":
                                                    s = a[i]
                                            }
                                            var c = e.node.getElementsByTagName("stroke")[0];
                                            c[n + "arrow"] = d, c[n + "arrowlength"] = s, c[n + "arrowwidth"] = l
                                        },
                                        E = function(a, s) {
                                            a.attrs = a.attrs || {};
                                            var c = a.node,
                                                b = a.attrs,
                                                g = c.style,
                                                v = x[a.type] && (s.x != b.x || s.y != b.y || s.width != b.width || s.height != b.height || s.cx != b.cx || s.cy != b.cy || s.rx != b.rx || s.ry != b.ry || s.r != b.r),
                                                E = y[a.type] && (b.cx != s.cx || b.cy != s.cy || b.r != s.r || b.rx != s.rx || b.ry != s.ry),
                                                R = a;
                                            for (var S in s) s[e](S) && (b[S] = s[S]);
                                            if (v && (b.path = r._getPath[a.type](a), a._.dirty = 1), s.href && (c.href = s.href), s.title && (c.title = s.title), s.target && (c.target = s.target), s.cursor && (g.cursor = s.cursor), "blur" in s && a.blur(s.blur), (s.path && "path" == a.type || v) && (c.path = function(e) {
                                                    var o = /[ahqstv]/gi,
                                                        a = r._pathToAbsolute;
                                                    if (t(e).match(o) && (a = r._path2curve), o = /[clmz]/g, a == r._pathToAbsolute && !t(e).match(o)) {
                                                        var i = t(e).replace(m, function(e, t, r) {
                                                            var o = [],
                                                                a = "m" == t.toLowerCase(),
                                                                i = u[t];
                                                            return r.replace(f, function(e) {
                                                                a && 2 == o.length && (i += o + u["m" == t ? "l" : "L"], o = []), o.push(n(e * w))
                                                            }), i + o
                                                        });
                                                        return i
                                                    }
                                                    var d, s, l = a(e);
                                                    i = [];
                                                    for (var c = 0, b = l.length; c < b; c++) {
                                                        d = l[c], "z" == (s = l[c][0].toLowerCase()) && (s = "x");
                                                        for (var g = 1, x = d.length; g < x; g++) s += n(d[g] * w) + (g != x - 1 ? "," : p);
                                                        i.push(s)
                                                    }
                                                    return i.join(h)
                                                }(~t(b.path).toLowerCase().indexOf("r") ? r._pathToAbsolute(b.path) : b.path), "image" == a.type && (a._.fillpos = [b.x, b.y], a._.fillsize = [b.width, b.height], k(a, 1, 1, 0, 0, 0))), "transform" in s && a.transform(s.transform), E) {
                                                var A = +b.cx,
                                                    P = +b.cy,
                                                    L = +b.rx || +b.r || 0,
                                                    M = +b.ry || +b.r || 0;
                                                c.path = r.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", n((A - L) * w), n((P - M) * w), n((A + L) * w), n((P + M) * w), n(A * w)), a._.dirty = 1
                                            }
                                            if ("clip-rect" in s) {
                                                var B = t(s["clip-rect"]).split(l);
                                                if (4 == B.length) {
                                                    B[2] = +B[2] + +B[0], B[3] = +B[3] + +B[1];
                                                    var O = c.clipRect || r._g.doc.createElement("div"),
                                                        I = O.style;
                                                    I.clip = r.format("rect({1}px {2}px {3}px {0}px)", B), c.clipRect || (I.position = "absolute", I.top = 0, I.left = 0, I.width = a.paper.width + "px", I.height = a.paper.height + "px", c.parentNode.insertBefore(O, c), O.appendChild(c), c.clipRect = O)
                                                }
                                                s["clip-rect"] || c.clipRect && (c.clipRect.style.clip = "auto")
                                            }
                                            if (a.textpath) {
                                                var N = a.textpath.style;
                                                s.font && (N.font = s.font), s["font-family"] && (N.fontFamily = '"' + s["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, p) + '"'), s["font-size"] && (N.fontSize = s["font-size"]), s["font-weight"] && (N.fontWeight = s["font-weight"]), s["font-style"] && (N.fontStyle = s["font-style"])
                                            }
                                            if ("arrow-start" in s && T(R, s["arrow-start"]), "arrow-end" in s && T(R, s["arrow-end"], 1), null != s.opacity || null != s["stroke-width"] || null != s.fill || null != s.src || null != s.stroke || null != s["stroke-width"] || null != s["stroke-opacity"] || null != s["fill-opacity"] || null != s["stroke-dasharray"] || null != s["stroke-miterlimit"] || null != s["stroke-linejoin"] || null != s["stroke-linecap"]) {
                                                var D = c.getElementsByTagName("fill");
                                                if (!(D = D && D[0]) && (D = _("fill")), "image" == a.type && s.src && (D.src = s.src), s.fill && (D.on = !0), null != D.on && "none" != s.fill && null !== s.fill || (D.on = !1), D.on && s.fill) {
                                                    var F = t(s.fill).match(r._ISURL);
                                                    if (F) {
                                                        D.parentNode == c && c.removeChild(D), D.rotate = !0, D.src = F[1], D.type = "tile";
                                                        var H = a.getBBox(1);
                                                        D.position = H.x + h + H.y, a._.fillpos = [H.x, H.y], r._preload(F[1], function() {
                                                            a._.fillsize = [this.offsetWidth, this.offsetHeight]
                                                        })
                                                    } else D.color = r.getRGB(s.fill).hex, D.src = p, D.type = "solid", r.getRGB(s.fill).error && (R.type in {
                                                        circle: 1,
                                                        ellipse: 1
                                                    } || "r" != t(s.fill).charAt()) && C(R, s.fill, D) && (b.fill = "none", b.gradient = s.fill, D.rotate = !1)
                                                }
                                                if ("fill-opacity" in s || "opacity" in s) {
                                                    var V = ((+b["fill-opacity"] + 1 || 2) - 1) * ((+b.opacity + 1 || 2) - 1) * ((+r.getRGB(s.fill).o + 1 || 2) - 1);
                                                    V = d(i(V, 0), 1), D.opacity = V, D.src && (D.color = "none")
                                                }
                                                c.appendChild(D);
                                                var z = c.getElementsByTagName("stroke") && c.getElementsByTagName("stroke")[0],
                                                    G = !1;
                                                !z && (G = z = _("stroke")), (s.stroke && "none" != s.stroke || s["stroke-width"] || null != s["stroke-opacity"] || s["stroke-dasharray"] || s["stroke-miterlimit"] || s["stroke-linejoin"] || s["stroke-linecap"]) && (z.on = !0), ("none" == s.stroke || null === s.stroke || null == z.on || 0 == s.stroke || 0 == s["stroke-width"]) && (z.on = !1);
                                                var U = r.getRGB(s.stroke);
                                                z.on && s.stroke && (z.color = U.hex), V = ((+b["stroke-opacity"] + 1 || 2) - 1) * ((+b.opacity + 1 || 2) - 1) * ((+U.o + 1 || 2) - 1);
                                                var j = .75 * (o(s["stroke-width"]) || 1);
                                                if (V = d(i(V, 0), 1), null == s["stroke-width"] && (j = b["stroke-width"]), s["stroke-width"] && (z.weight = j), j && j < 1 && (V *= j) && (z.weight = 1), z.opacity = V, s["stroke-linejoin"] && (z.joinstyle = s["stroke-linejoin"] || "miter"), z.miterlimit = s["stroke-miterlimit"] || 8, s["stroke-linecap"] && (z.endcap = "butt" == s["stroke-linecap"] ? "flat" : "square" == s["stroke-linecap"] ? "square" : "round"), s["stroke-dasharray"]) {
                                                    var Y = {
                                                        "-": "shortdash",
                                                        ".": "shortdot",
                                                        "-.": "shortdashdot",
                                                        "-..": "shortdashdotdot",
                                                        ". ": "dot",
                                                        "- ": "dash",
                                                        "--": "longdash",
                                                        "- .": "dashdot",
                                                        "--.": "longdashdot",
                                                        "--..": "longdashdotdot"
                                                    };
                                                    z.dashstyle = Y[e](s["stroke-dasharray"]) ? Y[s["stroke-dasharray"]] : p
                                                }
                                                G && c.appendChild(z)
                                            }
                                            if ("text" == R.type) {
                                                R.paper.canvas.style.display = p;
                                                var W = R.paper.span,
                                                    q = b.font && b.font.match(/\d+(?:\.\d*)?(?=px)/);
                                                g = W.style, b.font && (g.font = b.font), b["font-family"] && (g.fontFamily = b["font-family"]), b["font-weight"] && (g.fontWeight = b["font-weight"]), b["font-style"] && (g.fontStyle = b["font-style"]), q = o(b["font-size"] || q && q[0]) || 10, g.fontSize = 100 * q + "px", R.textpath.string && (W.innerHTML = t(R.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                                                var $ = W.getBoundingClientRect();
                                                R.W = b.w = ($.right - $.left) / 100, R.H = b.h = ($.bottom - $.top) / 100, R.X = b.x, R.Y = b.y + R.H / 2, ("x" in s || "y" in s) && (R.path.v = r.format("m{0},{1}l{2},{1}", n(b.x * w), n(b.y * w), n(b.x * w) + 1));
                                                for (var K = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], Q = 0, X = K.length; Q < X; Q++)
                                                    if (K[Q] in s) {
                                                        R._.dirty = 1;
                                                        break
                                                    }
                                                switch (b["text-anchor"]) {
                                                    case "start":
                                                        R.textpath.style["v-text-align"] = "left", R.bbx = R.W / 2;
                                                        break;
                                                    case "end":
                                                        R.textpath.style["v-text-align"] = "right", R.bbx = -R.W / 2;
                                                        break;
                                                    default:
                                                        R.textpath.style["v-text-align"] = "center", R.bbx = 0
                                                }
                                                R.textpath.style["v-text-kern"] = !0
                                            }
                                        },
                                        C = function(e, n, i) {
                                            e.attrs = e.attrs || {};
                                            e.attrs;
                                            var d = Math.pow,
                                                s = "linear",
                                                l = ".5 .5";
                                            if (e.attrs.gradient = n, n = (n = t(n).replace(r._radial_gradient, function(e, t, r) {
                                                    return s = "radial", t && r && (t = o(t), r = o(r), d(t - .5, 2) + d(r - .5, 2) > .25 && (r = a.sqrt(.25 - d(t - .5, 2)) * (2 * (r > .5) - 1) + .5), l = t + h + r), p
                                                })).split(/\s*\-\s*/), "linear" == s) {
                                                var c = n.shift();
                                                if (c = -o(c), isNaN(c)) return null
                                            }
                                            var u = r._parseDots(n);
                                            if (!u) return null;
                                            if (e = e.shape || e.node, u.length) {
                                                e.removeChild(i), i.on = !0, i.method = "none", i.color = u[0].color, i.color2 = u[u.length - 1].color;
                                                for (var m = [], b = 0, f = u.length; b < f; b++) u[b].offset && m.push(u[b].offset + h + u[b].color);
                                                i.colors = m.length ? m.join() : "0% " + i.color, "radial" == s ? (i.type = "gradientTitle", i.focus = "100%", i.focussize = "0 0", i.focusposition = l, i.angle = 0) : (i.type = "gradient", i.angle = (270 - c) % 360), e.appendChild(i)
                                            }
                                            return 1
                                        },
                                        R = function(e, t) {
                                            this[0] = this.node = e, e.raphael = !0, this.id = r._oid++, e.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = t, this.matrix = r.matrix(), this._ = {
                                                transform: [],
                                                sx: 1,
                                                sy: 1,
                                                dx: 0,
                                                dy: 0,
                                                deg: 0,
                                                dirty: 1,
                                                dirtyT: 1
                                            }, !t.bottom && (t.bottom = this), this.prev = t.top, t.top && (t.top.next = this), t.top = this, this.next = null
                                        },
                                        S = r.el;
                                    R.prototype = S, S.constructor = R, S.transform = function(e) {
                                        if (null == e) return this._.transform;
                                        var o, a = this.paper._viewBoxShift,
                                            n = a ? "s" + [a.scale, a.scale] + "-1-1t" + [a.dx, a.dy] : p;
                                        a && (o = e = t(e).replace(/\.{3}|\u2026/g, this._.transform || p)), r._extractTransform(this, n + e);
                                        var i, d = this.matrix.clone(),
                                            s = this.skew,
                                            l = this.node,
                                            c = ~t(this.attrs.fill).indexOf("-"),
                                            u = !t(this.attrs.fill).indexOf("url(");
                                        if (d.translate(1, 1), u || c || "image" == this.type)
                                            if (s.matrix = "1 0 0 1", s.offset = "0 0", i = d.split(), c && i.noRotation || !i.isSimple) {
                                                l.style.filter = d.toFilter();
                                                var m = this.getBBox(),
                                                    b = this.getBBox(1),
                                                    f = m.x - b.x,
                                                    g = m.y - b.y;
                                                l.coordorigin = f * -w + h + g * -w, k(this, 1, 1, f, g, 0)
                                            } else l.style.filter = p, k(this, i.scalex, i.scaley, i.dx, i.dy, i.rotate);
                                        else l.style.filter = p, s.matrix = t(d), s.offset = d.offset();
                                        return null != o && (this._.transform = o, r._extractTransform(this, o)), this
                                    }, S.rotate = function(e, r, a) {
                                        if (this.removed) return this;
                                        if (null != e) {
                                            if ((e = t(e).split(l)).length - 1 && (r = o(e[1]), a = o(e[2])), e = o(e[0]), null == a && (r = a), null == r || null == a) {
                                                var n = this.getBBox(1);
                                                r = n.x + n.width / 2, a = n.y + n.height / 2
                                            }
                                            return this._.dirtyT = 1, this.transform(this._.transform.concat([
                                                ["r", e, r, a]
                                            ])), this
                                        }
                                    }, S.translate = function(e, r) {
                                        return this.removed ? this : ((e = t(e).split(l)).length - 1 && (r = o(e[1])), e = o(e[0]) || 0, r = +r || 0, this._.bbox && (this._.bbox.x += e, this._.bbox.y += r), this.transform(this._.transform.concat([
                                            ["t", e, r]
                                        ])), this)
                                    }, S.scale = function(e, r, a, n) {
                                        if (this.removed) return this;
                                        if ((e = t(e).split(l)).length - 1 && (r = o(e[1]), a = o(e[2]), n = o(e[3]), isNaN(a) && (a = null), isNaN(n) && (n = null)), e = o(e[0]), null == r && (r = e), null == n && (a = n), null == a || null == n) var i = this.getBBox(1);
                                        return a = null == a ? i.x + i.width / 2 : a, n = null == n ? i.y + i.height / 2 : n, this.transform(this._.transform.concat([
                                            ["s", e, r, a, n]
                                        ])), this._.dirtyT = 1, this
                                    }, S.hide = function() {
                                        return !this.removed && (this.node.style.display = "none"), this
                                    }, S.show = function() {
                                        return !this.removed && (this.node.style.display = p), this
                                    }, S._getBBox = function() {
                                        return this.removed ? {} : {
                                            x: this.X + (this.bbx || 0) - this.W / 2,
                                            y: this.Y - this.H,
                                            width: this.W,
                                            height: this.H
                                        }
                                    }, S.remove = function() {
                                        if (!this.removed && this.node.parentNode) {
                                            for (var e in this.paper.__set__ && this.paper.__set__.exclude(this), r.eve.unbind("raphael.*.*." + this.id), r._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape), this) this[e] = "function" == typeof this[e] ? r._removedFactory(e) : null;
                                            this.removed = !0
                                        }
                                    }, S.attr = function(t, o) {
                                        if (this.removed) return this;
                                        if (null == t) {
                                            var a = {};
                                            for (var n in this.attrs) this.attrs[e](n) && (a[n] = this.attrs[n]);
                                            return a.gradient && "none" == a.fill && (a.fill = a.gradient) && delete a.gradient, a.transform = this._.transform, a
                                        }
                                        if (null == o && r.is(t, "string")) {
                                            if ("fill" == t && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                                            for (var i = t.split(l), d = {}, s = 0, h = i.length; s < h; s++)(t = i[s]) in this.attrs ? d[t] = this.attrs[t] : r.is(this.paper.customAttributes[t], "function") ? d[t] = this.paper.customAttributes[t].def : d[t] = r._availableAttrs[t];
                                            return h - 1 ? d : d[i[0]]
                                        }
                                        if (this.attrs && null == o && r.is(t, "array")) {
                                            for (d = {}, s = 0, h = t.length; s < h; s++) d[t[s]] = this.attr(t[s]);
                                            return d
                                        }
                                        var p;
                                        for (var u in null != o && ((p = {})[t] = o), null == o && r.is(t, "object") && (p = t), p) c("raphael.attr." + u + "." + this.id, this, p[u]);
                                        if (p) {
                                            for (u in this.paper.customAttributes)
                                                if (this.paper.customAttributes[e](u) && p[e](u) && r.is(this.paper.customAttributes[u], "function")) {
                                                    var m = this.paper.customAttributes[u].apply(this, [].concat(p[u]));
                                                    for (var b in this.attrs[u] = p[u], m) m[e](b) && (p[b] = m[b])
                                                }
                                            p.text && "text" == this.type && (this.textpath.string = p.text), E(this, p)
                                        }
                                        return this
                                    }, S.toFront = function() {
                                        return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && r._tofront(this, this.paper), this
                                    }, S.toBack = function() {
                                        return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), r._toback(this, this.paper)), this)
                                    }, S.insertAfter = function(e) {
                                        return this.removed ? this : (e.constructor == r.st.constructor && (e = e[e.length - 1]), e.node.nextSibling ? e.node.parentNode.insertBefore(this.node, e.node.nextSibling) : e.node.parentNode.appendChild(this.node), r._insertafter(this, e, this.paper), this)
                                    }, S.insertBefore = function(e) {
                                        return this.removed ? this : (e.constructor == r.st.constructor && (e = e[0]), e.node.parentNode.insertBefore(this.node, e.node), r._insertbefore(this, e, this.paper), this)
                                    }, S.blur = function(e) {
                                        var t = this.node.runtimeStyle,
                                            o = t.filter;
                                        return o = o.replace(b, p), 0 != +e ? (this.attrs.blur = e, t.filter = o + h + " progid:DXImageTransform.Microsoft.Blur(pixelradius=" + (+e || 1.5) + ")", t.margin = r.format("-{0}px 0 0 -{0}px", n(+e || 1.5))) : (t.filter = o, t.margin = 0, delete this.attrs.blur), this
                                    }, r._engine.path = function(e, t) {
                                        var r = _("shape");
                                        r.style.cssText = g, r.coordsize = w + h + w, r.coordorigin = t.coordorigin;
                                        var o = new R(r, t),
                                            a = {
                                                fill: "none",
                                                stroke: "#000"
                                            };
                                        e && (a.path = e), o.type = "path", o.path = [], o.Path = p, E(o, a), t.canvas.appendChild(r);
                                        var n = _("skew");
                                        return n.on = !0, r.appendChild(n), o.skew = n, o.transform(p), o
                                    }, r._engine.rect = function(e, t, o, a, n, i) {
                                        var d = r._rectPath(t, o, a, n, i),
                                            s = e.path(d),
                                            l = s.attrs;
                                        return s.X = l.x = t, s.Y = l.y = o, s.W = l.width = a, s.H = l.height = n, l.r = i, l.path = d, s.type = "rect", s
                                    }, r._engine.ellipse = function(e, t, r, o, a) {
                                        var n = e.path();
                                        n.attrs;
                                        return n.X = t - o, n.Y = r - a, n.W = 2 * o, n.H = 2 * a, n.type = "ellipse", E(n, {
                                            cx: t,
                                            cy: r,
                                            rx: o,
                                            ry: a
                                        }), n
                                    }, r._engine.circle = function(e, t, r, o) {
                                        var a = e.path();
                                        a.attrs;
                                        return a.X = t - o, a.Y = r - o, a.W = a.H = 2 * o, a.type = "circle", E(a, {
                                            cx: t,
                                            cy: r,
                                            r: o
                                        }), a
                                    }, r._engine.image = function(e, t, o, a, n, i) {
                                        var d = r._rectPath(o, a, n, i),
                                            s = e.path(d).attr({
                                                stroke: "none"
                                            }),
                                            l = s.attrs,
                                            c = s.node,
                                            h = c.getElementsByTagName("fill")[0];
                                        return l.src = t, s.X = l.x = o, s.Y = l.y = a, s.W = l.width = n, s.H = l.height = i, l.path = d, s.type = "image", h.parentNode == c && c.removeChild(h), h.rotate = !0, h.src = t, h.type = "tile", s._.fillpos = [o, a], s._.fillsize = [n, i], c.appendChild(h), k(s, 1, 1, 0, 0, 0), s
                                    }, r._engine.text = function(e, o, a, i) {
                                        var d = _("shape"),
                                            s = _("path"),
                                            l = _("textpath");
                                        o = o || 0, a = a || 0, i = i || "", s.v = r.format("m{0},{1}l{2},{1}", n(o * w), n(a * w), n(o * w) + 1), s.textpathok = !0, l.string = t(i), l.on = !0, d.style.cssText = g, d.coordsize = w + h + w, d.coordorigin = "0 0";
                                        var c = new R(d, e),
                                            u = {
                                                fill: "#000",
                                                stroke: "none",
                                                font: r._availableAttrs.font,
                                                text: i
                                            };
                                        c.shape = d, c.path = s, c.textpath = l, c.type = "text", c.attrs.text = t(i), c.attrs.x = o, c.attrs.y = a, c.attrs.w = 1, c.attrs.h = 1, E(c, u), d.appendChild(l), d.appendChild(s), e.canvas.appendChild(d);
                                        var m = _("skew");
                                        return m.on = !0, d.appendChild(m), c.skew = m, c.transform(p), c
                                    }, r._engine.setSize = function(e, t) {
                                        var o = this.canvas.style;
                                        return this.width = e, this.height = t, e == +e && (e += "px"), t == +t && (t += "px"), o.width = e, o.height = t, o.clip = "rect(0 " + e + " " + t + " 0)", this._viewBox && r._engine.setViewBox.apply(this, this._viewBox), this
                                    }, r._engine.setViewBox = function(e, t, o, a, n) {
                                        r.eve("raphael.setViewBox", this, this._viewBox, [e, t, o, a, n]);
                                        var d, s, l = this.getSize(),
                                            c = l.width,
                                            h = l.height,
                                            p = 1 / i(o / c, a / h);
                                        return n && (s = c / o, o * (d = h / a) < c && (e -= (c - o * d) / 2 / d), a * s < h && (t -= (h - a * s) / 2 / s)), this._viewBox = [e, t, o, a, !!n], this._viewBoxShift = {
                                            dx: -e,
                                            dy: -t,
                                            scale: p
                                        }, this.forEach(function(e) {
                                            e.transform("...")
                                        }), this
                                    }, r._engine.initWin = function(e) {
                                        var t = e.document;
                                        t.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                                        try {
                                            !t.namespaces.rvml && t.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), _ = function(e) {
                                                return t.createElement("<rvml:" + e + ' class="rvml">')
                                            }
                                        } catch (e) {
                                            _ = function(e) {
                                                return t.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                                            }
                                        }
                                    }, r._engine.initWin(r._g.win), r._engine.create = function() {
                                        var e = r._getContainer.apply(0, arguments),
                                            t = e.container,
                                            o = e.height,
                                            a = e.width,
                                            n = e.x,
                                            i = e.y;
                                        if (!t) throw new Error("VML container not found.");
                                        var d = new r._Paper,
                                            s = d.canvas = r._g.doc.createElement("div"),
                                            l = s.style;
                                        return n = n || 0, i = i || 0, a = a || 512, o = o || 342, d.width = a, d.height = o, a == +a && (a += "px"), o == +o && (o += "px"), d.coordsize = 216e5 + h + 216e5, d.coordorigin = "0 0", d.span = r._g.doc.createElement("span"), d.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", s.appendChild(d.span), l.cssText = r.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", a, o), 1 == t ? (r._g.doc.body.appendChild(s), l.left = n + "px", l.top = i + "px", l.position = "absolute") : t.firstChild ? t.insertBefore(s, t.firstChild) : t.appendChild(s), d.renderfix = function() {}, d
                                    }, r.prototype.clear = function() {
                                        r.eve("raphael.clear", this), this.canvas.innerHTML = p, this.span = r._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null
                                    }, r.prototype.remove = function() {
                                        for (var e in r.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas), this) this[e] = "function" == typeof this[e] ? r._removedFactory(e) : null;
                                        return !0
                                    };
                                    var A = r.st;
                                    for (var P in S) S[e](P) && !A[e](P) && (A[P] = function(e) {
                                        return function() {
                                            var t = arguments;
                                            return this.forEach(function(r) {
                                                r[e].apply(r, t)
                                            })
                                        }
                                    }(P))
                                }
                            }(), c.was ? l.win.Raphael = r : Raphael = r, r
                    })
                }).call(window)
            }).call(window)
        },
        "6MDn": function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.AbstractMediaTab = o.AbstractMediaTab || o.AbstractTab.extend({
                    contentTemplate: null,
                    contentContainer: null,
                    contentContainerSelector: null,
                    contentType: null,
                    mediaTags: null,
                    constructor: function(e) {
                        this.base(e.context, e.isMyLb, e.container, e.selectorContainer, e.type, e.tabSize, e.player), this.contentContainerSelector = e.contentContainer, this.contentTemplate = e.contentTemplate, this.contentType = e.contentType, this.mediaTags = ""
                    },
                    renderContent: function(e) {
                        this.contentContainer || (this.contentContainer = this.container.find(this.contentContainerSelector)), this.contentContainer.empty();
                        for (var t = 0; t < e.items.length; t++) {
                            var o = e.items[t]; - 1 !== this.contentType.indexOf(o.type) && (o.image && (o.image = r.getDamCloudinaryURL(o.image)), this.context.config.getOrCreate(this.contentTemplate).tmpl({
                                item: o,
                                tags: this.mediaTags,
                                pid: this.pid
                            }).appendTo(this.contentContainer))
                        }
                        this.afterRender()
                    },
                    afterRender: function() {
                        this.applyCloudinary(this.container)
                    }
                })
            }(jQuery, window, pgatour)
        },
        "6YZn": function(e, t) {
            ! function(e, t, r, o) {
                o.shottracker.ShotRenderer = o.shottracker.ShotRenderer || o.shottracker.AbstractRenderer.extend({
                    constructor: function(e, t, r, o, a) {
                        this.base(e, t, r), this.options = o, this.toolTip = a
                    },
                    checkImagesLoadComplete: function() {
                        this.queueLoadingImages || this.loadedImagesCount !== this.totalImagesCount || (t.each(this.shotMarkers, function(e, t) {
                            t.label.toBack(), t.image.toBack()
                        }), this.shotFlag && this.shotFlag.image.toBack(), t.each(this.shotPoints, function(e, t) {
                            t.toBack()
                        }), t.each(this.shotPaths, function(e, t) {
                            t.toBack()
                        }), this.image && this.image.toBack(), this.checkMarkersBounds(), this.fixPaperViewBox())
                    },
                    checkMarkersBounds: function() {
                        if ("hole" === this.options.fieldMode) {
                            var e = 0;
                            t.each(this.shotMarkers, this.proxy(function(t, r) {
                                e = Math.min(e, r.image.getBBox().y)
                            })), this.shotFlag && (e = Math.min(e, this.shotFlag.image.getBBox().y)), e < 0 && this.layoutCanvas(-e * this.canvasRatio)
                        }
                    },
                    hideMarkerToolTip: function() {
                        this.toolTip.hide().data("markerBounds", null)
                    },
                    getToolTipPosition: function(e) {
                        var t = this.canvas.position(),
                            r = this.canvasRatio,
                            o = this.toolTip.outerWidth(),
                            a = this.toolTip.outerHeight(),
                            n = (e.x + e.width / 2) * r - o / 2 + t.left,
                            i = e.y * r - a + t.top;
                        if (this.options.positionTooltipInsideContainer) {
                            var d = this.canvas.find("svg")[0].getBoundingClientRect().width;
                            i < 0 ? (i = (e.y + e.height / 2) * r - a / 2 + t.top, (n = (e.x2 + e.width) * Math.max(r, 1)) + o > d && (n = e.x * r - o)) : n + o > d && (n = d - o), n = Math.max(n, 0), i = Math.max(i, 0)
                        }
                        return {
                            left: n,
                            top: i
                        }
                    },
                    layoutToolTip: function() {
                        var e = this.toolTip.data("markerBounds");
                        if (e) {
                            var t = this.getToolTipPosition(e);
                            this.toolTip.css({
                                left: t.left,
                                top: t.top
                            })
                        }
                    },
                    renderPlayer: function(e, a) {
                        var n = new o.shottracker.model.PlayerHoleModel(a).shots;
                        this.shotsCount = 1;
                        var i = a.colourIndex || e;
                        this.lineColor = r.getRGB(this.options.lineColors[i].value).hex;
                        var d = this.options.lineThickness;
                        this.path = this.paper.path(), this.pathData = o.format("M{x},{y}", this.teePoint), n.length && (1 !== n.length || n[0].vector.lengthSquared()) || (n[0] = o.shottracker.model.ShotModel.createFromTee(this.round.tee)), this.markerUrl = this.options.markerImageUrl + o.format("marker-{color}.png", {
                            color: this.options.lineColors[i].name
                        }), t.each(n, this.proxy(this.renderPlayerShot, d)), this.pathData.indexOf("L") > -1 && (this.path.attr({
                            path: this.pathData,
                            stroke: this.lineColor,
                            "stroke-width": d
                        }), this.shotPaths.push(this.path))
                    },
                    renderPlayerShot: function(e, t, a) {
                        this.layoutCanvas();
                        var n = r.getRGB(this.options.plotColor).hex;
                        if (a.isInCup && (a.vector = this.round.cup.clone()), a.vector.lengthSquared()) {
                            var i = o.shottracker.Plotter.plot(a.vector, this.plotterOptions);
                            this.pathData += o.format("L{x},{y}", i), null !== a.colourIndex && (this.lineColor = r.getRGB(this.options.lineColors[a.colourIndex].value).hex, this.path.attr({
                                path: this.pathData,
                                stroke: this.lineColor,
                                "stroke-width": e
                            }), this.shotPaths.push(this.path), this.path = this.paper.path(), this.pathData = o.format("M{x},{y}", i));
                            var d = this.paper.circle(i.x, i.y, 0).attr({
                                fill: n,
                                stroke: "none"
                            });
                            this.shotPoints.push(d), this.totalImagesCount++;
                            var s = this.paper.image(this.markerUrl),
                                l = this.paper.text(-1e4, -1e4, "TEE" === a.location ? "T" : this.shotsCount++).attr({
                                    "font-size": this.options.markerFontSize,
                                    "font-weight": "bold",
                                    cursor: "default"
                                }),
                                c = {
                                    shot: a,
                                    marker: this.paper.set().push(s).push(l),
                                    point: i,
                                    markerImage: s,
                                    markerLabel: l
                                };
                            o.ImagePreloader.preLoad(this.markerUrl, function(e) {
                                this.onLoadMarkerComplete(e, c)
                            }, this)
                        }
                    },
                    renderShots: function(e, a, n) {
                        this.course = a, this.shotFlag = null, this.shotMarkers = [], this.shotPoints = this.paper.set(), this.shotPaths = [], this.options = e, this.image = n, this.totalImagesCount = 0, this.loadedImagesCount = 0, this.layoutCanvas();
                        var i = this.course.getHole(e.hole);
                        if (i && (this.round = i.getRound(e.round), this.round.tee.lengthSquared())) {
                            if (this.plotterOptions = "green" === e.fieldMode ? i.greenPlotterOptions : i.holePlotterOptions, this.queueLoadingImages = !0, this.round.cup.lengthSquared()) {
                                this.totalImagesCount++;
                                var d = e.markerImageUrl + "hole-flag.png";
                                o.ImagePreloader.preLoad(d, this.onLoadFlagComplete, this)
                            }
                            var s = r.getRGB(this.options.plotColor).hex;
                            this.teePoint = o.shottracker.Plotter.plot(this.round.tee, this.plotterOptions);
                            var l = this.paper.circle(this.teePoint.x, this.teePoint.y, 0).attr({
                                fill: s,
                                stroke: "none"
                            });
                            this.shotPoints.push(l);
                            var c = this.getPlayerHoles(e);
                            t.each(c, this.proxy(this.renderPlayer)), this.queueLoadingImages = !1, this.checkImagesLoadComplete()
                        }
                    },
                    showMarkerToolTip: function(e, t) {
                        var r = t.getBBox();
                        this.toolTip.show().data("markerBounds", r).text(e.getMessage("green" === this.options.fieldMode)), this.layoutToolTip()
                    },
                    onLoadFlagComplete: function(e) {
                        this.base(e), e && (this.loadedImagesCount++, this.checkImagesLoadComplete())
                    },
                    onLoadMarkerComplete: function(e, t) {
                        if (t) {
                            var r = t.shot,
                                o = t.marker,
                                a = t.point,
                                n = t.markerImage,
                                i = t.markerLabel;
                            if (e) {
                                n.attr({
                                    src: e.url,
                                    x: 0,
                                    y: 0,
                                    width: 0,
                                    height: 0
                                }), o.click(function() {
                                    this.showMarkerToolTip(r, o)
                                }, this).mouseover(function() {
                                    this.showMarkerToolTip(r, o)
                                }, this).mouseout(function() {
                                    this.hideMarkerToolTip()
                                }, this);
                                var d = {
                                    image: n,
                                    label: i,
                                    point: a,
                                    imageWidth: e.width,
                                    imageHeight: e.height
                                };
                                this.shotMarkers.push(d), this.layoutShotMarker(d), this.fixPaperViewBox(), this.loadedImagesCount++, this.checkImagesLoadComplete()
                            }
                        }
                    }
                })
            }(window, jQuery, Raphael, pgatour)
        },
        "7ARz": function(e, t) {
            ! function(e, t) {
                t.shottracker.model.CourseModel = t.Base.extend({
                    _data: null,
                    id: 0,
                    width: 0,
                    height: 0,
                    isHost: !1,
                    constructor: function(e, t, r) {
                        this._data = e, this.id = e.course_id, this.isHost = !1 !== e.is_host, this.width = t, this.height = r
                    },
                    getHole: function(e) {
                        var r = t.getItemByField(this._data.holes, "hole_id", e);
                        return r ? new t.shottracker.model.HoleModel(r, this.width, this.height) : null
                    }
                })
            }(window, pgatour)
        },
        "7pA7": function(e, t, r) {
            var o = r("YZG3");
            "string" == typeof o && (o = [
                [e.i, o, ""]
            ]);
            var a = {
                hmr: !0,
                transform: void 0,
                insertInto: void 0
            };
            r("aET+")(o, a);
            o.locals && (e.exports = o.locals)
        },
        "9yk6": function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.AbstractTab = o.AbstractTab || r.BaseCssCloudinaryModule.extend({
                    TAB_SELECTOR_TEMPLATE: "#lbnTabSelector",
                    PHONE_TAB_SELECTOR_TEMPLATE: "#lbnMobileTabSelector",
                    SELECTED_TAB_CLASS: " tab-active",
                    $selectorContainer: null,
                    selector: null,
                    context: null,
                    pid: null,
                    isMyLb: null,
                    type: null,
                    isSmallScreenTab: !1,
                    tabSize: null,
                    rendered: !1,
                    player: null,
                    constructor: function(t, r, o, a, n, i, d) {
                        this.context = t, this.pid = d.player_id, this.isMyLb = r, this.$selectorContainer = e(a), this.type = n, this.tabSize = i, this.player = d;
                        var s = e('<div class="container-' + n + '" style="display: none;"></div>');
                        o.append(s), this.base(s), this.isSmallScreenTab = "select" === this.$selectorContainer.get(0).tagName.toLowerCase()
                    },
                    render: function() {
                        var e;
                        e = this.isSmallScreenTab ? this.context.config.getOrCreate(this.PHONE_TAB_SELECTOR_TEMPLATE) : this.context.config.getOrCreate(this.TAB_SELECTOR_TEMPLATE), this.selector = e.tmpl({
                            type: this.type,
                            scoringType: this.context.leaderboardModel.scoringType
                        }), this.$selectorContainer.append(this.selector), this.rendered = !0
                    },
                    show: function(e) {
                        this.context._selectedType = e, this.container.show(0, this.proxy(this.onShow)), this.selector.addClass(this.SELECTED_TAB_CLASS), this.$selectorContainer.closest(".cell-fix").removeClass().addClass("cell-fix cell-" + this.type), this.isSmallScreenTab && this.$selectorContainer.val(this.selector.attr("value"))
                    },
                    hide: function() {
                        this.container.hide(), this.selector.removeClass(this.SELECTED_TAB_CLASS)
                    },
                    update: function(e) {
                        this.player = e
                    },
                    updateScroller: function() {
                        t.pgatour.is.touchDevice || t.pgatour.is.rotatableDevice || (this.scroller && this.scroller.tinyscrollbar_update && this.scroller.tinyscrollbar_update(), this.scroller && this.scroller.data().plugin_tinyscrollbar && this.scroller.data().plugin_tinyscrollbar.update(), this.scroller || (this.scroller = this.scrollerSelector.tinyscrollbar({
                            sizethumb: "auto"
                        }))), !t.pgatour.is.touchDevice && !t.pgatour.is.rotatableDevice || this.nativeScrollerInitialized || (this.scrollerSelector.addClass("native-scroll"), this.nativeScrollerInitialized = !0)
                    },
                    onShow: function() {}
                })
            }(jQuery, window, pgatour)
        },
        "As/H": function(e, t) {
            (function() {
                (function() {
                    ! function(e) {
                        var t = {},
                            r = {
                                mode: "horizontal",
                                slideSelector: "",
                                infiniteLoop: !0,
                                hideControlOnEnd: !1,
                                speed: 500,
                                easing: null,
                                slideMargin: 0,
                                startSlide: 0,
                                randomStart: !1,
                                captions: !1,
                                ticker: !1,
                                tickerHover: !1,
                                adaptiveHeight: !1,
                                adaptiveHeightSpeed: 500,
                                video: !1,
                                useCSS: !0,
                                preloadImages: "visible",
                                responsive: !0,
                                touchEnabled: !0,
                                swipeThreshold: 50,
                                oneToOneTouch: !0,
                                preventDefaultSwipeX: !0,
                                preventDefaultSwipeY: !1,
                                pager: !0,
                                pagerType: "full",
                                pagerShortSeparator: " / ",
                                pagerSelector: null,
                                buildPager: null,
                                pagerCustom: null,
                                controls: !0,
                                nextText: "Next",
                                prevText: "Prev",
                                nextSelector: null,
                                prevSelector: null,
                                autoControls: !1,
                                startText: "Start",
                                stopText: "Stop",
                                autoControlsCombine: !1,
                                autoControlsSelector: null,
                                auto: !1,
                                pause: 4e3,
                                autoStart: !0,
                                autoDirection: "next",
                                autoHover: !1,
                                autoDelay: 0,
                                minSlides: 1,
                                maxSlides: 1,
                                moveSlides: 0,
                                slideWidth: 0,
                                onSliderLoad: function() {},
                                onSlideBefore: function() {},
                                onSlideAfter: function() {},
                                onSlideNext: function() {},
                                onSlidePrev: function() {}
                            };
                        e.fn.bxSlider = function(o) {
                            if (0 == this.length) return this;
                            if (this.length > 1) return this.each(function() {
                                e(this).bxSlider(o)
                            }), this;
                            var a = {},
                                n = this;
                            t.el = this;
                            var i = e(window).width(),
                                d = e(window).height(),
                                s = function() {
                                    a.settings = e.extend({}, r, o), a.settings.slideWidth = parseInt(a.settings.slideWidth), a.children = n.children(a.settings.slideSelector), a.children.length < a.settings.minSlides && (a.settings.minSlides = a.children.length), a.children.length < a.settings.maxSlides && (a.settings.maxSlides = a.children.length), a.settings.randomStart && (a.settings.startSlide = Math.floor(Math.random() * a.children.length)), a.active = {
                                        index: a.settings.startSlide
                                    }, a.carousel = a.settings.minSlides > 1 || a.settings.maxSlides > 1, a.carousel && (a.settings.preloadImages = "all"), a.minThreshold = a.settings.minSlides * a.settings.slideWidth + (a.settings.minSlides - 1) * a.settings.slideMargin, a.maxThreshold = a.settings.maxSlides * a.settings.slideWidth + (a.settings.maxSlides - 1) * a.settings.slideMargin, a.working = !1, a.controls = {}, a.interval = null, a.animProp = "vertical" == a.settings.mode ? "top" : "left", a.usingCSS = a.settings.useCSS && "fade" != a.settings.mode && function() {
                                        var e = document.createElement("div"),
                                            t = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                                        for (var r in t)
                                            if (void 0 !== e.style[t[r]]) return a.cssPrefix = t[r].replace("Perspective", "").toLowerCase(), a.animProp = "-" + a.cssPrefix + "-transform", !0;
                                        return !1
                                    }(), "vertical" == a.settings.mode && (a.settings.maxSlides = a.settings.minSlides), n.data("origStyle", n.attr("style")), n.children(a.settings.slideSelector).each(function() {
                                        e(this).data("origStyle", e(this).attr("style"))
                                    }), l()
                                },
                                l = function() {
                                    n.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'), a.viewport = n.parent(), a.loader = e('<div class="bx-loading" />'), a.viewport.prepend(a.loader), n.css({
                                        width: "horizontal" == a.settings.mode ? 100 * a.children.length + 215 + "%" : "auto",
                                        position: "relative"
                                    }), a.usingCSS && a.settings.easing ? n.css("-" + a.cssPrefix + "-transition-timing-function", a.settings.easing) : a.settings.easing || (a.settings.easing = "swing");
                                    b();
                                    a.viewport.css({
                                        width: "100%",
                                        overflow: "hidden",
                                        position: "relative"
                                    }), a.viewport.parent().css({
                                        maxWidth: u()
                                    }), a.settings.pager || a.viewport.parent().css({
                                        margin: "0 auto 0px"
                                    }), a.children.css({
                                        float: "horizontal" == a.settings.mode ? "left" : "none",
                                        listStyle: "none",
                                        position: "relative"
                                    }), a.children.css("width", m()), "horizontal" == a.settings.mode && a.settings.slideMargin > 0 && a.children.css("marginRight", a.settings.slideMargin), "vertical" == a.settings.mode && a.settings.slideMargin > 0 && a.children.css("marginBottom", a.settings.slideMargin), "fade" == a.settings.mode && (a.children.css({
                                        position: "absolute",
                                        zIndex: 0,
                                        display: "none"
                                    }), a.children.eq(a.settings.startSlide).css({
                                        zIndex: 50,
                                        display: "block"
                                    })), a.controls.el = e('<div class="bx-controls" />'), a.settings.captions && T(), a.active.last = a.settings.startSlide == f() - 1, a.settings.video && n.fitVids();
                                    var t = a.children.eq(a.settings.startSlide);
                                    "all" == a.settings.preloadImages && (t = a.children), a.settings.ticker ? a.settings.pager = !1 : (a.settings.pager && v(), a.settings.controls && k(), a.settings.auto && a.settings.autoControls && _(), (a.settings.controls || a.settings.autoControls || a.settings.pager) && a.viewport.after(a.controls.el)), c(t, h)
                                },
                                c = function(t, r) {
                                    var o = t.find("img").length;
                                    if (0 != o) {
                                        var a = 0;
                                        t.find("img").each(function() {
                                            e(this).one("load error", function() {
                                                ++a == o && r()
                                            }).each(function() {
                                                this.complete && e(this).load()
                                            })
                                        })
                                    } else r()
                                },
                                h = function() {
                                    if (a.settings.infiniteLoop && "fade" != a.settings.mode && !a.settings.ticker) {
                                        var t = "vertical" == a.settings.mode ? a.settings.minSlides : a.settings.maxSlides,
                                            r = a.children.slice(0, t).clone().addClass("bx-clone"),
                                            o = a.children.slice(-t).clone().addClass("bx-clone");
                                        n.append(r).prepend(o)
                                    }
                                    a.loader.remove(), w(), "vertical" == a.settings.mode && (a.settings.adaptiveHeight = !0), a.viewport.height(p()), n.redrawSlider(), a.settings.onSliderLoad.call(n, a.children.eq(a.active.index), a.active.index), a.initialized = !0, a.settings.responsive && e(window).bind("resize", z), a.settings.auto && a.settings.autoStart && O(), a.settings.ticker && I(), a.settings.pager && P(a.settings.startSlide), a.settings.controls && B(), a.settings.touchEnabled && !a.settings.ticker && D()
                                },
                                p = function() {
                                    var t = 0,
                                        r = e();
                                    if ("vertical" == a.settings.mode || a.settings.adaptiveHeight)
                                        if (a.carousel) {
                                            var o = 1 == a.settings.moveSlides ? a.active.index : a.active.index * g();
                                            r = a.children.eq(o);
                                            for (var n = 1; n <= a.settings.maxSlides - 1; n++) r = o + n >= a.children.length ? r.add(a.children.eq(n - 1)) : r.add(a.children.eq(o + n))
                                        } else r = a.children.eq(a.active.index);
                                    else r = a.children;
                                    return "vertical" == a.settings.mode ? (r.each(function(r) {
                                        t += e(this).outerHeight()
                                    }), a.settings.slideMargin > 0 && (t += a.settings.slideMargin * (a.settings.minSlides - 1))) : t = Math.max.apply(Math, r.map(function() {
                                        return e(this).outerHeight(!1)
                                    }).get()), t
                                },
                                u = function() {
                                    var e = "100%";
                                    return a.settings.slideWidth > 0 && (e = "horizontal" == a.settings.mode ? a.settings.maxSlides * a.settings.slideWidth + (a.settings.maxSlides - 1) * a.settings.slideMargin : a.settings.slideWidth), e
                                },
                                m = function() {
                                    var e = a.settings.slideWidth,
                                        t = a.viewport.width();
                                    return 0 == a.settings.slideWidth || a.settings.slideWidth > t && !a.carousel || "vertical" == a.settings.mode ? e = t : a.settings.maxSlides > 1 && "horizontal" == a.settings.mode && (t > a.maxThreshold || t < a.minThreshold && (e = (t - a.settings.slideMargin * (a.settings.minSlides - 1)) / a.settings.minSlides)), e
                                },
                                b = function() {
                                    var e = 1;
                                    if ("horizontal" == a.settings.mode && a.settings.slideWidth > 0)
                                        if (a.viewport.width() < a.minThreshold) e = a.settings.minSlides;
                                        else if (a.viewport.width() > a.maxThreshold) e = a.settings.maxSlides;
                                    else {
                                        var t = a.children.first().width();
                                        e = Math.floor(a.viewport.width() / t)
                                    } else "vertical" == a.settings.mode && (e = a.settings.minSlides);
                                    return e
                                },
                                f = function() {
                                    var e = 0;
                                    if (a.settings.moveSlides > 0)
                                        if (a.settings.infiniteLoop) e = a.children.length / g();
                                        else
                                            for (var t = 0, r = 0; t < a.children.length;) ++e, t = r + b(), r += a.settings.moveSlides <= b() ? a.settings.moveSlides : b();
                                    else e = Math.ceil(a.children.length / b());
                                    return e
                                },
                                g = function() {
                                    return a.settings.moveSlides > 0 && a.settings.moveSlides <= b() ? a.settings.moveSlides : b()
                                },
                                w = function() {
                                    if (a.children.length > a.settings.maxSlides && a.active.last && !a.settings.infiniteLoop) {
                                        if ("horizontal" == a.settings.mode) {
                                            var e = a.children.last(),
                                                t = e.position();
                                            x(-(t.left - (a.viewport.width() - e.width())), "reset", 0)
                                        } else if ("vertical" == a.settings.mode) {
                                            var r = a.children.length - a.settings.minSlides;
                                            t = a.children.eq(r).position();
                                            x(-t.top, "reset", 0)
                                        }
                                    } else {
                                        t = a.children.eq(a.active.index * g()).position();
                                        a.active.index == f() - 1 && (a.active.last = !0), void 0 != t && ("horizontal" == a.settings.mode ? x(-t.left, "reset", 0) : "vertical" == a.settings.mode && x(-t.top, "reset", 0))
                                    }
                                },
                                x = function(e, t, r, o) {
                                    if (a.usingCSS) {
                                        var i = "vertical" == a.settings.mode ? "translate3d(0, " + e + "px, 0)" : "translate3d(" + e + "px, 0, 0)";
                                        n.css("-" + a.cssPrefix + "-transition-duration", r / 1e3 + "s"), "slide" == t ? (n.css(a.animProp, i), n.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                                            n.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), L()
                                        }), a.working = !1) : "reset" == t ? n.css(a.animProp, i) : "ticker" == t && (n.css("-" + a.cssPrefix + "-transition-timing-function", "linear"), n.css(a.animProp, i), n.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                                            n.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), x(o.resetValue, "reset", 0), N()
                                        }))
                                    } else {
                                        var d = {};
                                        d[a.animProp] = e, "slide" == t ? n.animate(d, r, a.settings.easing, function() {
                                            L()
                                        }) : "reset" == t ? n.css(a.animProp, e) : "ticker" == t && n.animate(d, speed, "linear", function() {
                                            x(o.resetValue, "reset", 0), N()
                                        })
                                    }
                                },
                                y = function() {
                                    for (var t = "", r = f(), o = 0; o < r; o++) {
                                        var n = "";
                                        a.settings.buildPager && e.isFunction(a.settings.buildPager) ? (n = a.settings.buildPager(o), a.pagerEl.addClass("bx-custom-pager")) : (n = o + 1, a.pagerEl.addClass("bx-default-pager")), t += '<div class="bx-pager-item"><a href="" data-slide-index="' + o + '" class="bx-pager-link">' + n + "</a></div>"
                                    }
                                    a.pagerEl.html(t)
                                },
                                v = function() {
                                    a.settings.pagerCustom ? a.pagerEl = e(a.settings.pagerCustom) : (a.pagerEl = e('<div class="bx-pager" />'), a.settings.pagerSelector ? e(a.settings.pagerSelector).html(a.pagerEl) : a.controls.el.addClass("bx-has-pager").append(a.pagerEl), y()), a.pagerEl.delegate("a", "click", A)
                                },
                                k = function() {
                                    a.controls.next = e('<a class="bx-next" href="">' + a.settings.nextText + "</a>"), a.controls.prev = e('<a class="bx-prev" href="">' + a.settings.prevText + "</a>"), a.controls.next.bind("click", E), a.controls.prev.bind("click", C), a.settings.nextSelector && e(a.settings.nextSelector).append(a.controls.next), a.settings.prevSelector && e(a.settings.prevSelector).append(a.controls.prev), a.settings.nextSelector || a.settings.prevSelector || (a.controls.directionEl = e('<div class="bx-controls-direction" />'), a.controls.directionEl.append(a.controls.prev).append(a.controls.next), a.controls.el.addClass("bx-has-controls-direction").append(a.controls.directionEl))
                                },
                                _ = function() {
                                    a.controls.start = e('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + a.settings.startText + "</a></div>"), a.controls.stop = e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + a.settings.stopText + "</a></div>"), a.controls.autoEl = e('<div class="bx-controls-auto" />'), a.controls.autoEl.delegate(".bx-start", "click", R), a.controls.autoEl.delegate(".bx-stop", "click", S), a.settings.autoControlsCombine ? a.controls.autoEl.append(a.controls.start) : a.controls.autoEl.append(a.controls.start).append(a.controls.stop), a.settings.autoControlsSelector ? e(a.settings.autoControlsSelector).html(a.controls.autoEl) : a.controls.el.addClass("bx-has-controls-auto").append(a.controls.autoEl), M(a.settings.autoStart ? "stop" : "start")
                                },
                                T = function() {
                                    a.children.each(function(t) {
                                        var r = e(this).find("img:first").attr("title");
                                        void 0 != r && ("" + r).length && e(this).append('<div class="bx-caption"><span>' + r + "</span></div>")
                                    })
                                },
                                E = function(e) {
                                    a.settings.auto && n.stopAuto(), n.goToNextSlide(), e.preventDefault()
                                },
                                C = function(e) {
                                    a.settings.auto && n.stopAuto(), n.goToPrevSlide(), e.preventDefault()
                                },
                                R = function(e) {
                                    n.startAuto(), e.preventDefault()
                                },
                                S = function(e) {
                                    n.stopAuto(), e.preventDefault()
                                },
                                A = function(t) {
                                    a.settings.auto && n.stopAuto();
                                    var r = e(t.currentTarget),
                                        o = parseInt(r.attr("data-slide-index"));
                                    o != a.active.index && n.goToSlide(o), t.preventDefault()
                                },
                                P = function(t) {
                                    var r = a.children.length;
                                    if ("short" == a.settings.pagerType) return a.settings.maxSlides > 1 && (r = Math.ceil(a.children.length / a.settings.maxSlides)), void a.pagerEl.html(t + 1 + a.settings.pagerShortSeparator + r);
                                    a.pagerEl.find("a").removeClass("active"), a.pagerEl.each(function(r, o) {
                                        e(o).find("a").eq(t).addClass("active")
                                    })
                                },
                                L = function() {
                                    if (a.settings.infiniteLoop) {
                                        var e = "";
                                        0 == a.active.index ? e = a.children.eq(0).position() : a.active.index == f() - 1 && a.carousel ? e = a.children.eq((f() - 1) * g()).position() : a.active.index == a.children.length - 1 && (e = a.children.eq(a.children.length - 1).position()), "horizontal" == a.settings.mode ? x(-e.left, "reset", 0) : "vertical" == a.settings.mode && x(-e.top, "reset", 0)
                                    }
                                    a.working = !1, a.settings.onSlideAfter.call(n, a.children.eq(a.active.index), a.oldIndex, a.active.index)
                                },
                                M = function(e) {
                                    a.settings.autoControlsCombine ? a.controls.autoEl.html(a.controls[e]) : (a.controls.autoEl.find("a").removeClass("active"), a.controls.autoEl.find("a:not(.bx-" + e + ")").addClass("active"))
                                },
                                B = function() {
                                    1 == f() ? (a.controls.prev.addClass("disabled"), a.controls.next.addClass("disabled")) : !a.settings.infiniteLoop && a.settings.hideControlOnEnd && (0 == a.active.index ? (a.controls.prev.addClass("disabled"), a.controls.next.removeClass("disabled")) : a.active.index == f() - 1 ? (a.controls.next.addClass("disabled"), a.controls.prev.removeClass("disabled")) : (a.controls.prev.removeClass("disabled"), a.controls.next.removeClass("disabled")))
                                },
                                O = function() {
                                    if (a.settings.autoDelay > 0) setTimeout(n.startAuto, a.settings.autoDelay);
                                    else n.startAuto();
                                    a.settings.autoHover && n.hover(function() {
                                        a.interval && (n.stopAuto(!0), a.autoPaused = !0)
                                    }, function() {
                                        a.autoPaused && (n.startAuto(!0), a.autoPaused = null)
                                    })
                                },
                                I = function() {
                                    var t = 0;
                                    if ("next" == a.settings.autoDirection) n.append(a.children.clone().addClass("bx-clone"));
                                    else {
                                        n.prepend(a.children.clone().addClass("bx-clone"));
                                        var r = a.children.first().position();
                                        t = "horizontal" == a.settings.mode ? -r.left : -r.top
                                    }
                                    x(t, "reset", 0), a.settings.pager = !1, a.settings.controls = !1, a.settings.autoControls = !1, a.settings.tickerHover && !a.usingCSS && a.viewport.hover(function() {
                                        n.stop()
                                    }, function() {
                                        var t = 0;
                                        a.children.each(function(r) {
                                            t += "horizontal" == a.settings.mode ? e(this).outerWidth(!0) : e(this).outerHeight(!0)
                                        });
                                        var r = a.settings.speed / t,
                                            o = "horizontal" == a.settings.mode ? "left" : "top",
                                            i = r * (t - Math.abs(parseInt(n.css(o))));
                                        N(i)
                                    }), N()
                                },
                                N = function(e) {
                                    speed = e || a.settings.speed;
                                    var t = {
                                            left: 0,
                                            top: 0
                                        },
                                        r = {
                                            left: 0,
                                            top: 0
                                        };
                                    "next" == a.settings.autoDirection ? t = n.find(".bx-clone").first().position() : r = a.children.first().position();
                                    var o = "horizontal" == a.settings.mode ? -t.left : -t.top,
                                        i = "horizontal" == a.settings.mode ? -r.left : -r.top;
                                    x(o, "ticker", speed, {
                                        resetValue: i
                                    })
                                },
                                D = function() {
                                    a.touch = {
                                        start: {
                                            x: 0,
                                            y: 0
                                        },
                                        end: {
                                            x: 0,
                                            y: 0
                                        }
                                    }, a.viewport.bind("touchstart", F)
                                },
                                F = function(e) {
                                    if (a.settings.touchEnabled)
                                        if (a.working) e.preventDefault();
                                        else {
                                            a.touch.originalPos = n.position();
                                            var t = e.originalEvent;
                                            a.touch.start.x = t.changedTouches[0].pageX, a.touch.start.y = t.changedTouches[0].pageY, a.viewport.bind("touchmove", H), a.viewport.bind("touchend", V)
                                        }
                                },
                                H = function(e) {
                                    var t = e.originalEvent,
                                        r = Math.abs(t.changedTouches[0].pageX - a.touch.start.x),
                                        o = Math.abs(t.changedTouches[0].pageY - a.touch.start.y);
                                    if (3 * r > o && a.settings.preventDefaultSwipeX ? e.preventDefault() : 3 * o > r && a.settings.preventDefaultSwipeY && e.preventDefault(), "fade" != a.settings.mode && a.settings.oneToOneTouch) {
                                        var n = 0;
                                        if ("horizontal" == a.settings.mode) {
                                            var i = t.changedTouches[0].pageX - a.touch.start.x;
                                            n = a.touch.originalPos.left + i
                                        } else {
                                            i = t.changedTouches[0].pageY - a.touch.start.y;
                                            n = a.touch.originalPos.top + i
                                        }
                                        x(n, "reset", 0)
                                    }
                                },
                                V = function(e) {
                                    a.viewport.unbind("touchmove", H);
                                    var t = e.originalEvent,
                                        r = 0;
                                    if (a.touch.end.x = t.changedTouches[0].pageX, a.touch.end.y = t.changedTouches[0].pageY, "fade" == a.settings.mode) {
                                        (o = Math.abs(a.touch.start.x - a.touch.end.x)) >= a.settings.swipeThreshold && (a.touch.start.x > a.touch.end.x ? n.goToNextSlide() : n.goToPrevSlide(), n.stopAuto())
                                    } else {
                                        var o = 0;
                                        "horizontal" == a.settings.mode ? (o = a.touch.end.x - a.touch.start.x, r = a.touch.originalPos.left) : (o = a.touch.end.y - a.touch.start.y, r = a.touch.originalPos.top), !a.settings.infiniteLoop && (0 == a.active.index && o > 0 || a.active.last && o < 0) ? a.settings.oneToOneTouch && x(r, "reset", 200) : Math.abs(o) >= a.settings.swipeThreshold ? (a.settings.preventDefaultSwipeX && e.stopPropagation(), o < 0 ? n.goToNextSlide() : n.goToPrevSlide(), n.stopAuto()) : x(r, "reset", 200)
                                    }
                                    a.viewport.unbind("touchend", V)
                                },
                                z = function(t) {
                                    var r = e(window).width(),
                                        o = e(window).height();
                                    i == r && d == o || (i = r, d = o, n.redrawSlider())
                                };
                            return n.goToSlide = function(t, r) {
                                if (!a.working && a.active.index != t)
                                    if (a.working = !0, a.oldIndex = a.active.index, t < 0 ? a.active.index = f() - 1 : t >= f() ? a.active.index = 0 : a.active.index = t, a.settings.onSlideBefore.call(n, a.children.eq(a.active.index), a.oldIndex, a.active.index), "next" == r ? a.settings.onSlideNext.call(n, a.children.eq(a.active.index), a.oldIndex, a.active.index) : "prev" == r && a.settings.onSlidePrev.call(n, a.children.eq(a.active.index), a.oldIndex, a.active.index), a.active.last = a.active.index >= f() - 1, a.settings.pager && P(a.active.index), a.settings.controls && B(), "fade" == a.settings.mode) a.settings.adaptiveHeight && a.viewport.height() != p() && a.viewport.animate({
                                        height: p()
                                    }, a.settings.adaptiveHeightSpeed), a.children.filter(":visible").fadeOut(a.settings.speed).css({
                                        zIndex: 0
                                    }), a.children.eq(a.active.index).css("zIndex", 51).fadeIn(a.settings.speed, function() {
                                        e(this).css("zIndex", 50), L()
                                    });
                                    else {
                                        a.settings.adaptiveHeight && a.viewport.height() != p() && a.viewport.animate({
                                            height: p()
                                        }, a.settings.adaptiveHeightSpeed);
                                        var o = 0,
                                            i = {
                                                left: 0,
                                                top: 0
                                            };
                                        if (!a.settings.infiniteLoop && a.carousel && a.active.last)
                                            if ("horizontal" == a.settings.mode) {
                                                i = (s = a.children.eq(a.children.length - 1)).position(), o = a.viewport.width() - s.outerWidth()
                                            } else {
                                                var d = a.children.length - a.settings.minSlides;
                                                i = a.children.eq(d).position()
                                            } else if (a.carousel && a.active.last && "prev" == r) {
                                            var s, l = 1 == a.settings.moveSlides ? a.settings.maxSlides - g() : (f() - 1) * g() - (a.children.length - a.settings.maxSlides);
                                            i = (s = n.children(".bx-clone").eq(l)).position()
                                        } else if ("next" == r && 0 == a.active.index) i = n.find("> .bx-clone").eq(a.settings.maxSlides).position(), a.active.last = !1;
                                        else if (t >= 0) {
                                            var c = t * g();
                                            i = a.children.eq(c).position()
                                        }
                                        if (void 0 !== i) {
                                            var h = "horizontal" == a.settings.mode ? -(i.left - o) : -i.top;
                                            x(h, "slide", a.settings.speed)
                                        }
                                    }
                            }, n.goToNextSlide = function() {
                                if (a.settings.infiniteLoop || !a.active.last) {
                                    var e = parseInt(a.active.index) + 1;
                                    n.goToSlide(e, "next")
                                }
                            }, n.goToPrevSlide = function() {
                                if (a.settings.infiniteLoop || 0 != a.active.index) {
                                    var e = parseInt(a.active.index) - 1;
                                    n.goToSlide(e, "prev")
                                }
                            }, n.startAuto = function(e) {
                                a.interval || (a.interval = setInterval(function() {
                                    "next" == a.settings.autoDirection ? n.goToNextSlide() : n.goToPrevSlide()
                                }, a.settings.pause), a.settings.autoControls && 1 != e && M("stop"))
                            }, n.stopAuto = function(e) {
                                a.interval && (clearInterval(a.interval), a.interval = null, a.settings.autoControls && 1 != e && M("start"))
                            }, n.getCurrentSlide = function() {
                                return a.active.index
                            }, n.getSlideCount = function() {
                                return a.children.length
                            }, n.redrawSlider = function() {
                                a.children.add(n.find(".bx-clone")).outerWidth(m()), a.viewport.css("height", p()), a.settings.ticker || w(), a.active.last && (a.active.index = f() - 1), a.active.index >= f() && (a.active.last = !0), a.settings.pager && !a.settings.pagerCustom && (y(), P(a.active.index))
                            }, n.destroySlider = function() {
                                a.initialized && (a.initialized = !1, e(".bx-clone", this).remove(), a.children.each(function() {
                                    void 0 != e(this).data("origStyle") ? e(this).attr("style", e(this).data("origStyle")) : e(this).removeAttr("style")
                                }), void 0 != e(this).data("origStyle") ? this.attr("style", e(this).data("origStyle")) : e(this).removeAttr("style"), e(this).unwrap().unwrap(), a.controls.el && a.controls.el.remove(), a.controls.next && a.controls.next.remove(), a.controls.prev && a.controls.prev.remove(), a.pagerEl && a.pagerEl.remove(), e(".bx-caption", this).remove(), a.controls.autoEl && a.controls.autoEl.remove(), clearInterval(a.interval), a.settings.responsive && e(window).unbind("resize", z))
                            }, n.reloadSlider = function(e) {
                                void 0 != e && (o = e), n.destroySlider(), s()
                            }, s(), n.updatePager = function() {
                                a.settings.pager && !a.settings.pagerCustom && (y(), P(a.active.index))
                            }, n.data("bxSlider", a), this
                        }
                    }(jQuery)
                }).call(window)
            }).call(window)
        },
        DP1d: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.PhotosTab = o.PhotosTab || o.AbstractMediaTab.extend({
                    TAB_TEMPLATE: "#lbnPhotosTemplate",
                    SLIDER_SELECTOR: ".dl-photoslider:visible",
                    slider: null,
                    sliderContainer: null,
                    tabTemplate: null,
                    constructor: function(e, t, r, o, a, n) {
                        this.base({
                            context: e,
                            player: n,
                            isMyLb: t,
                            container: r,
                            selectorContainer: o,
                            type: "photos",
                            tabSize: a,
                            contentTemplate: "#lbnPhotoEntryTemplate",
                            contentContainer: "ul.detail-photo-slider",
                            contentType: ["photo"]
                        })
                    },
                    render: function() {
                        this.base(), this.sliderContainer = this.container.find(this.SLIDER_SELECTOR), this.tabTemplate = this.context.config.getOrCreate(this.TAB_TEMPLATE), this.container.html(this.tabTemplate.tmpl({
                            player: this.context.leaderboardModel.players[this.pid],
                            tags: this.mediaTags
                        })), this.context.dataLoader.loadPhotos(this.pid)
                    },
                    afterRender: function() {
                        this.sliderContainer && (this.slider && this.slider.destroySlider && this.slider.destroySlider(), this.slider = this.sliderContainer.bxSlider({
                            controls: !1
                        }))
                    }
                })
            }(jQuery, window, pgatour)
        },
        Dg37: function(e, t, r) {
            (e.exports = r("I1BE")()).push([e.i, '.clearfix:after,.clearfix:before{display:table;content:"";line-height:0}.headerWrapper,.moduleHeader{border-bottom:1px solid #ccc}@font-face{font-family:NanumGothicBold;src:url(' + r("ILh9") + ");src:url(" + r("ILh9") + "?#iefix) format('embedded-opentype'),url(" + r("6WOd") + ") format('woff2'),url(" + r("inoD") + ") format('woff'),url(" + r("g4f6") + ") format('truetype'),url(" + r("TaUw") + "#NanumGothicBold) format('svg')}@font-face{font-family:NanumGothicRegular;src:url(" + r("7go+") + ");src:url(" + r("7go+") + "?#iefix) format('embedded-opentype'),url(" + r("7kdD") + ") format('woff2'),url(" + r("OISa") + ") format('woff'),url(" + r("a9T5") + ") format('truetype'),url(" + r("Tit0") + "#NanumGothicRegular) format('svg')}.clearfix:after{clear:both}.headerWrapper{padding:14px 0 18px 20px}.box-sizing{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.moduleBottom{padding:3px 0 0;height:45px}.moduleBottom .module-bottom-social{float:left;padding-left:15px}.moduleBottom .module-bottom-more{float:right;text-align:right;margin-top:4px}.moduleBottom .module-bottom-more a{color:#000;text-transform:uppercase;font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:18px;line-height:28px;padding-right:15px}.locale-ko .moduleBottom .module-bottom-more a{font-family:'NanumGothicRegular ',sans-serif}.moduleBottom .module-bottom-more a:before{content:'\\203A';font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:26px;line-height:28px;margin-right:3px}.locale-ko .moduleBottom .module-bottom-more a:before{font-family:'NanumGothicBold ',sans-serif}.moduleBottom .module-bottom-more a strong{font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .moduleBottom .module-bottom-more a strong{font-family:'NanumGothicBold ',sans-serif}.moduleHeader{padding:16px 15px;height:50px;position:relative}.moduleHeader.with-sponsor .header-info{margin-right:170px}.moduleHeader .title{font-size:28px;line-height:28px;font-family:'Roboto Condensed',sans-serif;font-weight:400;margin-bottom:2px}.locale-ko .moduleHeader .title{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .title .live{margin-left:3px;color:#FFF;background:#FB0000;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:16px;line-height:18px;padding:2px 5px;text-transform:uppercase;vertical-align:middle}.locale-ko .moduleHeader .title .live{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .subtitle{font-size:18px;line-height:20px;font-family:'Roboto Condensed',sans-serif;font-weight:400}.locale-ko .moduleHeader .subtitle{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .sponsor{position:absolute;right:15px;bottom:15px}.moduleHeader .control{position:absolute;right:15px;top:15px;display:none;width:70px}.moduleHeader .control .btn{border:2px solid #00284B;border-radius:5px;display:block;cursor:pointer;color:#00284B;font-size:16px;line-height:26px;font-family:'Roboto Condensed',sans-serif;font-weight:700;text-align:center;text-transform:uppercase}.locale-ko .moduleHeader .control .btn{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .control .btn.full{width:100%}.moduleHeader .control .btn.half{width:40%;float:right}.moduleHeader .control .btn.half:first-child{float:left}@media (min-width:768px) and (max-width:979px){.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .control{display:block}}@media (max-width:767px){.moduleBottom{height:auto}.moduleBottom .module-bottom-social{float:none;text-align:center;padding:10px}.moduleBottom .module-bottom-more{float:none;padding:10px}.moduleHeader{padding:16px 10px}.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .title{font-size:24px}.moduleHeader .title .live{font-size:12px;line-height:14px}.moduleHeader .control{display:block}}.module-drawer-modal .scorecard .hidden-hole,.module-drawer-modal .scorecards .hidden-hole,.module-drawer-modal .scorecards-box .bx-pager,.module-drawer-modal .scorecards-box .scorecards-slider .second,.module-drawer-modal.without-top-ad .window .top-ad{display:none}.module-drawer-modal{display:none;padding:1px;margin:-1px}.module-drawer-modal .scorecards-box .scorecards-slider{margin:0;list-style:none}.module-drawer-modal .scorecard,.module-drawer-modal .scorecards{width:100%;border-collapse:separate;border-spacing:0;text-align:center;font-size:13px;line-height:16px}.module-drawer-modal .scorecard th,.module-drawer-modal .scorecards th{position:relative;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAOBAMAAAAcbWtvAAAAKlBMVEUxMTExMTExMTEpKSkeHh4ZGRkVFRUTExMREREODg4MDAwKCgoICAgGBga6JJAZAAAADnRSTlMBBAYLExsjKzI4PUJHQ5pczFwAAAAkSURBVHheY2BgEGBQYDBgcGAIYEhgKGBoYJjAsIBhA8MBhgsAM0wFsSVacEsAAAAASUVORK5CYII=') 0 100% repeat-x #323232;border-top:1px solid #4F4F4F;border-right:1px solid #4F4F4F;border-bottom:1px solid #4F4F4F;font-weight:400;padding:0}.module-drawer-modal .scorecard th.first-col,.module-drawer-modal .scorecards th.first-col{padding-left:6px}.module-drawer-modal .scorecard th>div,.module-drawer-modal .scorecards th>div{position:relative}.module-drawer-modal .scorecard th>div a,.module-drawer-modal .scorecard th>div a:hover,.module-drawer-modal .scorecards th>div a,.module-drawer-modal .scorecards th>div a:hover{font-weight:400;color:#FFF;padding:11px 0 7px;display:block}.module-drawer-modal .scorecard th>div span,.module-drawer-modal .scorecards th>div span{color:#fff;display:block;padding:11px 0 7px}.module-drawer-modal .scorecard th.active,.module-drawer-modal .scorecards th.active{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") center -930px no-repeat #0F0F0F}.module-drawer-modal .scorecard th.first-col,.module-drawer-modal .scorecards th.first-col{text-align:left;font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .module-drawer-modal .scorecard th.first-col,.locale-ko .module-drawer-modal .scorecards th.first-col{font-family:'NanumGothicBold ',sans-serif}.module-drawer-modal .scorecard th.last-col,.module-drawer-modal .scorecards th.last-col{border-right:none;padding-right:25px}.module-drawer-modal .scorecard th .scorecards-next,.module-drawer-modal .scorecards th .scorecards-next{padding:0;position:absolute;right:-24px;top:1px;display:block;width:24px;height:32px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") -5px -172px no-repeat}.module-drawer-modal .scorecard th .scorecards-next:hover,.module-drawer-modal .scorecards th .scorecards-next:hover{padding:0}.module-drawer-modal .scorecard th .scorecards-prev,.module-drawer-modal .scorecards th .scorecards-prev{padding:0;position:absolute;right:-24px;top:1px;display:block;width:24px;height:32px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") -5px -211px no-repeat}.module-drawer-modal .scorecard th .scorecards-prev:hover,.module-drawer-modal .scorecards th .scorecards-prev:hover{padding:0}.module-drawer-modal .scorecard tbody tr:nth-child(odd) td,.module-drawer-modal .scorecards tbody tr:nth-child(odd) td{background:#323232}.module-drawer-modal .scorecard tbody tr:nth-child(even) td,.module-drawer-modal .scorecards tbody tr:nth-child(even) td{background:#444}.module-drawer-modal .scorecard tbody tr td,.module-drawer-modal .scorecards tbody tr td{border-right:1px solid #4F4F4F;border-bottom:1px solid #4F4F4F;position:relative;padding:0}.module-drawer-modal .scorecard tbody tr td>div,.module-drawer-modal .scorecards tbody tr td>div{padding:9px 6px 7px;position:relative}.module-drawer-modal .scorecard tbody tr td.active,.module-drawer-modal .scorecards tbody tr td.active{background:#1C1C1C}.module-drawer-modal .scorecard tbody tr td.double-eagle,.module-drawer-modal .scorecard tbody tr td.result-3,.module-drawer-modal .scorecards tbody tr td.double-eagle,.module-drawer-modal .scorecards tbody tr td.result-3{background:#6D98BB;color:#000}.module-drawer-modal .scorecard tbody tr td.eagle,.module-drawer-modal .scorecard tbody tr td.result-2,.module-drawer-modal .scorecards tbody tr td.eagle,.module-drawer-modal .scorecards tbody tr td.result-2{background:#32B1E4;color:#000}.module-drawer-modal .scorecard tbody tr td.birdie,.module-drawer-modal .scorecard tbody tr td.result-1,.module-drawer-modal .scorecards tbody tr td.birdie,.module-drawer-modal .scorecards tbody tr td.result-1{background:#AED4F6;color:#000}.module-drawer-modal .scorecard tbody tr td.par,.module-drawer-modal .scorecard tbody tr td.result0,.module-drawer-modal .scorecards tbody tr td.par,.module-drawer-modal .scorecards tbody tr td.result0{background:0 0}.module-drawer-modal .scorecard tbody tr td.bogey,.module-drawer-modal .scorecard tbody tr td.result1,.module-drawer-modal .scorecards tbody tr td.bogey,.module-drawer-modal .scorecards tbody tr td.result1{background:#F7B942;color:#000}.module-drawer-modal .scorecard tbody tr td.double-bogey,.module-drawer-modal .scorecard tbody tr td.result2,.module-drawer-modal .scorecards tbody tr td.double-bogey,.module-drawer-modal .scorecards tbody tr td.result2{background:#EE5A00;color:#000}.module-drawer-modal .scorecard tbody tr td.more-bogey,.module-drawer-modal .scorecard tbody tr td.result3,.module-drawer-modal .scorecards tbody tr td.more-bogey,.module-drawer-modal .scorecards tbody tr td.result3{background:#9F5924;color:#000}.module-drawer-modal .scorecard tbody tr td .has-video,.module-drawer-modal .scorecards tbody tr td .has-video{position:absolute;top:3px;right:3px;display:block;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") -27px -465px no-repeat;width:9px;height:6px}.module-drawer-modal .scorecard tbody tr td.first-col,.module-drawer-modal .scorecards tbody tr td.first-col{text-align:left;font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .module-drawer-modal .scorecard tbody tr td.first-col,.locale-ko .module-drawer-modal .scorecards tbody tr td.first-col{font-family:'NanumGothicBold ',sans-serif}.module-drawer-modal .scorecard tbody tr td.last-col,.module-drawer-modal .scorecards tbody tr td.last-col{border-right:none;padding-right:25px}.module-drawer-modal .video-modal-commentary{padding:15px 20px;overflow:hidden}.module-drawer-modal .window h1{color:#00182E;font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:28px;line-height:28px;margin:5px 0}.locale-ko .module-drawer-modal .window h1{font-family:'NanumGothicRegular ',sans-serif}.module-drawer-modal .window h2{color:#00182E;font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:16px;margin-top:0}.locale-ko .module-drawer-modal .window h2{font-family:'NanumGothicRegular ',sans-serif}.module-drawer-modal .window h3{text-transform:uppercase;color:#CBCBCB;font-size:12px;font-family:'Roboto Condensed',sans-serif;font-weight:700;margin:0}.locale-ko .module-drawer-modal .window h3{font-family:'NanumGothicBold ',sans-serif}.module-drawer-modal .window h3 span{color:#00182E}.module-drawer-modal .window .title{padding:30px 20px 0;border-bottom:1px solid #E6E6E6;position:relative}.module-drawer-modal .window .title .left{margin-right:260px;float:inherit}.module-drawer-modal .window .title .right{width:234px;position:absolute;top:25px;right:20px;float:inherit}.module-drawer-modal .window .leaderboard-modal-container .left{margin-right:320px;float:inherit}.module-drawer-modal .window .leaderboard-modal-container .left .video-player .innerWrapper{z-index:1!important}.module-drawer-modal .window .leaderboard-modal-container .right{position:absolute;top:20px;width:300px;right:20px;float:inherit}.module-drawer-modal .window .leaderboard-modal-container .right .media{padding-top:20px}.module-drawer-modal .window .leaderboard-modal-container .right .media .sharing{margin:0 15px 0 0;float:left}.module-drawer-modal .window .leaderboard-modal-container .right .media .sharing .icon{top:0;left:0}.module-drawer-modal .window .leaderboard-modal-container .right .media .sharing .text{padding-left:38px;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:14px;color:#00284B;line-height:35px}.module-drawer-modal .window.shottracker .related-videos .bx-wrapper .bx-controls .bx-pager,.module-drawer-modal .window.shottracker .related-videos .slider{padding:0}.locale-ko .module-drawer-modal .window .leaderboard-modal-container .right .media .sharing .text{font-family:'NanumGothicBold ',sans-serif}.module-drawer-modal .overlay{position:absolute;top:0;left:0;right:0;height:20000px;background:#DDD;opacity:.95;z-index:6}.module-drawer-modal .window{position:relative;background:#FFF;width:87%;z-index:7;max-width:1100px;margin:0 auto -20000px}.module-drawer-modal .window.shottracker .related-videos{display:none;background:#FFF}.module-drawer-modal .window.shottracker .related-videos h1,.module-drawer-modal .window.shottracker .related-videos h3{display:none}.module-drawer-modal .window.shottracker .related-videos .bx-wrapper{margin-bottom:60px}.module-drawer-modal .window.shottracker .related-videos .bx-wrapper .bx-controls{top:auto;right:0;left:0;bottom:-53px;text-align:center}.module-drawer-modal .window.shottracker .related-videos .bx-wrapper .bx-controls .bx-pager .bx-pager-item{float:none;display:inline-block}.module-drawer-modal .window.shottracker .related-videos .bx-wrapper .bx-controls-direction{display:none}.module-drawer-modal .window.shottracker .related-videos .thumb{width:25%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:0 12px;height:auto}.module-drawer-modal .window.shottracker .related-videos .thumb img{width:100%;height:auto}.module-drawer-modal .window.shottracker .related-videos .thumb .thumb-img{position:relative;top:auto;right:auto;bottom:auto;left:auto}.module-drawer-modal .window.shottracker .related-videos .thumb .thumb-img:before{content:\"\";position:absolute;top:0;right:0;bottom:0;left:0;z-index:9;background:-moz-linear-gradient(top,rgba(0,0,0,0) 30%,rgba(0,0,0,.65) 100%);background:-webkit-linear-gradient(top,rgba(0,0,0,0) 30%,rgba(0,0,0,.65) 100%);background:linear-gradient(to bottom,rgba(0,0,0,0) 30%,rgba(0,0,0,.65) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#a6000000', GradientType=0)}.module-drawer-modal .window.shottracker .related-videos .thumb .thumb-info{position:absolute;top:auto;max-height:48px;overflow:hidden;left:20px;right:20px;bottom:16px;padding:0;color:#FFF;display:block;text-decoration:none;text-align:left;font-size:14px;line-height:16px;z-index:10}.module-drawer-modal .window.shottracker .related-videos .thumb .thumb-info .franchise{text-transform:uppercase;color:#CBCBCB;font-size:12px}.module-drawer-modal .window.shottracker .related-videos .thumb .thumb-info .title{font-family:'Roboto Condensed',sans-serif;font-weight:400;color:#FFF;font-size:14px;line-height:16px;display:block;text-shadow:0 0 2px rgba(0,0,0,.5)}.locale-ko .module-drawer-modal .window.shottracker .related-videos .thumb .thumb-info .title{font-family:'NanumGothicRegular ',sans-serif}.module-drawer-modal .window.shottracker .related-videos .thumb .video-length{display:block;position:absolute;z-index:10;right:12px;bottom:0;background:rgba(0,0,0,.5);color:#FFF;font-size:12px;line-height:14px;padding:3px 5px 1px}.module-drawer-modal .window.shottracker .related-videos .thumb .thumb-video{top:37%}.module-drawer-modal .window .close-icon{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") right top no-repeat;height:36px;width:36px;top:-30px;position:absolute;right:-47px;z-index:7;cursor:pointer}.module-drawer-modal .window .related-videos{padding:10px 13px;background:#F4F4F4;overflow:hidden}.module-drawer-modal .window .related-videos h3{color:#333;padding-left:7px}.module-drawer-modal .window .related-videos h1{text-transform:uppercase;padding-left:7px}.module-drawer-modal .window .related-videos .slider{padding-top:15px;position:relative}.module-drawer-modal .window .related-videos .slider ul{margin:0;padding:0}.module-drawer-modal .window .related-videos .bx-wrapper .bx-controls{position:absolute;top:-45px;right:0}.module-drawer-modal .window .related-videos .bx-wrapper .bx-controls .bx-pager{position:relative;padding:15px 50px 0}.module-drawer-modal .window .related-videos .bx-wrapper .bx-controls .bx-pager .bx-pager-item{display:block;float:left}.module-drawer-modal .window .related-videos .bx-wrapper .bx-controls .bx-controls-direction a{width:33px;height:33px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") no-repeat}.module-drawer-modal .window .related-videos .bx-wrapper .bx-controls .bx-controls-direction a.bx-next{background-position:-33px 0}.module-drawer-modal .window .related-videos .thumb{width:25%;height:220px;float:left}.module-drawer-modal .window .related-videos .thumb .thumb-img{top:0;left:7px;right:7px;bottom:80px;background:0 0}.module-drawer-modal .window .related-videos .thumb .thumb-video{cursor:pointer}.module-drawer-modal .window .related-videos .thumb .thumb-info{height:70px;padding:0 7px;overflow:hidden;z-index:2}.module-drawer-modal .window .related-videos .thumb .thumb-info .franchise{text-transform:uppercase;color:#CBCBCB;font-size:12px}.module-drawer-modal .window .related-videos .thumb .thumb-info .title{display:block;color:#00284B;font-size:19px;padding:0;border:none;line-height:23px}.module-drawer-modal .window .related-videos .thumb .video-length,.module-drawer-modal .window .round-selector-container.mobile{display:none}.module-drawer-modal .window .nav{margin-bottom:0}.module-drawer-modal .window .header-container{display:flex}.module-drawer-modal .window .header-container .top-ad{margin-right:15px}.module-drawer-modal .window .header-container .name{font-size:28px;line-height:30px;font-family:'Roboto Condensed',sans-serif;font-weight:400;padding:15px 0 15px 17px;margin:0}.locale-ko .module-drawer-modal .window .header-container .name{font-family:'NanumGothicRegular ',sans-serif}.module-drawer-modal .window .header-container .tab-controls{display:flex;justify-content:flex-end;flex:1}.module-drawer-modal .window .header-container .tab-controls .nav-item{flex:0 1 auto;align-self:flex-end;display:inline-block;white-space:nowrap;margin:0 15px}.module-drawer-modal .window .header-container .tab-controls .nav-item.active a{cursor:default;padding:3px 0 0;font-family:'Roboto Condensed',sans-serif;font-weight:700;color:#003e7e;border-bottom:4px solid #003e7e}.locale-ko .module-drawer-modal .window .header-container .tab-controls .nav-item.active a{font-family:'NanumGothicBold ',sans-serif}.module-drawer-modal .window .header-container .tab-controls .nav-item a{font-family:'Roboto Condensed',sans-serif;font-weight:400;padding:3px 0 4px;text-transform:uppercase;font-size:16px;line-height:42px;color:#000;border:none;background:0 0;position:relative}.locale-ko .module-drawer-modal .window .header-container .tab-controls .nav-item a{font-family:'NanumGothicRegular ',sans-serif}.module-drawer-modal .window .header-container .tab-controls .nav-item a.new-video:after{content:\"\";width:6px;height:6px;background:#EA0203;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;display:block;position:absolute;right:-7px;top:10px}.module-drawer-modal .window .tab-shottracker .leaderboard-modal-container{padding-bottom:0}.module-drawer-modal .window .leaderboard-modal-container{position:relative;padding:20px;border-bottom:none;min-height:405px}.module-drawer-modal .window .leaderboard-modal-container .play-video-button{font-family:'Roboto Condensed',sans-serif;font-weight:400;color:#FFF;font-size:14px;line-height:16px;text-transform:uppercase;background:#003e7e;padding:6px 15px 4px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;position:absolute;top:15px;left:15px;cursor:pointer;z-index:100;display:none}.locale-ko .module-drawer-modal .window .leaderboard-modal-container .play-video-button{font-family:'NanumGothicRegular ',sans-serif}.module-drawer-modal .window .leaderboard-modal-container .play-video-button:before{content:\"\";display:inline-block;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") -30px -42px no-repeat;width:15px;height:10px;margin-right:7px}.module-drawer-modal .window .leaderboard-modal-container .small-screen-hole-switcher{display:none}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-wrapper{position:relative}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-wrapper .shot-tracker-legend-container.legend{position:absolute;bottom:0;color:#FFF;text-align:center;width:100%}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-wrapper .tablet-video-slider{display:none;position:absolute;top:0;left:0;right:0;bottom:0;z-index:100}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-container{min-height:336px;background:#424141;overflow:hidden;padding-right:40px}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-container .canvas svg{display:block;width:740px;height:336px}@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-container .canvas svg{min-height:336px}}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-legend-container{text-align:center;padding:2px 0 4px}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-legend-container .player{display:inline-block;padding-left:15px;margin:0 10px;position:relative}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-legend-container .player:before{content:'';position:absolute;left:0;top:4px;width:10px;height:10px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-legend-container .player.player-yellow:before{background:#f3e52f}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-legend-container .player.player-red:before{background:#ea0203}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-legend-container .player.player-green:before{background:#0f0}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-legend-container .player.player-blue:before{background:#0eebde}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-legend-container .player.player-tsp-1:before{background:#0D4CFF}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-legend-container .player.player-tsp-2:before{background:#5BA7FD}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-legend-container.mobile{display:none}.module-drawer-modal .window .leaderboard-modal-container .left{position:relative}.module-drawer-modal .window .leaderboard-modal-container .zoom-switcher .btn{display:block;position:absolute;z-index:6;right:15px;top:15px;width:28px;height:26px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") no-repeat;font-size:0;text-indent:-9999px;cursor:pointer}.module-drawer-modal .window .leaderboard-modal-container .zoom-switcher .btn.zoom-in{background-position:-66px -89px}.module-drawer-modal .window .leaderboard-modal-container .zoom-switcher .btn.zoom-out{background-position:-33px -89px}.module-drawer-modal .window .leaderboard-modal-container .group-single-switcher .btn{display:block;position:absolute;z-index:6;width:28px;height:26px;right:15px;top:49px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") no-repeat;font-size:0;text-indent:-9999px;cursor:pointer}.module-drawer-modal .window .leaderboard-modal-container .group-single-switcher .btn.view-group{background-position:0 -89px}.module-drawer-modal .window .leaderboard-modal-container .group-single-switcher .btn.view-single{background-position:0 -120px}.module-drawer-modal .window .leaderboard-modal-container .marker-tool-tip{position:absolute;background:#FFF;width:190px;padding:8px;font-size:14px;border:1px solid #000;z-index:6}.module-drawer-modal .window .leaderboard-modal-container .right{bottom:20px}.module-drawer-modal .window .leaderboard-modal-container .right .comments-toggle{position:absolute;bottom:0}.module-drawer-modal .window .leaderboard-modal-container .right .comments-toggle .comments-toggle-button{display:inline-block;text-transform:uppercase;font-size:11px;width:120px;height:19px;line-height:19px;background:#00284B;color:#FFF;text-align:center;cursor:pointer}.module-drawer-modal .window .leaderboard-modal-container .right .comments-toggle .comments-count-bubble{display:inline-block;height:17px;padding:0 5px;line-height:17px;border:1px solid #BABABA;font-size:10px;margin-left:3px;position:relative}.module-drawer-modal .window .leaderboard-modal-container .right .comments-toggle .comments-count-bubble:before{content:'';display:block;width:4px;height:5px;position:absolute;left:-4px;top:6px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") -68px -59px no-repeat}.module-drawer-modal .window .leaderboard-modal-container .right .round-selector-container{padding:20px 0 5px}.module-drawer-modal .window .leaderboard-modal-container .right .round-selector-container .hasCustomSelect{width:92px;height:25px;line-height:25px;padding-left:6px;font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .module-drawer-modal .window .leaderboard-modal-container .right .round-selector-container .hasCustomSelect{font-family:'NanumGothicBold ',sans-serif}.module-drawer-modal .window .leaderboard-modal-container .right .round-selector-container span.customSelect{background-position:right -606px}.module-drawer-modal .window .leaderboard-modal-container .right .round-selector-container .label{font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:12px;line-height:14px;text-transform:uppercase;color:#000;display:inline-block;vertical-align:middle}.locale-ko .module-drawer-modal .window .leaderboard-modal-container .right .round-selector-container .label{font-family:'NanumGothicBold ',sans-serif}.module-drawer-modal .window .leaderboard-modal-container .right .round-selector-container .round{display:inline-block;vertical-align:middle;width:26px;height:26px;line-height:27px;font-size:14px;font-family:'Roboto Condensed',sans-serif;font-weight:700;color:#000;border:1px solid #000;text-align:center;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;margin-left:6px;cursor:pointer;overflow:hidden}.locale-ko .module-drawer-modal .window .leaderboard-modal-container .right .round-selector-container .round{font-family:'NanumGothicBold ',sans-serif}.module-drawer-modal .window .leaderboard-modal-container .right .round-selector-container .round.active{color:#FFF;background:#000;cursor:default}.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info .details-map-hole{font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .module-drawer-modal .window .leaderboard-modal-container .right .details-map-info .details-map-hole{font-family:'NanumGothicBold ',sans-serif}.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info .details-map-par,.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info .details-map-rank{display:block}.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info .coma,.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info .details-map-yds{float:left}.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info .details-map-rank{clear:both}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider{list-style:none;margin:0;padding:0}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider li{width:100%}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards .scorecards-next{background:#666}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards .scorecards-next:before{content:'';position:absolute;display:block;width:7px;height:12px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") 0 -69px no-repeat;top:50%;left:50%;margin-left:-3px;margin-top:-6px}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards .scorecards-prev{background:#666}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards .scorecards-prev:before{content:'';position:absolute;display:block;width:7px;height:12px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") -14px -69px no-repeat;top:50%;left:50%;margin-left:-3px;margin-top:-6px}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th{background:#FFF;color:#2D2D2D;border-color:#C6C6C6;font-size:16px}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td .has-video,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th .has-video{display:block;margin:0 auto;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") -10px -42px no-repeat;width:15px;height:10px;position:static}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td:first-child,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th:first-child{border-left:solid 1px #C6C6C6}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td:last-child,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th:last-child{border-right:solid 1px #C6C6C6}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td a,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td span,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th a,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th span{color:#2D2D2D}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.active,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.active{background:#F0F0F0}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.double-eagle,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.result-3,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.double-eagle,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.result-3{background:#6D98BB}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.eagle,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.result-2,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.eagle,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.result-2{background:#32B1E4}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.birdie,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.result-1,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.birdie,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.result-1{background:#AED4F6}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.par,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.result0,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.par,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.result0{background:0 0}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.bogey,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.result1,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.bogey,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.result1{background:#F7B942}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.double-bogey,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.result2,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.double-bogey,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.result2{background:#EE5A00}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.more-bogey,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr td.result3,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.more-bogey,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.result3{background:#9F5924}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th{background:#F0F0F0}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.double-eagle,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.result-3,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.double-eagle,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.result-3{background:#6D98BB}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.eagle,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.result-2,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.eagle,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.result-2{background:#32B1E4}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.birdie,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.result-1,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.birdie,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.result-1{background:#AED4F6}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.par,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.result0,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.par,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.result0{background:0 0}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.bogey,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.result1,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.bogey,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.result1{background:#F7B942}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.double-bogey,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.result2,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.double-bogey,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.result2{background:#EE5A00}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.more-bogey,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) td.result3,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.more-bogey,.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr:nth-child(even) th.result3{background:#9F5924}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th{background:#F0F0F0}.module-drawer-modal .window .leaderboard-modal-container .scorecards-table .scorecards-slider .scorecards tr th.active:before{content:'';background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") 0 -56px no-repeat;width:9px;height:5px;position:absolute;top:4px;left:50%;margin-left:-4px}.module-drawer-modal .window .leaderboard-modal-container .details-footnote{font-size:13px;padding-left:13px;padding-top:6px}.module-drawer-modal .window .leaderboard-modal-container .details-footnote p{position:relative;padding-left:18px;padding-right:12px}.module-drawer-modal .window .leaderboard-modal-container .details-footnote p:before{content:'';display:block;position:absolute;left:0;top:3px;width:12px;height:12px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px}.module-drawer-modal .window .leaderboard-modal-container .details-footnote p.double-eagle:before{background:#6D98BB}.module-drawer-modal .window .leaderboard-modal-container .details-footnote p.eagle:before{background:#32B1E4}.module-drawer-modal .window .leaderboard-modal-container .details-footnote p.birdie:before{background:#AED4F6}.module-drawer-modal .window .leaderboard-modal-container .details-footnote p.par:before{background:#A2A7AB}.module-drawer-modal .window .leaderboard-modal-container .details-footnote p.bogey:before{background:#F7B942}.module-drawer-modal .window .leaderboard-modal-container .details-footnote p.double-bogey:before{background:#EE5A00}.module-drawer-modal .window .leaderboard-modal-container .details-footnote p.more-bogey:before{background:#9F5924}.module-drawer-modal .window .leaderboard-modal-container .details-footnote p.video:before{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") 0 -42px no-repeat;width:9px;height:6px;top:6px}.module-drawer-modal .window .green-view-enabled .leaderboard-modal-container .shot-tracker-container{padding-right:0}.module-drawer-modal .window .leaderboard-modal-commentary{padding:19px}.module-drawer-modal .window .portrait-view{display:none}#leaderboardModalOverlay{position:fixed;top:0;right:0;bottom:0;left:0;z-index:10;background:#000;display:none}#leaderboardModalOverlay .close-button{width:35px;height:35px;position:fixed;z-index:100000;top:20px;right:20px;border-radius:17px;background:#fff;font-size:40px;text-align:center;opacity:.3}#leaderboardModalOverlay .close-button span{vertical-align:middle}@media (min-width:980px) and (max-width:1150px){.module-drawer-modal .window{width:97%}.module-drawer-modal .window .close-icon{top:-50px;right:0}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-container{min-height:288px}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-container .canvas svg{width:100%;height:100%}.module-drawer-modal .window .leaderboard-modal-container .details-footnote{font-size:12px;padding-left:7px;white-space:nowrap}.module-drawer-modal .window .leaderboard-modal-container .right .media{padding-top:0}}@media (min-width:768px) and (max-width:979px){.module-drawer-modal .window{min-width:768px;width:97%}.module-drawer-modal .window .close-icon{top:-50px;right:0}.module-drawer-modal .window .tab-videos .leaderboard-modal-container{height:auto}.module-drawer-modal .window .tab-videos .leaderboard-modal-container .left .shot-tracker-container{margin-bottom:0}.module-drawer-modal .window .tab-videos .leaderboard-modal-container .right{top:0;padding-bottom:40px}.module-drawer-modal .window .leaderboard-modal-container{height:745px;overflow-y:hidden;padding:16px;border-bottom:none}.module-drawer-modal .window .leaderboard-modal-container .left{margin-right:0}.module-drawer-modal .window .leaderboard-modal-container .left .shot-tracker-container{margin-bottom:170px;min-height:300px}.module-drawer-modal .window .leaderboard-modal-container .left .shot-tracker-container .canvas svg{width:100%;height:100%}.module-drawer-modal .window .leaderboard-modal-container .right{position:relative;top:-350px;width:auto;right:inherit;text-align:left;padding-top:20px}.module-drawer-modal .window .leaderboard-modal-container .right .ad-new{display:block;text-align:center}.module-drawer-modal .window .leaderboard-modal-container .right .round-selector-container{display:inline-block;text-align:left;padding-top:13px}.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info-container{display:inline-block;position:relative;margin-left:12px;padding-top:16px}.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info-container .details-map-info{font-size:0}.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info-container .details-map-info .coma,.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info-container .details-map-info .details-map-hole,.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info-container .details-map-info .details-map-par,.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info-container .details-map-info .details-map-rank{font-size:16px;padding-right:5px}.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info-container .details-map-info .details-map-par,.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info-container .details-map-info .details-map-rank{display:inline}.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info-container .details-map-info .coma,.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info-container .details-map-info .details-map-yds{float:none;font-size:16px}.module-drawer-modal .window .leaderboard-modal-container .right .details-map-info-container .details-map-info .details-map-rank{clear:inherit;font-size:16px}.module-drawer-modal .window .leaderboard-modal-container .right .media{padding-bottom:30px;margin-left:0}.module-drawer-modal .window .leaderboard-modal-container .right .media .link-box{display:inline-block}}@media (max-width:767px){.module-drawer-modal,.module-drawer-modal .window .header-container .name,.module-drawer-modal .window .header-container .tab-controls{display:none}.module-drawer-modal.without-top-ad .window{padding-top:43px}.module-drawer-modal.without-top-ad .window .round-selector-container{top:8px}.module-drawer-modal .overlay{position:fixed;top:-100%;bottom:-100%;left:-100%;right:-100%;background:#000;opacity:1}.module-drawer-modal .window{position:fixed;margin:0!important;width:100%;padding-top:43px;background:#000}.module-drawer-modal .window .rotate-screen{margin-top:40%;height:95px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/rotate-screen.png\") center center no-repeat}.module-drawer-modal .window .rotate-message{font-family:'Roboto Condensed',sans-serif;font-weight:300;font-size:18px;margin:27px auto 0;width:200px;line-height:24px;text-align:center;color:#FFF;letter-spacing:.5px}.locale-ko .module-drawer-modal .window .rotate-message{font-family:'NanumGothicRegular ',sans-serif}.module-drawer-modal .window .top-ad{position:absolute;right:43px;top:6px}.module-drawer-modal .window .round-selector-container{position:absolute;top:8px;left:10px}.module-drawer-modal .window .round-selector-container.mobile{display:block}.module-drawer-modal .window .round-selector-container.mobile .label{font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:12px;line-height:14px;text-transform:uppercase;color:#D9D9D9;display:inline-block;vertical-align:middle}.locale-ko .module-drawer-modal .window .round-selector-container.mobile .label{font-family:'NanumGothicBold ',sans-serif}.module-drawer-modal .window .round-selector-container.mobile .round{display:inline-block;vertical-align:middle;width:26px;height:26px;line-height:27px;font-size:14px;font-family:'Roboto Condensed',sans-serif;font-weight:700;color:#D9D9D9;background:#474747;border:1px solid #D9D9D9;text-align:center;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;margin-left:6px;cursor:pointer;overflow:hidden}.locale-ko .module-drawer-modal .window .round-selector-container.mobile .round{font-family:'NanumGothicBold ',sans-serif}.module-drawer-modal .window .round-selector-container.mobile .round.active{color:#FFF;background:#323232;cursor:default}.module-drawer-modal .window .close-icon{top:7px;right:7px;width:29px;height:29px;background-position:-91px -47px}.module-drawer-modal .window .leaderboard-modal-container{padding:0;min-height:inherit;overflow:hidden;border-bottom:none}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-container{min-height:inherit}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-container .canvas svg{width:100%;height:100%}.module-drawer-modal .window .leaderboard-modal-container .small-screen-hole-switcher{display:block;position:absolute;z-index:1;top:10px;left:10px;height:24px;font-size:16px;line-height:24px;color:#FFF;text-transform:uppercase;text-shadow:1px 1px 1px rgba(0,0,0,.8);font-family:'Roboto Condensed',sans-serif;font-weight:400}.locale-ko .module-drawer-modal .window .leaderboard-modal-container .small-screen-hole-switcher{font-family:'NanumGothicRegular ',sans-serif}.module-drawer-modal .window .leaderboard-modal-container .small-screen-hole-switcher .details-map-info span{float:left}.module-drawer-modal .window .leaderboard-modal-container .small-screen-hole-switcher .details-map-info .coma,.module-drawer-modal .window .leaderboard-modal-container .small-screen-hole-switcher .details-map-info .details-map-hole,.module-drawer-modal .window .leaderboard-modal-container .small-screen-hole-switcher .details-map-info .details-map-par{padding-right:5px}.module-drawer-modal .window .leaderboard-modal-container .small-screen-hole-switcher .details-map-hole{font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .module-drawer-modal .window .leaderboard-modal-container .small-screen-hole-switcher .details-map-hole{font-family:'NanumGothicBold ',sans-serif}.module-drawer-modal .window .leaderboard-modal-container .small-screen-hole-switcher .next-hole{width:19px;height:24px;background-color:rgba(255,255,255,.2);font-size:0;text-indent:-9999px;display:inline-block;position:relative;top:-5px;margin-left:6px}.module-drawer-modal .window .leaderboard-modal-container .small-screen-hole-switcher .next-hole:before{content:'';display:block;width:7px;height:12px;position:absolute;top:6px;left:6px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") 0 -69px no-repeat}.module-drawer-modal .window .leaderboard-modal-container .small-screen-hole-switcher .prev-hole{width:19px;height:24px;background-color:rgba(255,255,255,.2);font-size:0;text-indent:-9999px;display:inline-block;position:relative;top:-5px;margin-right:6px}.module-drawer-modal .window .leaderboard-modal-container .small-screen-hole-switcher .prev-hole:before{content:'';display:block;width:7px;height:12px;position:absolute;top:6px;left:6px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/drawer-modal/img/sprite.png\") -14px -69px no-repeat}.module-drawer-modal .window .leaderboard-modal-container .left .scorecards-table,.module-drawer-modal .window .leaderboard-modal-container .right{display:none}.module-drawer-modal .window .leaderboard-modal-container .details-map-legend{color:#FFF}.module-drawer-modal .window .leaderboard-modal-container .left{margin-right:0}.module-drawer-modal .window .leaderboard-modal-container .left .zoom-switcher .btn{top:8px;right:8px}.module-drawer-modal .window .leaderboard-modal-container .left .group-single-switcher .btn{top:8px;right:42px}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-legend-container{position:absolute;z-index:5;bottom:5px;width:100%;text-align:center}.module-drawer-modal .window .leaderboard-modal-container .shot-tracker-legend-container.mobile.show{display:block}.module-drawer-modal .window .leaderboard-modal-container .play-video-button{display:none}#leaderboardModalOverlay .oo-player-container .oo-state-screen .oo-state-screen-poster{background-size:contain}#leaderboardModalOverlay .oo-player-container .oo-player{position:absolute!important}#leaderboardModalOverlay .close-button{line-height:30px}}@media (max-width:767px) and (orientation:landscape){.module-drawer-modal .landscape-view circle,.module-drawer-modal .landscape-view path{z-index:10}.module-drawer-modal .portrait-view{display:none}}@media (max-width:767px) and (orientation:portrait){.module-drawer-modal .window{padding-top:81px}.module-drawer-modal .window .portrait-view{display:block}.module-drawer-modal .window .close-icon{right:7px}.module-drawer-modal .window .round-selector-container{top:42px}.module-drawer-modal .window .leaderboard-modal-container .left .landscape-view{opacity:1}.module-drawer-modal .window .leaderboard-modal-container .left .landscape-view .group-single-switcher .btn{top:82px;right:15px}.module-drawer-modal .window .leaderboard-modal-container .left .landscape-view .zoom-switcher,.module-drawer-modal .window .leaderboard-modal-container .left .landscape-view .zoom-switcher .btn{top:45px;right:15px}.module-drawer-modal .leaderboard-modal-container,.module-drawer-modal .left,.module-drawer-modal .tab-shottracker,.module-drawer-modal .tabs-container,.module-drawer-modal .window{height:100%}}", ""])
        },
        H2BB: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.DrawerVideoRow = o.DrawerVideoRow || r.BaseCssCloudinaryModule.extend({
                    SLIDER_SELECTOR: ".dl-photoslider",
                    constructor: function(e, t) {
                        this.base(e, t), this.renderVideos(), this.listenImagesLoad()
                    },
                    listenImagesLoad: function() {
                        var e = this.container.find("img[data-src]:visible").first();
                        e.on("load", this.proxy(this.onImageLoaded)), e[0] && e[0].complete && e.load()
                    },
                    onImageLoaded: function() {
                        this.config.customEventTracker.trackVideoRowRender()
                    },
                    renderVideos: function() {
                        var e = this.$container.find(this.SLIDER_SELECTOR);
                        e.empty();
                        for (var t = this.config.videos.items, r = 0; r < t.length; r++) this.config.template.tmpl({
                            item: t[r],
                            utils: this.config.utils
                        }).appendTo(e);
                        this.applyCloudinary(), this.initVideoThumbs();
                        var o = t.length > 4;
                        this.slider = this.renderSlider(e, o), this.slider.find(".thumb").unbind("click.omniture").on("click.omniture", this.proxy(this.onVideoClicked))
                    },
                    update: function() {
                        this.slider.destroySlider(), this.renderVideos()
                    },
                    layout: function() {
                        this.isLargeScreen() && this.slider.redrawSlider()
                    },
                    renderSlider: function(e, t) {
                        return e.bxSlider({
                            controls: !1,
                            slideWidth: 280,
                            pager: t,
                            infiniteLoop: !1,
                            minSlides: 4,
                            maxSlides: 4,
                            slideMargin: 20
                        })
                    },
                    onVideoClicked: function(e) {
                        this.config.analytics.drawerVideoRowThumbnailTapped(this.config.pid, e.currentTarget)
                    }
                })
            }(jQuery, window, pgatour)
        },
        JN8H: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.PlayerRow = o.PlayerRow || r.BaseModule.extend({
                    PLAYER_CONTAINER_TEMPLATE: "#lbnPlayerContainerTemplate",
                    PLAYER_TABLE_TEMPLATE: "#lbnPlayerTableTemplate",
                    PLAYER_ROW_TEMPLATE: "#lbnPlayerRowTemplate",
                    INLINE_PBP_TEMPLATE: "#lbnInlinePBPTemplate",
                    VIDEO_TEMPLATE: "#lbnVideoEntryTemplate",
                    VIDEO_ROW_SELECTOR: ".row-video-slider",
                    PLAYER_ROW_SELECTOR: ".leaderboard-item.player-row-{0}",
                    PIN_PLAYER_CLASS: ".add-to-favorite",
                    UNPIN_PLAYER_CLASS: ".remove-from-favorite",
                    PBP_CONTENT: ".play-by-play-content",
                    PBP_CONTAINER: ".col-play",
                    HIGHLIGHT_TRIGGER: ".colorpicker li span",
                    HIGHLIGHT_PICKER: ".colorpicker",
                    HIGHLIGHT_POPUP: ".colorpicker-popup",
                    HIGHLIGHT_CLASS: "highlight-",
                    PLAYER_DATA_CONTAINER: "tr.row-main",
                    ARTICLES_BUTTON: ".col-player a.article",
                    PHOTOS_BUTTON: ".col-player a.photo",
                    VIDEOS_BUTTON: ".col-player a.video",
                    PLAYER_NAME: ".col-player a.name",
                    MEDIA_ICONS: ".col-player a.expansion[data-tab-type]",
                    EXPANSION_ADVERTISEMENT: ".row-ad",
                    EXPANSION_CONTAINER: ".row-details",
                    EXPANDED_ROW_CLASS: "table-deployed",
                    SPONSOR_LOGO: ".sponsor-logo",
                    OCQS_LOGO: ".ocqs-logo",
                    LIVE_AT_ICON: ".live-at-video",
                    PLAYER_PROFILE: ".player-profile",
                    pid: null,
                    playerRow: null,
                    expansion: null,
                    isMyLb: null,
                    context: null,
                    initialized: !1,
                    mediaContent: null,
                    videos: null,
                    expansionContainer: null,
                    expansionAd: null,
                    sponsorLogo: null,
                    ocqsLogo: null,
                    videoButton: null,
                    photoButton: null,
                    articleButton: null,
                    unpinPlayer: null,
                    pinPlayer: null,
                    mediaIcons: null,
                    playerNameControl: null,
                    highlightTrigger: null,
                    highlightPopup: null,
                    highlightPicker: null,
                    playerDataContainer: null,
                    pbpContent: null,
                    pbpContainer: null,
                    playerContainerTemplate: null,
                    playerRowTemplate: null,
                    inlinePBPTemplate: null,
                    constructor: function(e, t, r, o) {
                        this.pid = t, this.isMyLb = r, this.context = o, this.base(e), this.playerContainerTemplate = this.context.config.getOrCreate(this.PLAYER_CONTAINER_TEMPLATE), this.playerRowTemplate = this.context.config.getOrCreate(this.PLAYER_ROW_TEMPLATE), this.inlinePBPTemplate = this.context.config.getOrCreate(this.INLINE_PBP_TEMPLATE)
                    },
                    renderContainer: function() {
                        this.playerRow = this.playerContainerTemplate.tmpl({
                            pid: this.pid,
                            player: this.context.leaderboardModel.getPlayer(this.pid),
                            rounds: this.context.leaderboardModel.rounds.length,
                            utils: this.context.utils,
                            isProAm: this.context.config.isProAm,
                            displayCountryForProAm: this.context.config.displayCountryForProAm,
                            scoringType: this.context.leaderboardModel.scoringType,
                            hideStandings: this.context.config.hideStandings,
                            hideDrawerAd: this.context.config.hideDrawerAd
                        }), this.playerRow.appendTo(this.container), this.expansionContainer = this.playerRow.find(this.EXPANSION_CONTAINER), this.expansionAd = this.playerRow.find(this.EXPANSION_ADVERTISEMENT), this.playerDataContainer = this.playerRow.find(this.PLAYER_DATA_CONTAINER), this.pbpContent = this.playerRow.find(this.PBP_CONTENT), this.pbpContainer = this.playerRow.find(this.PBP_CONTAINER), this.initialized = !0
                    },
                    render: function(e) {
                        return this.context.leaderboardModel.getPlayer(this.pid).wasUpdated ? (this.initialized ? this.destroyControls() : this.renderContainer(), this.renderTemplates(), this.initialized && this.expansion && this.expansion.update && this.expansion.update(), this.playerRow.attr(o.PlayerRow.INDEX_ATTRIBUTE, e)) : this.playerRow.attr(o.PlayerRow.INDEX_ATTRIBUTE, e)
                    },
                    renderTemplates: function() {
                        var e = this.context.leaderboardModel.tourCode + this.context.leaderboardModel.tournamentId,
                            t = this.context.leaderboardModel.getPlayer(this.pid);
                        r.renderJQueryTemplate(this.playerDataContainer, this.playerRowTemplate, {
                            rounds: this.context.leaderboardModel.rounds,
                            player: t,
                            currentRound: this.context.leaderboardModel.currentRound,
                            utils: this.context.utils,
                            isMyLb: this.isMyLb,
                            multiCourse: this.context.leaderboardModel.isMultiCourse(),
                            scoringType: this.context.leaderboardModel.scoringType,
                            isProAm: this.context.config.isProAm,
                            displayCountryForProAm: this.context.config.displayCountryForProAm,
                            mediaContent: this.context.media.mediaContent ? this.context.media.mediaContent[this.pid] : {},
                            isInMyLb: this.context.userModel.isFavouritePlayer(this.pid),
                            tournamentCode: this.context.leaderboardModel.tourCode + this.context.leaderboardModel.tournamentId,
                            tourCode: this.context.leaderboardModel.tourCode,
                            sponsorName: this.context.config.sponsorName,
                            myLbPlayerSponsor: this.context.config.myLbPlayerSponsor,
                            playerSponsor: this.context.config.playerSponsor,
                            hideStandings: this.context.config.hideStandings,
                            ocqsLogo: this.context.config.ocqsLogo,
                            ocqsMyLbLogo: this.context.config.ocqsMyLbLogo,
                            format: this.context.leaderboardModel.format,
                            isFinals: this.context.config.isFinals,
                            scorecardsURL: this.context.config.scorecardsURL.replace("{0}", this.pid).replace("{1}", e),
                            profilesURL: this.context.config.profilesURL.replace("{0}", this.pid),
                            top25URL: this.context.config.top25URL
                        }), this.pbpContainer.html(this.inlinePBPTemplate.tmpl({
                            player: t,
                            utils: this.context.utils
                        })), "active" !== t.status.toLowerCase() && this.pbpContainer.parent().hide(), this.context.config.isProAm || this.initialized || this.pbpContent.toggle(Boolean(this.context.userModel.playByPlayOn)), this.postRender()
                    },
                    renderVideoRow: function() {
                        if (this.videos.items && this.videos.items.length) {
                            var e = this.playerRow.find(this.VIDEO_ROW_SELECTOR);
                            e.addClass("has-videos"), this.videoRow ? this.videoRow.update() : this.videoRow = new r.leaderboard2.newlb.DrawerVideoRow(this.playerRow.find(e), {
                                template: this.context.config.getOrCreate(this.VIDEO_TEMPLATE),
                                leaderboardModal: this.context.leaderboardModal,
                                videos: this.videos,
                                isMyLb: this.isMyLb,
                                utils: this.context.utils,
                                analytics: this.context.analytics,
                                pid: this.pid,
                                customEventTracker: this.context.customEventTracker,
                                _timings: this.context._timings
                            })
                        }
                    },
                    postRender: function() {
                        this.setElements1(), this.setElements2(), this.setHighlightControls(), this.highlightPlayer(), this.initControls()
                    },
                    setElements1: function() {
                        this.sponsorLogo = this.playerRow.find(this.SPONSOR_LOGO), this.ocqsLogo = this.playerRow.find(this.OCQS_LOGO), this.videoButton = this.playerRow.find(this.VIDEOS_BUTTON), this.photoButton = this.playerRow.find(this.PHOTOS_BUTTON), this.articleButton = this.playerRow.find(this.ARTICLES_BUTTON)
                    },
                    setElements2: function() {
                        this.unpinPlayer = this.playerRow.find(this.UNPIN_PLAYER_CLASS), this.pinPlayer = this.playerRow.find(this.PIN_PLAYER_CLASS), this.mediaIcons = this.playerRow.find(this.MEDIA_ICONS), this.playerNameControl = this.playerRow.find(this.PLAYER_NAME)
                    },
                    setHighlightControls: function() {
                        this.highlightTrigger = this.playerRow.find(this.HIGHLIGHT_TRIGGER), this.highlightPopup = this.playerRow.find(this.HIGHLIGHT_POPUP), this.highlightPicker = this.playerRow.find(this.HIGHLIGHT_PICKER)
                    },
                    initControls: function() {
                        var t = this;
                        this.unpinPlayer.click(function() {
                            t.context.controller.removeFromFavourite(t.pid), t.context.analytics.unpinPlayer(t.pid, this)
                        }), this.pinPlayer.click(function() {
                            t.context.controller.addToFavourite(t.pid), t.context.analytics.pinPlayer(t.pid, this);
                            var e = t.context.leaderboardModel.players[t.pid];
                            if (e) {
                                var o = e.player_bio.first_name + "-" + e.player_bio.last_name;
                                r.Krux.trackEvent("Jm4oA7K1", {
                                    playername: o.toLowerCase()
                                })
                            }
                        }), this.highlightPicker.mouseenter(function() {
                            t.highlightPopup.show(), t.context.dataLoader.pauseUpdating = !0
                        }), this.highlightPicker.mouseleave(function() {
                            t.context.dataLoader.pauseUpdating = !1, t.highlightPopup.hide()
                        }), this.highlightTrigger.click(function() {
                            var r = e(this).attr(o.PlayerRow.HIGHLIGHT_ATTRIBUTE);
                            t.context.controller.highlightPlayer(t.pid, r), t.context.analytics.highlightPlayer(t.pid, r, this)
                        }), this.initDrawerControls()
                    },
                    initDrawerControls: function() {
                        var t = this,
                            r = this.context.leaderboardModel.players[this.pid];
                        r && "dns" !== r.status.toLowerCase() && (this.playerNameControl.click(function() {
                            var e = t.context.controller.drawerToggle(t.pid, t.isMyLb, null);
                            t.context.analytics.toggleDrawer(t.pid, e, null, this)
                        }), this.mediaIcons.click(function() {
                            var r = e(this).attr(o.PlayerRow.EXPANSION_TYPE_ATTRIBUTE);
                            "videos" === r && t.isLargeScreen() && (r = null);
                            var a = t.context.controller.drawerToggle(t.pid, t.isMyLb, r);
                            t.context.analytics.toggleDrawer(t.pid, a, r, this)
                        }))
                    },
                    destroyControls: function() {
                        this.unpinPlayer.unbind("click"), this.pinPlayer.unbind("click"), this.mediaIcons.unbind("click"), this.playerNameControl.unbind("click"), this.highlightTrigger.unbind("click")
                    },
                    initHoleVideos: function(e) {
                        if (this.videos)
                            for (var t = 0; t < this.videos.items.length; t++) this.context.workflows._initHoleVideo(this.videos.items[t], this, e)
                    },
                    updatePlayerPin: function() {
                        this.unpinPlayer.toggle(this.context.userModel.isFavouritePlayer(this.pid)), this.pinPlayer.toggle(!this.context.userModel.isFavouritePlayer(this.pid))
                    },
                    highlightPlayer: function() {
                        this.highlightPicker.mouseleave();
                        var e = this.PLAYER_ROW_SELECTOR.replace("{0}", this.pid) + " " + this.HIGHLIGHT_CLASS + this.context.userModel.coloredPlayers[this.pid];
                        this.playerRow.hasClass(this.EXPANDED_ROW_CLASS) && (e += " " + this.EXPANDED_ROW_CLASS), this.playerRow.attr("class", e.split(".").join(" "))
                    },
                    updateIcons: function() {
                        var e = this.context.media.mediaContent[this.pid];
                        this.videoButton.toggle(e.videos), this.photoButton.toggle(e.photos), this.articleButton.toggle(e.articles), this.expansion && this.expansion.updateIcons && this.expansion.updateIcons()
                    },
                    showExpansion: function(e) {
                        this.playerRow.addClass(this.EXPANDED_ROW_CLASS), this.expansionContainer.show(0, this.proxy(this.onShowExpansion, Boolean(this.expansion))), this.expansionAd.show(), this.sponsorLogo.attr("src", this.context.config.myLbPlayerSponsor), this.ocqsLogo.attr("src", this.context.config.ocqsMyLbLogo), this.expansion ? this.expansion.open(this.playerRow.attr(o.PlayerRow.INDEX_ATTRIBUTE), e) : (this.expansion = new o.Drawer(this.expansionContainer, this.expansionAd, this.pid, this.isMyLb, this.context), this.expansion.startProcessing(this.playerRow.attr(o.PlayerRow.INDEX_ATTRIBUTE), e))
                    },
                    hideExpansion: function() {
                        this.playerRow.removeClass(this.EXPANDED_ROW_CLASS), this.expansionContainer.hide(), this.expansionAd.hide();
                        var e = this.isMyLb ? this.context.config.myLbPlayerSponsor : this.context.config.playerSponsor;
                        this.sponsorLogo.attr("src", e);
                        var t = this.isMyLb ? this.context.config.ocqsMyLbLogo : this.context.config.ocqsLogo;
                        this.ocqsLogo.attr("src", t), this.expansion && this.expansion.close()
                    },
                    showLiveAtFeature: function() {
                        var e = this.context.leaderboardModel.players[this.pid].liveAt,
                            t = this.playerRow.find(this.LIVE_AT_ICON),
                            r = this.playerRow.find(this.PLAYER_PROFILE);
                        t && e && (t.attr("href", e), t.show(), r.hide())
                    },
                    hideLiveAtFeature: function() {
                        var e = this.playerRow.find(this.LIVE_AT_ICON),
                            t = this.playerRow.find(this.PLAYER_PROFILE);
                        e && (this.context.leaderboardModel.players[this.pid].liveAt = "", e.hide(), t.show())
                    },
                    trackDrawerEvents: function() {
                        this.context.customEventTracker.trackDrawerOpen(), this.context.customEventTracker.trackScorecardRendering(), this.context.customEventTracker.trackShotTrackerImageRendering(), r.isLargeScreen() && this.context.customEventTracker.trackVideoRowRender()
                    },
                    onShowExpansion: function(e) {
                        e && t.requestAnimationFrame(this.proxy(this.trackDrawerEvents))
                    }
                }), o.PlayerRow.INDEX_ATTRIBUTE = "data-index", o.PlayerRow.HIGHLIGHT_ATTRIBUTE = "data-highlight", o.PlayerRow.EXPANSION_TYPE_ATTRIBUTE = "data-tab-type"
            }(jQuery, window, pgatour)
        },
        KVBZ: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.LeaderboardConfig = o.LeaderboardConfig || r.Base.extend({
                    refreshRate: "",
                    mediaRefreshRate: "",
                    lbJson: "",
                    lbMiniJson: "",
                    lbPlayerPreviousRoundsJsonPattern: "",
                    lbPlayerNameTranslator: "",
                    mediaContentJson: "",
                    messageJson: "",
                    playoffJson: "",
                    playoffInfoJson: "",
                    sponsorsJson: "",
                    strackaApiPattern: "",
                    strackaJsonPattern: "",
                    articlesFeedJsonPattern: "",
                    videosFeedJsonPattern: "",
                    photosFeedJsonPattern: "",
                    liveAtFeedJsonUrl: "",
                    shotTrackerResourcesUrl: "",
                    roundText: "Round",
                    drawerAdPosSmall: "lb_drawerspon",
                    drawerAdPosBig: "lb_drawer",
                    adsToRefresh: ".refreshable-ad",
                    openDrawersAtStartup: !0,
                    doNotOpenDrawers: !1,
                    isProAm: !1,
                    hideProfileButton: !1,
                    hideScorecardsButton: !1,
                    hideFullStatsButton: !1,
                    hideDrawerAd: !1,
                    isFinals: !1,
                    hideStandings: !1,
                    scorecardsURL: "",
                    profilesURL: "",
                    statsURL: "",
                    top25URL: "",
                    showLiveVideoIcon: !1,
                    showLiveRadioIcon: !1,
                    smallExpandedQueueSize: 0,
                    mediumExpandedQueueSize: 0,
                    largeExpandedQueueSize: 0,
                    smallFavouriteExpandedQueueSize: 0,
                    mediumFavouriteExpandedQueueSize: 0,
                    largeFavouriteExpandedQueueSize: 0,
                    ocqsJson: "",
                    ocqsLogo: "",
                    ocqsMyLbLogo: "",
                    sponsorName: "",
                    myLbPlayerSponsor: "",
                    playerSponsor: "",
                    debugMode: !1,
                    lastUpdatedStrings: null,
                    cloudinaryOptions: null,
                    noDataDefaultMessage: !1,
                    omnitureEnabled: !1,
                    useGigya: !0,
                    cached: {},
                    broadcasts: null,
                    liveButtons: {},
                    constructor: function(t) {
                        e.extend(this, t), this.openDrawersAtStartup = !this.doNotOpenDrawers, e.trim(this.scorecardsURL) || (this.scorecardsURL = this.scorecardsURL || "/content/pgatour/players/player.{id}.{name}.html/scorecards/{tId}"), e.trim(this.profilesURL) || (this.profilesURL = this.profilesURL || "/content/pgatour/players/player.{id}.{name}.html"), e.trim(this.top25URL) || (this.top25URL = this.top25URL || "/content/pgatour/webcom/live-projected-standings/the-25.html"), e.trim(this.statsURL) || (this.statsURL = this.statsURL || "/content/pgatour/players/player.{id}.{name}.html/statistics")
                    },
                    getOrCreate: function(t) {
                        return this.cached[t] && this.cached[t].length || (this.cached[t] = e(t)), this.cached[t]
                    }
                })
            }(jQuery, window, pgatour)
        },
        Ln9E: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.CustomEventTracker = o.CustomEventTracker || r.Base.extend({
                    drawerRequestedToOpen: null,
                    drawerModalRequestedToOpen: null,
                    lbDrawerRenderTracked: !1,
                    lbDrawerRequestTracked: !1,
                    lbDrawerSponsorRenderTracked: !1,
                    lbDrawerSponsorRequestTracked: !1,
                    lbDrawerModalAdRenderTracked: !1,
                    lbDrawerModalAdRequestTracked: !1,
                    lbDrawerModalAdSponsorRequestTracked: !1,
                    newrelicEvents: {
                        DRAWER_EXPANSION: "LB Drawer - Open",
                        SCORECARD_RENDERING: "LB Drawer - Scorecard",
                        SHOT_TRACKER_IMAGE_RENDERING: "LB Drawer - Shot Tracker View",
                        VIDEO_TAB_OPEN: "Video Tab - Open",
                        DRAWER_VIDEO_ROW_RENDER: "LB Drawer - Video",
                        DRAWER_AD_RENDER: "LB Drawer - lb_drawer Ad",
                        DRAWER_AD_REQUEST: "LB Drawer - Ad Request",
                        DRAWER_AD_SPONSOR_RENDER: "LB Drawer - lb_drawer_spon Ad",
                        DRAWER_AD_SPONSOR_REQUEST: "LB Drawer Spon - Ad Request",
                        GROUP_VIEW_OPEN: "Group View - Open",
                        GROUP_VIEW_RENDER: "LB Drawer - Group View",
                        LB_MODAL_OPEN: "LB Modal - Open",
                        LB_MODAL_RENDER: "LB Drawer - Modal View",
                        LB_MODAL_AD_RENDER: "LB Drawer - Modal Ad",
                        LB_MODAL_AD_REQUEST: "LB Shottracker - Ad Request",
                        LB_MODAL_AD_SPONSOR_REQUEST: "LB Shottracker Spon - Ad Request"
                    },
                    saveDrawerOpenTime: function() {
                        this.drawerRequestedToOpen = Date.now(), this.lbDrawerRenderTracked = !1, this.lbDrawerSponsorRenderTracked = !1, this.lbDrawerRequestTracked = !1, this.lbDrawerSponsorRequestTracked = !1
                    },
                    saveDrawerModalOpenTime: function() {
                        this.drawerModalRequestedToOpen = Date.now(), this.lbDrawerModalAdRenderTracked = !1, this.lbDrawerModalAdRequestTracked = !1
                    },
                    track: function(e, t) {
                        var o = Date.now(),
                            a = r.WebPerformanceTracker.constructEventTime(t, o);
                        r.WebPerformanceTracker.addNewrelicPageAction(e, a)
                    },
                    trackDrawerOpen: function() {
                        this.track(this.newrelicEvents.DRAWER_EXPANSION, this.drawerRequestedToOpen)
                    },
                    trackScorecardRendering: function() {
                        this.track(this.newrelicEvents.SCORECARD_RENDERING, this.drawerRequestedToOpen)
                    },
                    trackShotTrackerImageRendering: function() {
                        this.track(this.newrelicEvents.SHOT_TRACKER_IMAGE_RENDERING, this.drawerRequestedToOpen)
                    },
                    trackVideoTabOpen: function(e) {
                        this.track(this.newrelicEvents.VIDEO_TAB_OPEN, e)
                    },
                    trackVideoRowRender: function(e) {
                        var t = e || this.drawerRequestedToOpen;
                        this.track(this.newrelicEvents.DRAWER_VIDEO_ROW_RENDER, t)
                    },
                    trackDrawerAdRender: function() {
                        this.lbDrawerRenderTracked || (this.track(this.newrelicEvents.DRAWER_AD_RENDER, this.drawerRequestedToOpen), this.lbDrawerRenderTracked = !0)
                    },
                    trackDrawerAdRequest: function() {
                        this.lbDrawerRequestTracked || (this.track(this.newrelicEvents.DRAWER_AD_REQUEST, this.drawerRequestedToOpen), this.lbDrawerRequestTracked = !0)
                    },
                    trackSponsorAdRequest: function() {
                        this.lbDrawerSponsorRequestTracked || (this.track(this.newrelicEvents.DRAWER_AD_SPONSOR_REQUEST, this.drawerRequestedToOpen), this.lbDrawerSponsorRequestTracked = !0)
                    },
                    trackDrawerAdSponsorRender: function() {
                        this.lbDrawerSponsorRenderTracked || this.track(this.newrelicEvents.DRAWER_AD_SPONSOR_RENDER, this.drawerRequestedToOpen)
                    },
                    trackGroupViewOpen: function(e) {
                        this.track(this.newrelicEvents.GROUP_VIEW_OPEN, e)
                    },
                    trackGroupViewRender: function(e) {
                        this.track(this.newrelicEvents.GROUP_VIEW_RENDER, e)
                    },
                    trackLbModalOpen: function() {
                        this.track(this.newrelicEvents.LB_MODAL_OPEN, this.drawerModalRequestedToOpen)
                    },
                    trackLbModalRender: function() {
                        this.track(this.newrelicEvents.LB_MODAL_RENDER, this.drawerModalRequestedToOpen)
                    },
                    trackLbModalAdRender: function() {
                        this.lbDrawerModalAdRenderTracked || (this.track(this.newrelicEvents.LB_MODAL_AD_RENDER, this.drawerModalRequestedToOpen), this.lbDrawerModalAdRenderTracked = !0)
                    },
                    trackLbModalAdRequest: function() {
                        this.lbDrawerModalAdRequestTracked || (this.track(this.newrelicEvents.LB_MODAL_AD_REQUEST, this.drawerModalRequestedToOpen), this.lbDrawerModalAdRequestTracked = !0)
                    },
                    trackLbModalAdSponsorRequest: function() {
                        this.lbDrawerModalAdSponsorRequestTracked || (this.track(this.newrelicEvents.LB_MODAL_AD_SPONSOR_REQUEST, this.drawerModalRequestedToOpen), this.lbDrawerModalAdSponsorRequestTracked = !0)
                    }
                })
            }(jQuery, window, pgatour)
        },
        N2i9: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.VideosTab = o.VideosTab || o.AbstractScorecardsTab.extend({
                    TAB_TEMPLATE: "#lbnVideosTemplate",
                    TAB_ENTRY_TEMPLATE: "#lbnVideoEntryTemplate",
                    CONTENT_SELECTOR: "ul.detail-video-slider",
                    SLIDER_SELECTOR: ".dl-photoslider:visible",
                    VIDEO_MOBILE_OVERLAY: "video-mobile-overlay",
                    contentType: ["video"],
                    tabTemplate: null,
                    contentContainer: null,
                    slider: null,
                    sliderContainer: null,
                    dataWasLoad: !1,
                    startPlay: !1,
                    videos: [],
                    imageLoaded: !1,
                    tabProcessing: !1,
                    tabActivated: !1,
                    tabTracked: !1,
                    constructor: function(t, r, o, a, n, i) {
                        this.base(t, r, o, a, "videos", n, i), e(window).on("video-highlights-update", this.proxy(this.onHighlightsUpdate))
                    },
                    listenImagesLoad: function() {
                        if (!this.imageLoaded) {
                            var e = this.container.find("img[data-src]:visible").first();
                            e.on("load", this.proxy(this.onImageLoaded)), e[0] && e[0].complete && e.load()
                        }
                    },
                    onImageLoaded: function() {
                        "videos" !== this.context._selectedType || this.imageLoaded || !this.tabActivated || this.tabProcessing || (this.context.customEventTracker.trackVideoRowRender(this.context._timings.tabs.videos.startTime), this.imageLoaded = !0)
                    },
                    render: function() {
                        this.tabTemplate = this.context.config.getOrCreate(this.TAB_TEMPLATE), this.container.html(this.tabTemplate.tmpl({
                            player: this.context.leaderboardModel.players[this.pid]
                        })), this.context.dataLoader.loadVideos(this.pid), this.base()
                    },
                    renderContent: function(e) {
                        this.renderMediaContent(e), this.videos.length && (this.reinitializePlayers(), this.selector.hasClass("tab-active") ? this.show() : this.checkForHighlights())
                    },
                    checkForHighlights: function() {
                        var e, t, r, o = !1;
                        this.context.leaderboardModel.isHighlightsVisible && (e = this.context.leaderboardModel.tourCode + this.context.leaderboardModel.tournamentId, t = this.context.config.setupYear, o = !(r = this.context.controller.getSavedVideoId(e, t, this.pid)) || r !== this.videos[0].videoId), this.selector.toggleClass("new-video", o)
                    },
                    updateHighlights: function() {
                        var e = this.context.leaderboardModel.tourCode + this.context.leaderboardModel.tournamentId,
                            t = this.context.config.setupYear;
                        this.context.controller.saveVideoId(this.videos[0].videoId, e, t, this.pid), this.selector.removeClass("new-video")
                    },
                    show: function(e) {
                        e && this.context._selectedType !== e && (this.tabTracked = !1), this.tabProcessing = !0, this.base(e), this.videos.length && (this.initSliders(), this.listenImagesLoad(), this.updateHighlights())
                    },
                    layout: function() {
                        this.base(), this.initSliders()
                    },
                    initVideoThumbs: function(e) {
                        this.base(e), this.startPlay && (this.playVideo(null), this.startPlay = !1)
                    },
                    afterRender: function() {
                        this.dataWasLoad = !0, this.base(), this.initSliders()
                    },
                    initSliders: function() {
                        this.sliderContainer = this.container.find(this.SLIDER_SELECTOR);
                        var e = 0;
                        if (this.sliderContainer && this.sliderContainer.length && !this.sliderLoading && (this.slider && this.slider.destroySlider && (e = this.slider.getCurrentSlide(), this.slider.destroySlider()), this.applyCloudinary(this.sliderContainer), this.container.find(this.SLIDER_SELECTOR + " li").length)) {
                            var t = this.sliderContainer.find("li").length;
                            this.initSlidersPresent(e, t)
                        }
                    },
                    initSlidersPresent: function(e, t) {
                        this.sliderLoading = !0;
                        var r = this.isSmallScreen() ? 1 : 2,
                            o = t > r;
                        this.slider = this.sliderContainer.bxSlider({
                            controls: !1,
                            slideWidth: 280,
                            minSlides: r,
                            maxSlides: r,
                            pager: o,
                            infiniteLoop: !1,
                            slideMargin: 20,
                            startSlide: e,
                            onSliderLoad: this.proxy(this.onSliderLoad),
                            onSlideBefore: this.proxy(this.onVideoPlayerSlide)
                        }), this.reinitializePlayers(), this.container.find(".thumb").unbind("click.omniture").on("click.omniture", this.proxy(this.onVideoClick))
                    },
                    onVideoPlayerSlide: function(e, t) {
                        r.isSmallScreen() && this.sliderContainer.find("." + this.VIDEO_MOBILE_OVERLAY).removeClass(this.VIDEO_MOBILE_OVERLAY), this.base(e, t)
                    },
                    autoPlay: function() {
                        this.dataWasLoad ? this.playVideo(null) : this.startPlay = !0
                    },
                    playVideo: function(e) {
                        var t;
                        (t = e ? this.container.find('.detail-video-slider li .elem[data-video-id="' + e + '"]') : this.container.find(".detail-video-slider li .elem:first")).length && t.eq(0).trigger({
                            type: "click",
                            from: "play-video-button"
                        })
                    },
                    onSliderLoad: function() {
                        this.sliderLoading = !1
                    },
                    onHighlightsUpdate: function(e, t) {
                        t === this.pid && this.selector.hasClass("new-video") && this.updateHighlights()
                    },
                    onVideoClick: function(e) {
                        "play-video-button" !== e.from && this.context.analytics.drawerThumbnailTapped(this.pid, e.currentTarget), this.context.analytics.drawerPlayVideo(this.pid, e.currentTarget)
                    },
                    onShow: function() {
                        this.tabTracked || (this.tabProcessing = !1, this.tabActivated = !0, this.context.customEventTracker.trackVideoTabOpen(this.context._timings.tabs.videos.startTime), this.imageLoaded && this.context.customEventTracker.trackVideoRowRender(this.context._timings.tabs.videos.startTime), this.tabTracked = !0)
                    }
                })
            }(jQuery, window, pgatour)
        },
        NLE6: function(e, t) {
            ! function(e, t) {
                t.shottracker.model.PlayerHoleModel = t.Base.extend({
                    _data: null,
                    shots: null,
                    constructor: function(e) {
                        if (this._data = e, this.shots = [], e && e.shots)
                            for (var r = 0, o = e.shots.length; r < o; r++) {
                                var a = new t.shottracker.model.ShotModel(e.shots[r]);
                                this.shots.push(a)
                            }
                    }
                })
            }(window, pgatour)
        },
        NYSJ: function(e, t) {
            ! function(e, t) {
                t.shottracker.PlotterOptions = t.Base.extend({
                    camera: null,
                    target: null,
                    roll: 0,
                    fov: 0,
                    imageW: 0,
                    imageH: 0,
                    constructor: function(e, t, r) {
                        this.init(e, t, r)
                    },
                    init: function(e, r, o) {
                        this.camera = new t.shottracker.math.Vector3(e.cameraX, e.cameraY, e.cameraZ), this.target = new t.shottracker.math.Vector3(e.targetX, e.targetY, e.targetZ), this.roll = e.roll, this.fov = e.fov, this.imageW = r, this.imageH = o
                    }
                })
            }(window, pgatour)
        },
        NiTS: function(e, t, r) {
            var o = r("qRtV");
            "string" == typeof o && (o = [
                [e.i, o, ""]
            ]);
            var a = {
                hmr: !0,
                transform: void 0,
                insertInto: void 0
            };
            r("aET+")(o, a);
            o.locals && (e.exports = o.locals)
        },
        P56D: function(e, t) {
            ! function(e, t) {
                t.shottracker.Plotter = t.Base.extend({}, {
                    PI_OVER_TWO: .5 * Math.PI,
                    DEG_TO_RAD: Math.PI / 180,
                    plot: function(e, r) {
                        var o = r.camera.clone(),
                            a = e.clone();
                        o.minus(r.target), a.minus(r.target);
                        var n = o.length(),
                            i = Math.atan2(o.y, o.x),
                            d = Math.asin(o.z / n),
                            s = this.PI_OVER_TWO - d,
                            l = this.PI_OVER_TWO + i,
                            c = r.roll * this.DEG_TO_RAD,
                            h = new t.shottracker.math.Matrix3,
                            p = Math.cos(c),
                            u = Math.sin(c);
                        h.n00 = p, h.n01 = u, h.n10 = -u, h.n11 = p;
                        var m = new t.shottracker.math.Matrix3,
                            b = Math.cos(l),
                            f = Math.sin(l);
                        m.n00 = b, m.n01 = f, m.n10 = -f, m.n11 = b;
                        var g = new t.shottracker.math.Matrix3,
                            w = Math.cos(s),
                            x = Math.sin(s);
                        g.n11 = w, g.n12 = x, g.n21 = -x, g.n22 = w;
                        var y = h.times(g).times(m).inverse(),
                            v = a.x * y.n00 + a.y * y.n10 + a.z * y.n20,
                            k = a.x * y.n01 + a.y * y.n11 + a.z * y.n21,
                            _ = a.x * y.n02 + a.y * y.n12 + a.z * y.n22,
                            T = new t.shottracker.math.Vector3(v, k, _),
                            E = o.z - T.z,
                            C = .5 * r.imageH / Math.tan(r.fov * this.DEG_TO_RAD * .5) / E;
                        return {
                            x: .5 * r.imageW + T.x * C,
                            y: .5 * r.imageH - T.y * C
                        }
                    }
                })
            }(window, pgatour)
        },
        Q6xB: function(e, t) {
            ! function(e, t) {
                t.shottracker.model.HoleModel = t.Base.extend({
                    _data: null,
                    id: null,
                    holePlotterOptions: null,
                    greenPlotterOptions: null,
                    constructor: function(e, r, o) {
                        this._data = e, this.id = e.hole_id, this.holePlotterOptions = new t.shottracker.PlotterOptions({
                            cameraX: parseFloat(e.hole_camera_x),
                            cameraY: parseFloat(e.hole_camera_y),
                            cameraZ: parseFloat(e.hole_camera_z),
                            targetX: parseFloat(e.hole_target_x),
                            targetY: parseFloat(e.hole_target_y),
                            targetZ: parseFloat(e.hole_target_z),
                            roll: parseFloat(e.hole_roll),
                            fov: parseFloat(e.hole_fov)
                        }, r, o), this.greenPlotterOptions = new t.shottracker.PlotterOptions({
                            cameraX: parseFloat(e.green_camera_x),
                            cameraY: parseFloat(e.green_camera_y),
                            cameraZ: parseFloat(e.green_camera_z),
                            targetX: parseFloat(e.green_target_x),
                            targetY: parseFloat(e.green_target_y),
                            targetZ: parseFloat(e.green_target_z),
                            roll: parseFloat(e.green_roll),
                            fov: parseFloat(e.green_fov)
                        }, r, o)
                    },
                    getRound: function(e) {
                        (e = e.toString()).length > 1 && (e = e.substr(0, 1));
                        var r = t.getItemByField(this._data.round, "round_num", e);
                        return r ? new t.shottracker.model.RoundModel(r) : null
                    }
                })
            }(window, pgatour)
        },
        QKvj: function(e, t, r) {
            (e.exports = r("I1BE")()).push([e.i, '.clearfix:after,.clearfix:before{display:table;content:"";line-height:0}.headerWrapper,.moduleHeader{border-bottom:1px solid #ccc}@font-face{font-family:NanumGothicBold;src:url(' + r("ILh9") + ");src:url(" + r("ILh9") + "?#iefix) format('embedded-opentype'),url(" + r("6WOd") + ") format('woff2'),url(" + r("inoD") + ") format('woff'),url(" + r("g4f6") + ") format('truetype'),url(" + r("TaUw") + "#NanumGothicBold) format('svg')}@font-face{font-family:NanumGothicRegular;src:url(" + r("7go+") + ");src:url(" + r("7go+") + "?#iefix) format('embedded-opentype'),url(" + r("7kdD") + ") format('woff2'),url(" + r("OISa") + ") format('woff'),url(" + r("a9T5") + ") format('truetype'),url(" + r("Tit0") + "#NanumGothicRegular) format('svg')}.clearfix:after{clear:both}.headerWrapper{padding:14px 0 18px 20px}.box-sizing{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.moduleBottom{padding:3px 0 0;height:45px}.moduleBottom .module-bottom-social{float:left;padding-left:15px}.moduleBottom .module-bottom-more{float:right;text-align:right;margin-top:4px}.moduleBottom .module-bottom-more a{color:#000;text-transform:uppercase;font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:18px;line-height:28px;padding-right:15px}.locale-ko .moduleBottom .module-bottom-more a{font-family:'NanumGothicRegular ',sans-serif}.moduleBottom .module-bottom-more a:before{content:'\\203A';font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:26px;line-height:28px;margin-right:3px}.locale-ko .moduleBottom .module-bottom-more a:before{font-family:'NanumGothicBold ',sans-serif}.moduleBottom .module-bottom-more a strong{font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .moduleBottom .module-bottom-more a strong{font-family:'NanumGothicBold ',sans-serif}.moduleHeader{padding:16px 15px;height:50px;position:relative}.moduleHeader.with-sponsor .header-info{margin-right:170px}.moduleHeader .title{font-size:28px;line-height:28px;font-family:'Roboto Condensed',sans-serif;font-weight:400;margin-bottom:2px}.locale-ko .moduleHeader .title{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .title .live{margin-left:3px;color:#FFF;background:#FB0000;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:16px;line-height:18px;padding:2px 5px;text-transform:uppercase;vertical-align:middle}.locale-ko .moduleHeader .title .live{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .subtitle{font-size:18px;line-height:20px;font-family:'Roboto Condensed',sans-serif;font-weight:400}.locale-ko .moduleHeader .subtitle{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .sponsor{position:absolute;right:15px;bottom:15px}.moduleHeader .control{position:absolute;right:15px;top:15px;display:none;width:70px}.moduleHeader .control .btn{border:2px solid #00284B;border-radius:5px;display:block;cursor:pointer;color:#00284B;font-size:16px;line-height:26px;font-family:'Roboto Condensed',sans-serif;font-weight:700;text-align:center;text-transform:uppercase}.locale-ko .moduleHeader .control .btn{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .control .btn.full{width:100%}.moduleHeader .control .btn.half{width:40%;float:right}.moduleHeader .control .btn.half:first-child{float:left}@media (min-width:768px) and (max-width:979px){.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .control{display:block}}@media (max-width:767px){.moduleBottom{height:auto}.moduleBottom .module-bottom-social{float:none;text-align:center;padding:10px}.moduleBottom .module-bottom-more{float:none;padding:10px}.moduleHeader{padding:16px 10px}.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .title{font-size:24px}.moduleHeader .title .live{font-size:12px;line-height:14px}.moduleHeader .control{display:block}}.details-map{background:#424242;height:116px;position:relative}.details-map .details-map-menu{position:absolute;right:10px;top:0;z-index:100}.details-map .details-map-menu .btn{cursor:pointer;width:28px;height:26px;margin-top:10px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/player-drawer/img/sprite.png\") no-repeat;position:relative;display:none}.details-map .details-map-menu .btn.view-full.show,.details-map .details-map-menu .btn.view-group.show,.details-map .details-map-menu .btn.view-single.show,.details-map .details-map-menu .btn.zoom-in.show,.details-map .details-map-menu .btn.zoom-out.show{display:block}.details-map .details-map-menu .btn.zoom-out{background-position:-5px -1150px}.details-map .details-map-menu .btn.zoom-in{background-position:-5px -1180px}.details-map .details-map-menu .btn.view-single{background-position:-5px -1210px}.details-map .details-map-menu .btn.view-group{background-position:-5px -1240px}.details-map .details-map-menu .btn.view-full{background-position:-5px -1319px}.details-map .details-map-menu .popover{color:#FFF;background:#1D1D1D;font-size:12px;line-height:14px;border-radius:3px;border:1px solid #4A4A4A;margin-top:20px;right:38px;left:auto!important;white-space:nowrap}.details-map .details-map-menu .popover .popover-content{padding:6px 10px}.details-map .details-map-menu .popover.left .arrow{border-left-color:#4A4A4A;margin-top:-6px;border-width:6px 0 6px 11px}.details-map .details-map-menu .popover.left .arrow:after{border-left-color:#1D1D1D;border-width:5px 0 5px 10px;bottom:-5px}.details-map .details-map-info{float:left;color:#E4E4E4;font-size:15px;line-height:21px;text-align:left;position:absolute;top:8px;left:8px;z-index:100}.details-map .details-map-info .map-select{margin:0 auto}.details-map .details-map-info .details-map-hole{font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:16px;display:block}.locale-ko .details-map .details-map-info .details-map-hole{font-family:'NanumGothicBold ',sans-serif}.details-map .details-map-info .details-map-par,.details-map .details-map-info .details-map-rank,.details-map .details-map-info .details-map-yds{float:left;clear:both;white-space:nowrap}.details-map .details-map-info .coma{float:left}.details-map .map-insert{height:100%;position:relative}.details-map .details-map-legend{position:absolute;right:0;bottom:0;left:0;text-align:center;padding:3px 5px;font-weight:700;text-shadow:1px 1px 0 #000}.details-map .details-map-legend .player{margin:0 5px;font-size:14px;padding-left:13px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/player-drawer/img/sprite.png\") no-repeat;line-height:14px;white-space:nowrap;display:none}.details-map .details-map-legend .player.show{display:inline-block}.details-map .details-map-legend .player.player-yellow{background-position:-5px -1063px}.details-map .details-map-legend .player.player-red{background-position:-5px -1047px}.details-map .details-map-legend .player.player-green{background-position:-5px -1078px}.details-map .details-map-legend .player.player-blue{background-position:-5px -1093px}.details-map .details-map-legend .popover{color:#FFF;background:#1D1D1D;font-size:12px;line-height:14px;border-radius:3px;border:1px solid #4A4A4A;margin-top:20px;left:auto!important;white-space:nowrap}.details-map .details-map-legend .popover .popover-content{padding:6px 10px}.details-map .details-map-legend .popover.left .arrow{border-left-color:#4A4A4A;margin-top:-6px;border-width:6px 0 6px 11px}.details-map .details-map-legend .popover.left .arrow:after{border-left-color:#1D1D1D;border-width:5px 0 5px 10px;bottom:-5px}.details-map .esc-popover-main{position:absolute;margin:0 5px;font-size:14px;padding-left:13px;top:50%;left:50%;transform:translate(-50%,-50%)}.details-map .esc-popover-main .popover{color:#FFF;background:#1D1D1D;font-size:12px;line-height:14px;border-radius:3px;border:1px solid #4A4A4A;margin-top:20px;left:auto!important;white-space:nowrap}.details-map .esc-popover-main .popover .popover-content{padding:6px 10px}.details-map .esc-popover-main .popover.top .arrow{display:none}@media (max-width:767px){.details-map{height:195px}.details-map .details-map-menu .btn{float:left;margin-left:5px;margin-top:5px}.details-map .details-map-menu .popover{display:none!important}.details-map .details-map-info{float:none;position:absolute;left:10px;right:90px}.details-map .details-map-info .details-map-hole{display:inline}.details-map .details-map-info .details-map-par,.details-map .details-map-info .details-map-rank,.details-map .details-map-info .details-map-yds{float:none;clear:none}.details-map .details-map-info .coma{float:none}.details-map .map-insert{position:relative;margin-top:35px;height:130px}.details-map .details-map-legend{position:static}.details-map .details-map-legend .player{font-size:12px}}", ""])
        },
        QV8X: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.PBPTab = o.PBPTab || o.AbstractScorecardsTab.extend({
                    PBP_TEMPLATE: "#lbnPlayByPlayTemplate",
                    PLAY_BY_PLAY_CONTENT: ".play-by-play-scroller ul",
                    PBP_CONTENT_TEMPLATE: "#lbnPlayByPlayContentTemplate",
                    SCROLLER_SELECTOR: ".scroller",
                    scroller: null,
                    playByPlayContent: null,
                    scrollerSelector: null,
                    pbpContentTemplate: null,
                    pbpTemplate: null,
                    constructor: function(e, t, r, o, a, n) {
                        this.base(e, t, r, o, "playbyplay", a, n)
                    },
                    render: function() {
                        this.pbpContentTemplate = this.context.config.getOrCreate(this.PBP_CONTENT_TEMPLATE), this.pbpTemplate = this.context.config.getOrCreate(this.PBP_TEMPLATE), this.container.append(this.pbpTemplate.tmpl({
                            player: this.player,
                            holeToShow: this.currentHole,
                            utils: this.context.utils
                        })), this.playByPlayContent = this.container.find(this.PLAY_BY_PLAY_CONTENT), this.scrollerSelector = this.container.find(this.SCROLLER_SELECTOR), this.base(), this.setCurrentHole(this.currentHole, this.currentRound)
                    },
                    setCurrentHole: function(e, t) {
                        this.base(e, t), this.playByPlayContent.html(this.pbpContentTemplate.tmpl({
                            player: this.player,
                            holeToShow: this.currentHole,
                            utils: this.context.utils
                        })), this.isSmallScreen() || this.updateScroller()
                    },
                    update: function(e) {
                        this.base(e), this.setCurrentHole(this.currentHole, this.currentRound)
                    },
                    show: function() {
                        this.base(), this.updateScroller()
                    }
                })
            }(jQuery, window, pgatour)
        },
        RQ1K: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.TabsFactory = o.TabsFactory || r.BaseModule.extend({
                    save$: e,
                    DESKTOP_1_TAB_SELECTORS_CONTAINER: ".visible-large.first-tab .tabs",
                    TABLET_TAB_SELECTORS_CONTAINER: ".visible-medium .tabs",
                    PHONE_TAB_SELECTORS_CONTAINER: ".visible-small .phone-tabs",
                    DESKTOP_1_TAB_CONTENT_CONTAINER: ".visible-large.first-tab .tab-container",
                    TABLET_TAB_CONTENT_CONTAINER: ".visible-medium .tab-container",
                    PHONE_TAB_CONTENT_CONTAINER: ".visible-small .tab-container",
                    HEAD_ADDITION_1: ".visible-large.first-tab .details-head-addition",
                    LARGE_SIZE: "large",
                    MEDIUM_SIZE: "medium",
                    SMALL_SIZE: "small",
                    ST_TYPE: "shottracker",
                    PBP_TYPE: "playbyplay",
                    STATS_TYPE: "stats",
                    STRACKA_TYPE: "stracka",
                    VIDEOS_TYPE: "videos",
                    PHOTOS_TYPE: "photos",
                    ARTICLES_TYPE: "articles",
                    context: null,
                    constructor: function(e) {
                        this.context = e
                    },
                    tabsFactory: function(t, r, o, a, n) {
                        var i = e(t).find(this.PHONE_TAB_CONTENT_CONTAINER),
                            d = e(t).find(this.TABLET_TAB_CONTENT_CONTAINER),
                            s = e(t).find(this.DESKTOP_1_TAB_CONTENT_CONTAINER),
                            l = e(t).find(this.PHONE_TAB_SELECTORS_CONTAINER),
                            c = e(t).find(this.TABLET_TAB_SELECTORS_CONTAINER),
                            h = e(t).find(this.DESKTOP_1_TAB_SELECTORS_CONTAINER),
                            p = e(t).find(this.HEAD_ADDITION_1),
                            u = [];
                        this.isShouldAddTab(a, this.SMALL_SIZE) && u.push(this.createTab(r, i, l, this.SMALL_SIZE, o, p, n)), this.isShouldAddTab(a, this.MEDIUM_SIZE) && u.push(this.createTab(r, d, c, this.MEDIUM_SIZE, o, p, n)), this.isShouldAddTab(a, this.LARGE_SIZE) && u.push(this.createTab(r, s, h, this.LARGE_SIZE, o, p, n));
                        for (var m = 0; m < u.length; m++) u[m].rendered || u[m].render();
                        if (a && a.length)
                            for (var b = 0; b < a.length; b++) u.push(a[b]);
                        return u
                    },
                    createTab: function(e, t, r, a, n, i, d) {
                        var s;
                        switch (n) {
                            case this.ST_TYPE:
                                s = new o.ShotTrackerTab(this.context, e, t, r, a, d);
                                break;
                            case this.PBP_TYPE:
                                s = new o.PBPTab(this.context, e, t, r, a, d);
                                break;
                            case this.STATS_TYPE:
                                s = new o.StatsTab(this.context, e, t, r, a, d);
                                break;
                            case this.STRACKA_TYPE:
                                s = new o.StrackaTab(this.context, e, t, r, a, d);
                                break;
                            case this.VIDEOS_TYPE:
                                s = new o.VideosTab(this.context, e, t, r, a, d);
                                break;
                            case this.PHOTOS_TYPE:
                                s = new o.PhotosTab(this.context, e, t, r, a, d);
                                break;
                            case this.ARTICLES_TYPE:
                                s = new o.ArticlesTab(this.context, e, t, r, a, d)
                        }
                        return this.setTabHeadAddition(s, n, a, i), s
                    },
                    setTabHeadAddition: function(e, t, r, o) {
                        e && t === this.STATS_TYPE && r === this.LARGE_SIZE && (e.$headAddition = o)
                    },
                    isShouldAddTab: function(e, t) {
                        if (e && e.length)
                            for (var r = 0; r < e.length; r++)
                                if (e[r].tabSize === t) return !1;
                        return t === this.getScreenSize()
                    },
                    createTabs: function(e, t, r, o, a) {
                        for (var n = this.getTabsToCreate(t), i = {}, d = 0; d < n.length; d++) o && o[n[d]] && 3 === o[n[d]].length || (i[n[d]] = this.tabsFactory(e, r, n[d], o[n[d]], a));
                        return i
                    },
                    getTabsToCreate: function(e) {
                        var t = [];
                        return "dns" !== this.context.leaderboardModel.getPlayer(e).status.toLowerCase() && (t.push(this.ST_TYPE), this.context.media.hasVideos(e) && t.push(this.VIDEOS_TYPE), this.context.leaderboardModel.scoringType > 1 && (t.push(this.PBP_TYPE), t.push(this.STATS_TYPE))), this.context.media.hasPhotos(e) && t.push(this.PHOTOS_TYPE), this.context.media.hasArticles(e) && t.push(this.ARTICLES_TYPE), t
                    }
                })
            }(jQuery, window, pgatour)
        },
        RWWH: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.DataLoader = o.DataLoader || r.Base.extend({
                    context: null,
                    lastLeader: null,
                    pauseUpdating: !1,
                    simNo: 1,
                    simTimer: null,
                    constructor: function(e) {
                        this.base(), this.context = e
                    },
                    cacheBustLoad: function(r, o, a) {
                        var n = r;
                        void 0 !== t.__karma__ && (n = "base" + n), this.context.config.simCount && (this.simTimer || (this.simTimer = setInterval(this.proxy(function() {
                            this.simNo++, this.simNo > this.context.config.simCount && (this.simNo = 1)
                        }), 1e3 * this.context.config.simInterval)), n = n.replace("sim0", "sim" + this.simNo)), e.ajax({
                            url: n,
                            success: function(e) {
                                o(e)
                            },
                            error: function() {
                                a ? a() : o(null)
                            }
                        })
                    },
                    loadLeaderboard: function(e) {
                        this.pauseUpdating || this.cacheBustLoad(this.context.config.lbJson, function(t) {
                            e && e(t)
                        })
                    },
                    loadLeaderboardMini: function(e, t) {
                        this.cacheBustLoad(this.context.config.lbMiniJson, function(t) {
                            e && e(t)
                        }, function() {
                            t()
                        })
                    },
                    loadPlayersPreviousRounds: function(t, r) {
                        var o = this.context.config.lbPlayerPreviousRoundsJsonPattern.replace("{0}", t.player_id),
                            a = !t.otherPlayers.length || t.current_round === t.selectedRoundId && !t.isCutWithPreviousRounds;
                        this.cacheBustLoad(o, this.proxy(function(e) {
                            this.context.leaderboardModel.populatePlayerPreviousRounds(t, e), r && a && r()
                        })), a || (this.playerCounter = 0, this.totalCounter = 0, e.each(t.otherPlayers, this.proxy(this.loadOtherPlayer, t, r)))
                    },
                    loadOtherPlayer: function(e, t, r, o) {
                        var a = this.context.config.lbPlayerPreviousRoundsJsonPattern.replace("{0}", o.playerId);
                        this.totalCounter++, this.cacheBustLoad(a, this.proxy(function(r) {
                            this.context.leaderboardModel.populateOtherPlayers(o, e.selectedRoundId, r), this.playerCounter++, this.playerCounter === this.totalCounter && t && t()
                        }))
                    },
                    loadTournamentSetupJson: function() {
                        var e = this.context.config.tournamentSetupJsonPattern;
                        this.cacheBustLoad(e, this.proxy(function(e) {
                            this.context.leaderboardModel.populateTournamentSetup(e)
                        }))
                    },
                    loadPlayerStatsJson: function() {
                        var e = this.context.config.playerStatsJsonPattern;
                        this.cacheBustLoad(e, this.proxy(function(e) {
                            this.context.leaderboardModel.populatePlayerStats(e)
                        }))
                    },
                    loadSponsors: function(e) {
                        if (this.context.config.sponsorsJson || !e) {
                            var t = this;
                            this.cacheBustLoad(this.context.config.sponsorsJson, function(r) {
                                try {
                                    t.context.leaderboardModel.populateSponsors(r)
                                } catch (e) {}
                                "function" == typeof e && e()
                            })
                        } else e()
                    },
                    loadOCQS: function(e) {
                        if (this.context.config.ocqsJson || !e) {
                            var t = this;
                            this.cacheBustLoad(this.context.config.ocqsJson, function(r) {
                                try {
                                    t.context.leaderboardModel.populateOCQS(r)
                                } catch (e) {}
                                "function" == typeof e && e()
                            })
                        } else e()
                    },
                    loadBroadcasts: function() {
                        var e = r.CountrySchedule.getCountryFeedUrl(this.context.config.broadcasts.feedUrl);
                        e && this.cacheBustLoad(e, this.proxy(this.onBroadcastsLoaded))
                    },
                    loadPlayoff: function() {
                        var e = this;
                        this.cacheBustLoad(this.context.config.playoffInfoJson, function(t) {
                            e.context.playoff.isPlayoff(t) && e.cacheBustLoad(e.context.config.playoffJson, function(t) {
                                e.context.playoff.processData(t)
                            })
                        })
                    },
                    loadMessage: function() {
                        var e = this;
                        this.cacheBustLoad(this.context.config.messageJson, function(t) {
                            var r = t;
                            e.context.config.weatherSponsorJson && !e.context.config.doNotShowWeatherSponsor ? e.cacheBustLoad(e.context.config.weatherSponsorJson, function(t) {
                                e.context.message.processMessage(r, t)
                            }) : e.context.message.processMessage(t)
                        })
                    },
                    loadMediaIcons: function() {
                        var e = this;
                        this.cacheBustLoad(this.context.config.mediaContentJson, function(t) {
                            e.context.media.processData(t)
                        })
                    },
                    loadArticles: function(e) {
                        var t = this;
                        this.cacheBustLoad(this.context.config.articlesFeedJsonPattern.replace("{0}", e), function(r) {
                            var o = t.context.presenter,
                                a = t.context.favouritePresenter;
                            t.context.workflows.parseMediaContent(o.playerRows[e], "articles", r), t.context.workflows.parseMediaContent(a.playerRows[e], "articles", r)
                        })
                    },
                    loadVideos: function(e) {
                        var t = this;
                        this.cacheBustLoad(this.context.config.videosFeedJsonPattern.replace("{0}", e), function(r) {
                            var o = t.context.presenter,
                                a = t.context.favouritePresenter;
                            t.context.workflows.parseMediaContent(o.playerRows[e], "videos", r), t.context.workflows.parseMediaContent(a.playerRows[e], "videos", r)
                        })
                    },
                    loadPhotos: function(e) {
                        var t = this;
                        this.cacheBustLoad(this.context.config.photosFeedJsonPattern.replace("{0}", e), function(r) {
                            var o = t.context.presenter,
                                a = t.context.favouritePresenter;
                            t.context.workflows.parseMediaContent(o.playerRows[e], "photos", r), t.context.workflows.parseMediaContent(a.playerRows[e], "photos", r)
                        })
                    },
                    checkFeatures: function(t, r) {
                        for (var o in t.playerRows) t.playerRows.hasOwnProperty(o) && t.playerRows[o] && (e.inArray(o, r) > -1 ? t.playerRows[o].showLiveAtFeature() : t.playerRows[o].hideLiveAtFeature())
                    },
                    loadStrackaData: function(e, t, r, o, a, n) {
                        var i = this.getStrackaUrl(e, t, r, o);
                        i && this.cacheBustLoad(i, function(t) {
                            a && a(e.player_id, t)
                        }, function() {
                            n ? n() : a(e.player_id, null)
                        })
                    },
                    getStrackaUrl: function(e, t, o, a) {
                        return this.context.config.strackaJsonPattern ? r.format(this.context.config.strackaJsonPattern, {
                            courseId: e.course_id,
                            year: this.context.leaderboardModel.year
                        }) : this.context.config.strackaApiPattern ? this.buildStrackaUrlForApi(e, t, a, o) : null
                    },
                    buildStrackaUrlForApi: function(e, t, o, a) {
                        var n = r.getItemByField(e.holes, "course_hole_id", o),
                            i = r.getLastItemByField(n.shots, "to", "OGR"),
                            d = r.getItemByField(t.holes, "hole_id", o),
                            s = r.getItemByField(d.round, "round_num", a.toString());
                        return i && s ? r.format(this.context.config.strackaApiPattern, {
                            PGACourseID: t.course_id,
                            HoleNumber: o,
                            Stimp: s.stimp || 0,
                            XBall: i.x,
                            YBall: i.y,
                            ZBall: i.z,
                            XPin: s.pin_x,
                            YPin: s.pin_y
                        }) : null
                    },
                    onBroadcastsLoaded: function(e) {
                        var t = this.context.config.broadcasts,
                            o = this.context.leaderboardModel.currentRound,
                            a = this.context.leaderboardModel.players,
                            n = r.CountrySchedule.getRoundFeaturedPlayers(e, t, o, a);
                        this.checkFeatures(this.context.presenter, n), this.checkFeatures(this.context.favouritePresenter, n)
                    }
                })
            }(jQuery, window, pgatour)
        },
        SJy7: function(e, t) {
            ! function(e, t, r) {
                r.setModulePath("playerDrawer"), r.playerDrawer.ShotTrackerTab = r.playerDrawer.ShotTrackerTab || r.BaseMediaContentModule.extend({
                    SHOT_TRACKER_CONTAINER: ".shot-tracker",
                    VIEW_TOGGLE_BUTTONS: ".details-map-menu .btn:visible",
                    GREEN_VIEW_TOGGLE: ".details-map-menu .zoom-in",
                    HOLE_VIEW_TOGGLE: ".details-map-menu .zoom-out",
                    GROUP_VIEW_TOGGLE: ".details-map-menu .view-group",
                    SINGLE_VIEW_TOGGLE: ".details-map-menu .view-single",
                    PLAYER_LEGEND: ".details-map-legend",
                    DEFAULT_PLAYER_MODE: "single",
                    DEFAULT_FIELD_MODE: "hole",
                    greenViewButton: null,
                    holeViewButton: null,
                    groupViewButton: null,
                    singleViewButton: null,
                    playerLegend: null,
                    shotTrackerContainer: null,
                    shotTrackerTemplate: null,
                    defaults: {
                        baseImageUrl: r.TrustedHosts.CLOUDINARY_PGAT + "/image/upload/c_fill,h_120",
                        courseImageTypeFull: "full",
                        courseImageTypeGreen: "green",
                        courseImageTypeStracka: "stracka_green",
                        courseImageUrl: "{baseUrl}/holes_{year}_{tour}_{tourId:3}_{courseId:3}_overhead_{type}_{hole}.png",
                        fieldHeight: 334,
                        fieldMode: "hole",
                        fieldWidth: 736,
                        lineThickness: 2,
                        markerFontSize: 12,
                        markerImageUrl: "/modules/page.tournament/shot-tracker/img/",
                        markerRatio: .65,
                        playerHole: null,
                        playerHoles: null,
                        playerMode: "single",
                        plotColor: "white",
                        plotRadius: 3
                    },
                    constructor: function(t, o, a) {
                        this.options = e.extend({}, this.defaults, o), this.pid = a, this.inPlayerSelectMode = !1, this.rendered = !1, this.base(t), r.buttons || (r.buttons = {}), e.templates({
                            sttShotTrackerTemplate: {
                                markup: "#idShotTrackerTemplate",
                                helpers: {
                                    getPlayerClass: this.proxy(this.getPlayerClass)
                                }
                            }
                        })
                    },
                    init: function() {
                        this.base(), this.showToolTips()
                    },
                    buildButtons: function() {
                        return {
                            showGreenHole: this.options.showGreenHole,
                            showGroupSingle: this.options.showGroupSingle,
                            showModal: this.options.showModal,
                            playerMode: this.options.playerMode,
                            fieldMode: this.options.fieldMode
                        }
                    },
                    buildHoleDetails: function() {
                        var e = {
                                showHoleDetails: this.options.showHoleDetails,
                                showHoleRank: this.options.showHoleRank,
                                holeNumber: this.options.hole,
                                par: "0",
                                distance: "0",
                                rank: "--"
                            },
                            t = JSPath(".holes {.hole_id == $holeId}", this.options.course, {
                                holeId: parseInt(this.options.hole, 10)
                            });
                        if (t.length) {
                            e.rank = t[0].round_rank;
                            var r = this.options.round || 0,
                                o = JSPath(".round {.round_num === $roundNum}", t[0], {
                                    roundNum: r.toString()
                                });
                            o.length && (e.par = o[0].par, e.distance = o[0].distance)
                        }
                        return e
                    },
                    buildLegend: function() {
                        for (var e, t = {
                                showLegend: this.options.showLegend,
                                playerNames: []
                            }, r = 0; r < this.options.playerNames.length; r++) e = this.options.playerNames[r], t.playerNames.push({
                            firstName: e.firstName,
                            lastName: e.lastName,
                            displayName: e.displayName,
                            color: this.options.lineColors[r].name
                        });
                        return t
                    },
                    getPlayerClass: function(e) {
                        return "player player-" + e
                    },
                    initShotTrackerToggles: function() {
                        if (this.bindButtonEvents(), this.shotTrackerContainer.on("no-course-image", this.proxy(this.onNoCourseImage)), this.options.allowLegendEvents) {
                            var t = this.playerLegend.find(".player");
                            t.bind("mouseover", this.proxy(this.onLegendPlayerMouseOver)), t.bind("mouseout", this.proxy(this.onLegendPlayerMouseOut)), t.bind("click", this.proxy(this.onLegendPlayerClicked)), e(document).on("keyup", this.proxy(function(e) {
                                27 === e.keyCode && this.inPlayerSelectMode && this.onEscapeKeyUp()
                            }))
                        }
                    },
                    bindButtonEvents: function() {
                        this.setButtonProperties(), this.unbindButtonEvents(), this.greenViewButton.bind("click", this.proxy(this.onGreenViewClicked)), this.holeViewButton.bind("click", this.proxy(this.onHoleViewClicked)), this.groupViewButton.bind("click", this.proxy(this.onGroupViewClicked)), this.singleViewButton.bind("click", this.proxy(this.onSingleViewClicked))
                    },
                    setButtonProperties: function() {
                        this.greenViewButton = this.container.find(this.GREEN_VIEW_TOGGLE), this.holeViewButton = this.container.find(this.HOLE_VIEW_TOGGLE), this.groupViewButton = this.container.find(this.GROUP_VIEW_TOGGLE), this.singleViewButton = this.container.find(this.SINGLE_VIEW_TOGGLE)
                    },
                    unbindButtonEvents: function() {
                        this.greenViewButton.unbind("click", this.proxy(this.onGreenViewClicked)), this.holeViewButton.unbind("click", this.proxy(this.onHoleViewClicked)), this.groupViewButton.unbind("click", this.proxy(this.onGroupViewClicked)), this.singleViewButton.unbind("click", this.proxy(this.onSingleViewClicked))
                    },
                    onNoCourseImage: function() {
                        this.options.showGreenHole = !1, this.options.showGroupSingle = !1, this.options.showModal = !1, this.updateShotTrackerData()
                    },
                    initShotTracker: function() {
                        this.options.hideShotTracker || 1 === this.options.scoringType || 2 === this.options.scoringType || (this.shotTracker ? this.shotTracker.update(this.options) : this.shotTracker = new r.ShotTracker(this.shotTrackerContainer, this.options))
                    },
                    render: function() {
                        this.shotTrackerData = {
                            holeDetails: this.buildHoleDetails(),
                            buttons: this.buildButtons(),
                            legend: this.buildLegend()
                        }, e.templates.sttShotTrackerTemplate.link(this.container, this.shotTrackerData), this.shotTrackerContainer = this.container.find(this.SHOT_TRACKER_CONTAINER), this.playerLegend = this.container.find(this.PLAYER_LEGEND), this.initShotTrackerToggles(), this.rendered = !0
                    },
                    restoreSelectPlayer: function() {
                        this.options.playerHoles = this.playerHoles, this.options.lineColors = this.lineColors, this.update(), this.inPlayerSelectMode = !1
                    },
                    setCurrentPlayerMode: function(e) {
                        this.options.playerMode = e
                    },
                    show: function() {
                        this.rendered || this.render();
                        try {
                            this.initShotTracker()
                        } catch (e) {}
                        this.updateShotTrackerData(), this.bindButtonEvents(), this.shotTracker && this.shotTracker.togglePlayerMode(this.options.playerMode), this.showToolTips()
                    },
                    updateShotTrackerData: function() {
                        var e = {
                            holeDetails: this.buildHoleDetails(),
                            buttons: this.buildButtons(),
                            legend: this.buildLegend()
                        };
                        r.syncObservableObject(e, this.shotTrackerData)
                    },
                    showToolTip: function(t, o) {
                        var a = o.className;
                        if (!r.buttons[a] || !r.buttons[a].hidden) {
                            var n = e(o);
                            n.popover({
                                trigger: "manual",
                                placement: "left"
                            }), n.popover("show"), n.on("mouseover", this.proxy(this.onToolTipMouseOver)), r.buttons[a] = {
                                hidden: !1,
                                $element: n
                            }
                        }
                    },
                    showToolTips: function() {
                        if (this.options.showToolTips) {
                            var e;
                            for (var t in r.buttons) r.buttons.hasOwnProperty(t) && ((e = r.buttons[t]).hidden || e.$element.popover("hide"));
                            this.container.find(this.VIEW_TOGGLE_BUTTONS).each(this.proxy(this.showToolTip))
                        }
                    },
                    toggleFieldMode: function(t) {
                        this.options.fieldMode = t, this.shotTracker.toggleFieldMode(t), e.observable(this.shotTrackerData.buttons).setProperty("fieldMode", t), this.showToolTips()
                    },
                    update: function(e) {
                        var t;
                        if (e)
                            for (t in e) e.hasOwnProperty(t) && (this.options[t] = e[t]);
                        this.show()
                    },
                    updateFieldMode: function(t, r) {
                        this.shotTracker && (this.options.fieldMode = t, this.shotTracker.toggleFieldMode(t), e.observable(this.shotTrackerData.buttons).setProperty("fieldMode", this.options.fieldMode), this.container.trigger("field-mode", [t, r]))
                    },
                    updatePlayerMode: function(t, r) {
                        this.shotTracker && (this.options.playerMode = t, this.shotTracker.togglePlayerMode(t, this.proxy(this.onUpdatePlayerMode, t, Date.now())), e.observable(this.shotTrackerData.buttons).setProperty("playerMode", this.options.playerMode), this.container.trigger("player-mode", [t, r]))
                    },
                    onEscapeKeyUp: function() {
                        this.restoreSelectPlayer()
                    },
                    onEscapeMessageMouseOver: function() {
                        this.$escPopover.popover("hide")
                    },
                    onGreenViewClicked: function(e, t) {
                        this.updateFieldMode("green", t)
                    },
                    onGroupViewClicked: function(t, r) {
                        this.updatePlayerMode("group", r), this.options.allowLegendEvents && (this.$popover = e(this.playerLegend.find(".player")[0]), this.$popover.popover({
                            trigger: "manual",
                            placement: "left",
                            content: "Click to see trails"
                        }), this.$popover.popover("show"), this.playerLegend.on("mouseover", this.proxy(this.onPlayerLegendMouseOver)))
                    },
                    onHoleViewClicked: function(e, t) {
                        this.updateFieldMode("hole", t)
                    },
                    onLegendPlayerClicked: function() {
                        this.inPlayerSelectMode = !0, this.$escPopover = this.container.find(".esc-popover"), this.$escPopover.popover({
                            trigger: "manual",
                            placement: "top",
                            content: "Click esc to see all trails"
                        }), this.$escPopover.popover("show"), this.container.find(".esc-popover-main").on("mouseover", this.proxy(this.onEscapeMessageMouseOver))
                    },
                    onLegendPlayerMouseOut: function() {
                        this.inPlayerSelectMode || this.restoreSelectPlayer()
                    },
                    onLegendPlayerMouseOver: function(t) {
                        if (!this.inPlayerSelectMode) {
                            var r = e(t.currentTarget).attr("data-player-index");
                            this.playerHoles = this.options.playerHoles, this.lineColors = this.options.lineColors, this.options.playerHoles = [this.playerHoles[r]], this.options.lineColors = [this.lineColors[r]], this.update()
                        }
                    },
                    onPlayerLegendMouseOver: function() {
                        this.$popover.popover("hide")
                    },
                    onSingleViewClicked: function(e, t) {
                        this.inPlayerSelectMode && this.restoreSelectPlayer(), this.updatePlayerMode("single", t), this.$popover && this.$popover.popover("hide"), this.$escPopover && this.$escPopover.popover("hide")
                    },
                    onToolTipMouseOver: function(t) {
                        var o = t.currentTarget,
                            a = o.className;
                        e(o).popover("hide"), r.buttons[a].hidden = !0
                    },
                    onUpdatePlayerMode: function(e, t) {
                        "single" === e ? this.options.customEventTracker.trackGroupViewOpen(t) : "group" === e && this.options.customEventTracker.trackGroupViewRender(t)
                    },
                    onShow: function() {}
                })
            }(jQuery, window, pgatour)
        },
        ShO3: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.ShotTrackerTab = o.ShotTrackerTab || o.AbstractScorecardsTab.extend({
                    SHOT_TRACKER_CONTAINER: ".shot-tracker",
                    DEFAULT_PLAYER_MODE: "single",
                    DEFAULT_FIELD_MODE: "hole",
                    SHOT_TRACKER_HOLDER_TEMPLATE: '<div class="shot-tracker-holder"></div>',
                    PLAY_BUTTON_TEMPLATE: '<span class="play-video-button">Play Video</span>',
                    shotTrackerContainer: null,
                    courseImageRendered: !1,
                    scorecardRendered: !1,
                    holeVideos: {},
                    constructor: function(e, t, r, o, a, n) {
                        this.base(e, t, r, o, "shottracker", a, n)
                    },
                    render: function() {
                        this.currentFieldMode = this.DEFAULT_FIELD_MODE, this.currentPlayerMode = this.DEFAULT_PLAYER_MODE, this.shotTrackerHolder = e(this.SHOT_TRACKER_HOLDER_TEMPLATE), this.playButton = e(this.PLAY_BUTTON_TEMPLATE), this.container.append(this.shotTrackerHolder), this.shotTrackerHolder.after(this.playButton), this.playButton.unbind("click").on("click", this.proxy(this.onLinkClick)), this.context.userModel.showToolTips(this.type), this.initShotTrackerToggles(), this.base()
                    },
                    renderShotTrackerTab: function() {
                        var e = this.buildShotTrackerOptions(this.player);
                        this.shotTrackerTab = new r.playerDrawer.ShotTrackerTab(this.shotTrackerHolder, e, this.pid), this.shotTrackerTab.render(), this.context.leaderboardModal.updateShotTracker(this.player.player_id, this.isMyLb)
                    },
                    buildShotTrackerOptions: function(t) {
                        var o = this.buildShotTrailsOptions(t),
                            a = {
                                baseImageUrl: r.TrustedHosts.CLOUDINARY_PGAT + "/image/upload/c_fill,h_120,b_rgb:424242",
                                courseImageUrl: "{baseUrl}/holes_{year}_{tour}_{tourId:3}_{courseId:3}_overhead_{type}_{hole}.jpg",
                                fieldMode: this.currentFieldMode,
                                showGreenHole: 3 === this.context.leaderboardModel.scoringType,
                                showGroupSingle: 3 === this.context.leaderboardModel.scoringType,
                                showModal: 3 === this.context.leaderboardModel.scoringType,
                                onRenderCourseImage: this.proxy(this.onRenderShotTrackerImage),
                                customEventTracker: this.context.customEventTracker
                            };
                        return e.extend(a, o), t.course && !t.course.is_host && (a.showGroupSingle = !1, a.showLegend = !1), a
                    },
                    initShotTracker: function(e, t) {
                        this.shotTrackerTab || this.renderShotTrackerTab();
                        var r = this.player,
                            o = e || parseInt(r.selectedHole, 10) || 1,
                            a = t || r.selectedRoundId || 1,
                            n = this.getHoleVideo(o, a);
                        this.togglePlayButton(n);
                        var i = {
                            course: r.course,
                            hole: o,
                            fieldMode: this.currentFieldMode,
                            playerHoles: this.getPlayerHoles(r),
                            playerMode: this.currentPlayerMode,
                            playerNames: this.getPlayerNames(r),
                            round: a,
                            showGreenHole: 3 === this.context.leaderboardModel.scoringType,
                            showGroupSingle: 3 === this.context.leaderboardModel.scoringType,
                            showLegend: !0
                        };
                        r.course && !r.course.is_host && (i.showGroupSingle = !1, i.showLegend = !1), this.shotTrackerTab.update(i)
                    },
                    initShotTrackerToggles: function() {
                        this.container.bind("field-mode", this.proxy(this.onFieldModeChange)), this.container.bind("player-mode", this.proxy(this.onPlayerModeChange)), this.context.leaderboardModal.bindThumbs(this.container, this.type, this.isMyLb)
                    },
                    initHoleVideo: function(e, t, r) {
                        this.base(e, t), this.addHoleVideo(e, t, r)
                    },
                    addHoleVideo: function(e, t, r) {
                        var o = "r" + e + "/h" + t;
                        this.holeVideos[this.pid] || (this.holeVideos[this.pid] = {}), this.holeVideos[this.pid][o] || (this.holeVideos[this.pid][o] = r)
                    },
                    togglePlayButton: function(e) {
                        this.playButton.attr("data-video-id", e).toggle(Boolean(e))
                    },
                    getHoleVideo: function(e, t) {
                        var r = "r" + t + "/h" + e;
                        return this.holeVideos[this.pid] && this.holeVideos[this.pid][r] || ""
                    },
                    setCurrentHole: function(e, t) {
                        this.base(e, t), this.shotTrackerTab && this.initShotTracker(e, t)
                    },
                    update: function(e) {
                        this.base(e), this.setCurrentHole(this.currentHole, this.currentRound), this.context.leaderboardModal.updateShotTracker(e.player_id, this.isMyLb)
                    },
                    show: function(e) {
                        this.base(e), setTimeout(this.proxy(this.initShotTracker), 100)
                    },
                    hide: function() {
                        this.base(), this.shotTrackerHolder.empty(), this.shotTrackerTab = null
                    },
                    onFieldModeChange: function(e, t, r) {
                        t !== this.currentFieldMode && (this.currentFieldMode = t, "green" === t ? this.context.analytics.stGreenView(this.pid, this, r) : this.context.analytics.stHoleView(this.pid, this, r))
                    },
                    onPlayerModeChange: function(e, t, r) {
                        t !== this.currentPlayerMode && (this.currentPlayerMode = t, this.context.controller.playerModeSelect(this.pid, this.isMyLb, t), "group" === t ? this.context.analytics.stGroupView(this.pid, this, r) : this.context.analytics.stPlayerView(this.pid, this, r))
                    },
                    onShow: function() {
                        this.scorecardRendered || (this.context.customEventTracker.trackScorecardRendering(), this.scorecardRendered = !0)
                    },
                    onRenderShotTrackerImage: function() {
                        this.courseImageRendered || (this.context.customEventTracker.trackShotTrackerImageRendering(this.context._timings.OPEN_DRAWER_START), this.courseImageRendered = !0)
                    }
                })
            }(jQuery, window, pgatour)
        },
        Somt: function(e, t) {
            ! function(e, t, r) {
                r.DrawerModal = r.DrawerModal || r.VideoPlayer.extend({
                    OVERLAY: "#leaderboardModalOverlay",
                    MODAL_WINDOW: ".window",
                    TAB_CONTROLS: ".tab-controls",
                    TYPE_ATTRIBUTE: "data-tab-type",
                    PID_ATTRIBUTE: "data-pid",
                    VIDEO_ID_ATTRIBUTE: "data-video-id",
                    ACTIVE_TAB_CLASS: "active",
                    TABS_CONTAINER: ".tabs-container",
                    TAB_CONTENT: ".tab-content",
                    PLAYER_NAME: ".name",
                    SHOTTRACKER_THUMBS: ".view-full",
                    VIDEO_THUMBS: ".thumb[data-video-id], .has-video[data-video-id]",
                    SCORECARDS_VIDEO_THUMBS: ".has-video[data-video-id]",
                    SLIDER: ".slider ul",
                    ROW_PLAYER_NAME: ".player-name",
                    COMMENTS_TOGGLE: ".comments-toggle",
                    COMMENTS_SHOW_BUTTON: ".show",
                    COMMENTS_HIDE_BUTTON: ".hide",
                    COMMENTS_COUNT: ".comments-count-bubble",
                    COMMENTS_CONTAINER: ".leaderboard-modal-commentary",
                    TOP_AD: ".top-ad",
                    GREEN_VIEW_ENABLED: ".green-view-enabled",
                    DRAWER_VIDEO_TAB: ".tab[data-tab-type=videos]",
                    MEDIUM_ROW: ".visible-medium",
                    VIDEO_TAB: "[data-tab-type=videos]",
                    VIDEO_HIGHLIGHTS: "new-video",
                    COURSE_IMAGE_PADDING: 40,
                    init: function() {
                        this.container.parent().prependTo("body"), this.initTabs(), this.initProperties(), this.initHandlers(), this.initBindings(), this.shotTrackerTab = new r.DrawerModalShottrackerTab(this.getTabContainer("shottracker"), {
                            drawerModal: this
                        }), this.base()
                    },
                    initProperties: function() {
                        this.$playerName = this.container.find(this.PLAYER_NAME), this.$topAds = this.container.find(this.TOP_AD)
                    },
                    initHandlers: function() {
                        this.container.on("click", this.SCORECARDS_VIDEO_THUMBS, this.proxy(this.onScorecardsVideoThumbClick)), this.initCommentsControls()
                    },
                    initBindings: function() {
                        this.onModalAdViewable = this.proxy(this.onModalAdViewable), this.onModalAdRequest = this.proxy(this.onModalAdRequest)
                    },
                    initTabs: function() {
                        this.$tabControls = this.container.find(this.TAB_CONTROLS), this.$tabButtons = this.$tabControls.find("[" + this.TYPE_ATTRIBUTE + "]"), this.$tabsContainer = this.container.find(this.TABS_CONTAINER), this.$tabs = this.$tabsContainer.find(this.TAB_CONTENT), this.$videoTab = this.$tabControls.find(this.VIDEO_TAB), this.$tabControls.on("click", "[" + this.TYPE_ATTRIBUTE + "]", this.proxy(this.onTabClick))
                    },
                    initSlider: function() {
                        this.slider || (this.slider = this.container.find(this.SLIDER).bxSlider({
                            controls: !0
                        }))
                    },
                    initCommentsControls: function() {
                        this.$commentsToggle = this.container.find(this.COMMENTS_TOGGLE), this.$commentsShowButton = this.$commentsToggle.find(this.COMMENTS_SHOW_BUTTON), this.$commentsHideButton = this.$commentsToggle.find(this.COMMENTS_HIDE_BUTTON), this.$commentsCount = this.$commentsToggle.find(this.COMMENTS_COUNT), this.$commentsVideoContainer = this.container.find(this.COMMENTS_CONTAINER), this.$commentsShowButton.on("click", this.proxy(this.toggleComments, !0)), this.$commentsHideButton.on("click", this.proxy(this.toggleComments, !1)), e(t).on("livefyreCommentsRendered", this.proxy(this.onCommentsRendered)), e(t).on("livefyreCommentCountUpdated", this.proxy(this.onCommentsCountUpdate))
                    },
                    initComments: function(e) {
                        this.$commentsToggle.hide(), this.toggleComments(!1), this.commentsConfig = e, e && e.articleId && e.collectionMeta && e.checksum && ("" === e.siteId && delete e.siteId, this.commentsModule ? this.commentsModule.updateWidget(e) : this.commentsModule = new r.CommentsLivefyre(this.COMMENTS_CONTAINER, e))
                    },
                    bindContext: function(e) {
                        this.context = e
                    },
                    open: function(t, r, o, a) {
                        this.resetState();
                        var n = this.context;
                        this.pid = t, this.isMyLb = a, this.row = a ? n.favouritePresenter.playerRows[t] : n.presenter.playerRows[t], this.$row = o, this.$playerName.text(this.$row.find(this.ROW_PLAYER_NAME).first().text()), this.playerLoaded = e.Deferred(), "shottracker" !== r && (this.savedTab = r, this.context.controller.tabSelect(this.pid, this.isMyLb, "shottracker")), this.prepareVideoModal(this.proxy(this.onShowVideoModal)), this.initVideoTab(), this.initShotTrackerTab(), this.setActiveTab(r, !0), this.initAdTracking(r)
                    },
                    initVideoTab: function() {
                        var e = this.videos = this.getVideos(this.pid),
                            t = e && e.length > 0;
                        this.toggleTabButton("videos", t), t && (this.activeVideo = e[0], this.setupValuesForKrux(this.activeVideo), this.stopVideoContainerPlaying(), this.runWhenPlayerLoaded(this.proxy(this.onPlayerLoaded)))
                    },
                    initShotTrackerTab: function() {
                        var e = 3 === this.context.leaderboardModel.scoringType && this.shotTrackerTab.open(this.row, this.$row);
                        this.toggleTabButton("shottracker", e)
                    },
                    initAdTracking: function(e) {
                        this.initTopAdTracking(e), this.initDrawerAdTracking(e)
                    },
                    initTopAdTracking: function(e) {
                        var t = this.getTopAdByTabContainer(e).find(".js-ad").data("ad-api");
                        t && t.addRequestCallback(this.onModalAdSponsorRequest, this, t)
                    },
                    initDrawerAdTracking: function(e) {
                        var t = this.getTabContainer(e).find(".js-ad").data("ad-api");
                        t && (t.addViewableCallback(this.onModalAdViewable, this, t), t.addRequestCallback(this.onModalAdRequest, this, t))
                    },
                    hideModal: function() {
                        this.base(), this.savedTab && "videos" !== this.savedTab && !this.isLargeScreen() && this.context.controller.tabSelect(this.pid, this.isMyLb, this.savedTab), this.resetState(), e(t).off(".leaderboardModal")
                    },
                    toggleTabButton: function(e, t) {
                        this.getTabButton(e).parent().toggle(t)
                    },
                    getTabContainer: function(e) {
                        return this.$tabs.filter("[" + this.TYPE_ATTRIBUTE + '="' + e + '"]')
                    },
                    getTabButton: function(e) {
                        return this.$tabButtons.filter("[" + this.TYPE_ATTRIBUTE + '="' + e + '"]')
                    },
                    getTopAdByTabContainer: function(e) {
                        return this.$topAds.filter("[" + this.TYPE_ATTRIBUTE + '="' + e + '"]')
                    },
                    setActiveTab: function(t, r) {
                        t !== this.activeTab && (this.activeTab = t, this.changeTab(t, r), "videos" === t && (e(window).trigger("video-highlights-update", this.pid), this.videoPlayer || this.playerLoaded.then(this.proxy(this.playModal, this.activeVideo))), "shottracker" === t && (this.pauseVideo(), this.shotTrackerTab.update()), this.changeAds(t), this.slider || this.requestRelatedVideos(), this.updateVideoHighlights())
                    },
                    changeTab: function(e, t) {
                        this.$container.find(this.MODAL_WINDOW).attr("class", "window " + e), this.$tabs.hide(), this.$topAds.hide(), this.getTabContainer(e).show(0, this.proxy(this.onShowTabContainer, t)), this.$tabControls.find("." + this.ACTIVE_TAB_CLASS).removeClass(this.ACTIVE_TAB_CLASS), this.getTabButton(e).parent().addClass(this.ACTIVE_TAB_CLASS)
                    },
                    changeAds: function(e) {
                        var t = this.getTopAdByTabContainer(e).show(),
                            r = this.getTabContainer(e).add(t);
                        this.updateAds(r)
                    },
                    bindThumbs: function(e, t, r) {
                        "shottracker" === t && (e.off("click.leaderboardModal"), e.on("click.leaderboardModal", this.SHOTTRACKER_THUMBS, this.proxy(this.onThumbClick, t, r)))
                    },
                    playModal: function(e) {
                        this.activeVideo = e, this.base(e, this.config.videoPlayerOptions)
                    },
                    playModalVideo: function(e) {
                        this.changeTab("videos"), this.activeTab = "videos", this.runWhenPlayerLoaded(this.proxy(this.playModal, e))
                    },
                    pauseVideo: function() {
                        this.videoPlayer && this.videoPlayer.pause()
                    },
                    resetState: function() {
                        this.activeTab = null, this.activeVideo = null, this.pid = null, this.videos = null, this.row = null, this.$row = null, this.savedTab = null, this.$commentsToggle.hide(), this.$commentsCount.text(0), this.toggleComments(!1), this.updatedAds = [], this.$tabs.hide(), this.$topAds.hide(), this.shotTrackerTab && this.shotTrackerTab.resetState()
                    },
                    requestRelatedVideos: function() {
                        this.removeSlider();
                        var e = this.getRelatedVideos(this.videos),
                            t = this.getSliderContentMarkup(e);
                        this.sliderContainer.html(t), e.length > 4 && this.initSlider(), this.sliderContainer.find(this.VIDEO_THUMBS).on("click", this.proxy(this.onRelatedVideoClick)), this.stretchImages()
                    },
                    getVideos: function() {
                        var t = [],
                            r = this.row && this.row.videos && this.row.videos.items;
                        if (r && r.length)
                            for (var o = 0; o < r.length; o++) {
                                var a = e.extend(!0, {}, r[o]);
                                a.tags && Array.isArray(a.tags) && (a.tags = r[o].tags.join(",")), t.push(a)
                            }
                        return t
                    },
                    getVideoById: function(e, t) {
                        for (var r = 0; r < e.length; r++)
                            if (e[r].videoId === t) return e[r];
                        return null
                    },
                    getRelatedVideos: function(t) {
                        for (var r = [], o = 0; o < t.length; o++) {
                            var a = e.extend({}, t[o]);
                            a.tags = t[o].tags.split(","), r.push(a)
                        }
                        return r
                    },
                    toggleComments: function(e) {
                        this.$commentsShowButton.toggle(!e), this.$commentsHideButton.toggle(e), this.$commentsVideoContainer.toggle(e)
                    },
                    updateCommentsCount: function(e) {
                        var t = e && e.articleId,
                            r = this.commentsConfig && this.commentsConfig.articleId;
                        t && t === r && (this.$commentsCount.text(e.count), this.$commentsToggle.show())
                    },
                    updateCompanionAd: function() {},
                    updateAds: function(e) {
                        for (var t = e.find(".js-ad"), r = 0; r < t.length; r++) {
                            var o = t.eq(r).data("ad-api");
                            o && -1 === this.updatedAds.indexOf(o.id) && (o.update(), this.updatedAds.push(o.id))
                        }
                    },
                    updateShotTracker: function(e, t) {
                        this.shotTrackerTab && this.pid === e && this.isMyLb === t && this.shotTrackerTab.update()
                    },
                    updateVideoHighlights: function() {
                        var e = this.$row.find(this.DRAWER_VIDEO_TAB).hasClass(this.VIDEO_HIGHLIGHTS);
                        this.$videoTab.toggleClass(this.VIDEO_HIGHLIGHTS, e)
                    },
                    orientationChange: function(e) {
                        this.$row && this.context.analytics.trackOrientationChange(this.pid, e)
                    },
                    onCommentsRendered: function(e, t) {
                        this.updateCommentsCount(t)
                    },
                    onCommentsCountUpdate: function(e, t) {
                        this.updateCommentsCount(t)
                    },
                    onThumbClick: function(t, r, o) {
                        this.context.customEventTracker.saveDrawerModalOpenTime();
                        var a = e(o.target).closest("[" + this.PID_ATTRIBUTE + "]"),
                            n = a.attr(this.PID_ATTRIBUTE);
                        this.open(n, t, a, r)
                    },
                    onTabClick: function(t) {
                        var r = e(t.target).attr(this.TYPE_ATTRIBUTE);
                        this.setActiveTab(r)
                    },
                    onPlayerLoaded: function() {
                        this.playerLoaded.resolve()
                    },
                    onScorecardsVideoThumbClick: function(t) {
                        var r = e(t.target).attr(this.VIDEO_ID_ATTRIBUTE),
                            o = this.getVideoById(this.videos, r);
                        o && (this.activeVideo = o, this.setActiveTab("videos"))
                    },
                    onRelatedVideoClick: function(t) {
                        var r = this.getVideoObjectFromThumb(e(t.currentTarget));
                        this.runWhenPlayerLoaded(this.proxy(this.playModal, r))
                    },
                    onShowTabContainer: function(e) {
                        e && this.context.customEventTracker.trackLbModalRender()
                    },
                    onShowVideoModal: function() {
                        this.context.customEventTracker.trackLbModalOpen()
                    },
                    onModalAdViewable: function(e) {
                        this.context.customEventTracker.trackLbModalAdRender(), e.data.removeViewableCallback(this.onModalAdViewable)
                    },
                    onModalAdRequest: function(e) {
                        this.context.customEventTracker.trackLbModalAdRequest(), e.data.removeRequestCallback(this.onModalAdRequest)
                    },
                    onModalAdSponsorRequest: function(e) {
                        this.context.customEventTracker.trackLbModalAdSponsorRequest(), e.data.removeRequestCallback(this.onModalAdSponsorRequest)
                    }
                })
            }(jQuery, window, pgatour)
        },
        UINd: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.RenderUtils = o.RenderUtils || r.Base.extend({
                    context: null,
                    constructor: function(e) {
                        this.base(), this.context = e
                    },
                    safeValue: function(e) {
                        return 0 === e ? "E" : e || "--"
                    },
                    safeValueStatus: function(e) {
                        return 0 === e ? "E" : e ? e.toString().indexOf("-") > -1 ? e.toString() : "+" + e.toString() : "--"
                    },
                    safeMovement: function(e, t, r) {
                        if (this.isEmpty(e) || this.isEmpty(t)) return "--";
                        var o, a = e.replace("T", ""),
                            n = t.replace("T", "");
                        return isNaN(a) || isNaN(n) || (o = a - n, isNaN(o) || 0 === o) ? "--" : r ? Math.abs(o) : o
                    },
                    isEmpty: function(e) {
                        return null === e || "" === e || 0 === e
                    },
                    isTeedOff: function(e, t) {
                        if (e.thru) return !0;
                        if (e.current_round !== t) return !0;
                        if (e.holes)
                            for (var r = 0; r < e.holes.length; r++)
                                if (e.holes[r].shots && e.holes[r].shots.length > 0) return !0;
                        return !1
                    },
                    getTeeTime: function(e, t) {
                        for (var r = 0; r < e.rounds.length; r++)
                            if (e.rounds[r].round_number === t) {
                                if (e.rounds[r].tee_time) return moment(e.rounds[r].tee_time).format("h:mm a");
                                break
                            }
                        return "--"
                    },
                    getHoleShots: function(e, t) {
                        if (!e.holes) return [];
                        for (var r = 0; r < e.holes.length; r++)
                            if (e.holes[r] && e.holes[r].course_hole_id === t) {
                                var o = e.holes[r].shots;
                                return o ? o.slice().reverse() : []
                            }
                        return []
                    },
                    renderLastShotDescription: function(e) {
                        var t = this.getHoleShots(e, e.course_hole);
                        return t && t.length && t.length > 0 ? this.renderShotDescription(t[0]) : null
                    },
                    renderShotDescription: function(e) {
                        return e.shottext
                    },
                    renderThru: function(e) {
                        var t = "";
                        return t = "18" === e.thru || 18 === e.thru ? "F" : this.safeValue(e.thru), (10 === e.start_hole || e.back9) && (t += "*"), t
                    },
                    getRankType: function(e) {
                        var t, r = this.context.config.championsPlayoff,
                            o = this.context.config.isFinals,
                            a = parseInt(this.context.leaderboardModel.year, 10) > 2018;
                        switch (e) {
                            case "s":
                                t = r ? "schwabRank" : "moneyRank";
                                break;
                            case "h":
                                t = o ? "startRank" : a ? "pointsRank" : "moneyRank";
                                break;
                            case "c":
                                t = "moneyRank";
                                break;
                            default:
                                t = "cupRank"
                        }
                        return t
                    },
                    renderRank: function(e, t) {
                        var r = this.getRankType(t),
                            o = this.safeValue(e[r]);
                        return "E" === o && (o = "--"), o
                    },
                    renderRankMovement: function(e, t, r) {
                        var o;
                        switch (this.getRankType(t)) {
                            case "moneyRank":
                                o = this.safeMovement(e.rankings.money_start_rank, e.rankings.money_proj_rank, r);
                                break;
                            case "schwabRank":
                                o = this.safeMovement(e.rankings.schwab_start_rank, e.rankings.schwab_proj_rank, r);
                                break;
                            case "pointsRank":
                                o = this.safeMovement(e.rankings.points_start_rank, e.rankings.points_proj_rank, r);
                                break;
                            case "startRank":
                                o = this.safeMovement(e.rankings.start_rank, e.rankings.proj_rank, r);
                                break;
                            default:
                                o = this.safeMovement(e.rankings.cup_rank, e.rankings.projected_cup_rank, r)
                        }
                        return o
                    },
                    renderStartRank: function(e, t) {
                        return this.renderRank({
                            moneyRank: e.rankings.money_start_rank,
                            pointsRank: e.rankings.points_start_rank,
                            schwabRank: e.rankings.schwab_start_rank,
                            startRank: e.rankings.start_rank,
                            cupRank: e.rankings.cup_rank
                        }, t)
                    },
                    renderProjRank: function(e, t) {
                        return this.renderRank({
                            moneyRank: e.rankings.money_proj_rank,
                            pointsRank: e.rankings.points_proj_rank,
                            schwabRank: e.rankings.schwab_proj_rank,
                            startRank: e.rankings.proj_rank,
                            cupRank: e.rankings.projected_cup_rank
                        }, t)
                    },
                    generateHFinalsRankColor: function(e) {
                        var t = e.priority_seed,
                            r = e.priority_proj_rank;
                        return r && (r = r.replace("T", "")), !isNaN(r) && 1 === parseInt(r, 10) && t && t <= 25 ? "finals-ranking-gold" : t || !isNaN(r) && parseInt(r, 10) <= 50 ? "finals-ranking-green" : "finals-ranking-red"
                    },
                    getHoleResultClass: function(e, t) {
                        return e && t ? e - t > 2 ? "result3" : e - t < -2 ? "result-3" : "result" + (e - t) : ""
                    },
                    getAbsValue: function(e) {
                        return Math.abs(e)
                    }
                })
            }(jQuery, window, pgatour)
        },
        Xl6b: function(e, t) {
            ! function(e, t) {
                t.shottracker.model.RoundModel = t.Base.extend({
                    _data: null,
                    num: null,
                    tee: null,
                    cup: null,
                    stimp: 0,
                    constructor: function(e) {
                        this._data = e, this.id = e.round_num, this.tee = new t.shottracker.math.Vector3(parseFloat(e.tee_x), parseFloat(e.tee_y), parseFloat(e.tee_z)), this.cup = new t.shottracker.math.Vector3(parseFloat(e.pin_x), parseFloat(e.pin_y), parseFloat(e.pin_z)), e.stimp && (this.stimp = e.stimp)
                    }
                })
            }(window, pgatour)
        },
        Y9UD: function(e, t, r) {
            (e.exports = r("I1BE")()).push([e.i, '.clearfix:after,.clearfix:before{display:table;content:"";line-height:0}.headerWrapper,.moduleHeader{border-bottom:1px solid #ccc}@font-face{font-family:NanumGothicBold;src:url(' + r("ILh9") + ");src:url(" + r("ILh9") + "?#iefix) format('embedded-opentype'),url(" + r("6WOd") + ") format('woff2'),url(" + r("inoD") + ") format('woff'),url(" + r("g4f6") + ") format('truetype'),url(" + r("TaUw") + "#NanumGothicBold) format('svg')}@font-face{font-family:NanumGothicRegular;src:url(" + r("7go+") + ");src:url(" + r("7go+") + "?#iefix) format('embedded-opentype'),url(" + r("7kdD") + ") format('woff2'),url(" + r("OISa") + ") format('woff'),url(" + r("a9T5") + ") format('truetype'),url(" + r("Tit0") + "#NanumGothicRegular) format('svg')}.clearfix:after{clear:both}.headerWrapper{padding:14px 0 18px 20px}.box-sizing{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.moduleBottom{padding:3px 0 0;height:45px}.moduleBottom .module-bottom-social{float:left;padding-left:15px}.moduleBottom .module-bottom-more{float:right;text-align:right;margin-top:4px}.moduleBottom .module-bottom-more a{color:#000;text-transform:uppercase;font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:18px;line-height:28px;padding-right:15px}.locale-ko .moduleBottom .module-bottom-more a{font-family:'NanumGothicRegular ',sans-serif}.moduleBottom .module-bottom-more a:before{content:'\\203A';font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:26px;line-height:28px;margin-right:3px}.locale-ko .moduleBottom .module-bottom-more a:before{font-family:'NanumGothicBold ',sans-serif}.moduleBottom .module-bottom-more a strong{font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .moduleBottom .module-bottom-more a strong{font-family:'NanumGothicBold ',sans-serif}.moduleHeader{padding:16px 15px;height:50px;position:relative}.moduleHeader.with-sponsor .header-info{margin-right:170px}.moduleHeader .title{font-size:28px;line-height:28px;font-family:'Roboto Condensed',sans-serif;font-weight:400;margin-bottom:2px}.locale-ko .moduleHeader .title{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .title .live{margin-left:3px;color:#FFF;background:#FB0000;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:16px;line-height:18px;padding:2px 5px;text-transform:uppercase;vertical-align:middle}.locale-ko .moduleHeader .title .live{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .subtitle{font-size:18px;line-height:20px;font-family:'Roboto Condensed',sans-serif;font-weight:400}.locale-ko .moduleHeader .subtitle{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .sponsor{position:absolute;right:15px;bottom:15px}.moduleHeader .control{position:absolute;right:15px;top:15px;display:none;width:70px}.moduleHeader .control .btn{border:2px solid #00284B;border-radius:5px;display:block;cursor:pointer;color:#00284B;font-size:16px;line-height:26px;font-family:'Roboto Condensed',sans-serif;font-weight:700;text-align:center;text-transform:uppercase}.locale-ko .moduleHeader .control .btn{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .control .btn.full{width:100%}.moduleHeader .control .btn.half{width:40%;float:right}.moduleHeader .control .btn.half:first-child{float:left}@media (min-width:768px) and (max-width:979px){.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .control{display:block}}@media (max-width:767px){.moduleBottom{height:auto}.moduleBottom .module-bottom-social{float:none;text-align:center;padding:10px}.moduleBottom .module-bottom-more{float:none;padding:10px}.moduleHeader{padding:16px 10px}.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .title{font-size:24px}.moduleHeader .title .live{font-size:12px;line-height:14px}.moduleHeader .control{display:block}}.scroller{width:auto;clear:both}.scroller .viewport{height:200px;overflow:hidden;position:relative}.scroller .overview{list-style:none;position:absolute;left:0;top:0}.scroller .thumb,.scroller .thumb .end{background-color:#003D5D;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.scroller .scrollbar{position:relative;float:right;width:8px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.scroller .track{background-color:#D8EEFD;height:100%;width:8px;position:relative;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.scroller .thumb{height:20px;width:8px;cursor:pointer;overflow:hidden;position:absolute;top:0}.scroller .thumb .end{overflow:hidden;height:5px;width:8px}.scroller .disable{display:none}.noSelect{user-select:none;-o-user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none}", ""])
        },
        YZG3: function(e, t, r) {
            (e.exports = r("I1BE")()).push([e.i, '.clearfix:after,.clearfix:before{display:table;content:"";line-height:0}.headerWrapper,.moduleHeader{border-bottom:1px solid #ccc}@font-face{font-family:NanumGothicBold;src:url(' + r("ILh9") + ");src:url(" + r("ILh9") + "?#iefix) format('embedded-opentype'),url(" + r("6WOd") + ") format('woff2'),url(" + r("inoD") + ") format('woff'),url(" + r("g4f6") + ") format('truetype'),url(" + r("TaUw") + "#NanumGothicBold) format('svg')}@font-face{font-family:NanumGothicRegular;src:url(" + r("7go+") + ");src:url(" + r("7go+") + "?#iefix) format('embedded-opentype'),url(" + r("7kdD") + ") format('woff2'),url(" + r("OISa") + ") format('woff'),url(" + r("a9T5") + ") format('truetype'),url(" + r("Tit0") + "#NanumGothicRegular) format('svg')}.clearfix:after{clear:both}.headerWrapper{padding:14px 0 18px 20px}.box-sizing{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.moduleBottom{padding:3px 0 0;height:45px}.moduleBottom .module-bottom-social{float:left;padding-left:15px}.moduleBottom .module-bottom-more{float:right;text-align:right;margin-top:4px}.moduleBottom .module-bottom-more a{color:#000;text-transform:uppercase;font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:18px;line-height:28px;padding-right:15px}.locale-ko .moduleBottom .module-bottom-more a{font-family:'NanumGothicRegular ',sans-serif}.moduleBottom .module-bottom-more a:before{content:'\\203A';font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:26px;line-height:28px;margin-right:3px}.locale-ko .moduleBottom .module-bottom-more a:before{font-family:'NanumGothicBold ',sans-serif}.moduleBottom .module-bottom-more a strong{font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .moduleBottom .module-bottom-more a strong{font-family:'NanumGothicBold ',sans-serif}.moduleHeader{padding:16px 15px;height:50px;position:relative}.moduleHeader.with-sponsor .header-info{margin-right:170px}.moduleHeader .title{font-size:28px;line-height:28px;font-family:'Roboto Condensed',sans-serif;font-weight:400;margin-bottom:2px}.locale-ko .moduleHeader .title{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .title .live{margin-left:3px;color:#FFF;background:#FB0000;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:16px;line-height:18px;padding:2px 5px;text-transform:uppercase;vertical-align:middle}.locale-ko .moduleHeader .title .live{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .subtitle{font-size:18px;line-height:20px;font-family:'Roboto Condensed',sans-serif;font-weight:400}.locale-ko .moduleHeader .subtitle{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .sponsor{position:absolute;right:15px;bottom:15px}.moduleHeader .control{position:absolute;right:15px;top:15px;display:none;width:70px}.moduleHeader .control .btn{border:2px solid #00284B;border-radius:5px;display:block;cursor:pointer;color:#00284B;font-size:16px;line-height:26px;font-family:'Roboto Condensed',sans-serif;font-weight:700;text-align:center;text-transform:uppercase}.locale-ko .moduleHeader .control .btn{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .control .btn.full{width:100%}.moduleHeader .control .btn.half{width:40%;float:right}.moduleHeader .control .btn.half:first-child{float:left}@media (min-width:768px) and (max-width:979px){.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .control{display:block}}@media (max-width:767px){.moduleBottom{height:auto}.moduleBottom .module-bottom-social{float:none;text-align:center;padding:10px}.moduleBottom .module-bottom-more{float:none;padding:10px}.moduleHeader{padding:16px 10px}.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .title{font-size:24px}.moduleHeader .title .live{font-size:12px;line-height:14px}.moduleHeader .control{display:block}}.shot-tracker{position:relative;width:100%;height:100%}.shot-tracker .canvas{position:absolute}.shot-tracker .marker-tool-tip{position:absolute;white-space:normal;color:#333;border:1px solid #000;background-color:#FFF;padding:0 2px;max-width:200px;z-index:120}", ""])
        },
        ZGkk: function(e, t, r) {
            var o = r("qDS3");
            "string" == typeof o && (o = [
                [e.i, o, ""]
            ]);
            var a = {
                hmr: !0,
                transform: void 0,
                insertInto: void 0
            };
            r("aET+")(o, a);
            o.locals && (e.exports = o.locals)
        },
        ZaZC: function(e, t) {
            ! function(e, t, r) {
                r.shottracker.AbstractRenderer = r.shottracker.AbstractRenderer || r.Base.extend({
                    shotFlag: null,
                    shotMarkers: [],
                    shotPoints: [],
                    shotPaths: [],
                    canvasRatio: 1,
                    imageData: null,
                    plotterOptions: null,
                    course: null,
                    totalImagesCount: 0,
                    loadedImagesCount: 0,
                    queueLoadingImages: !1,
                    paper: null,
                    canvas: null,
                    constructor: function(e, t, r) {
                        this.container = e, this.paper = t, this.canvas = r
                    },
                    checkMarkersBounds: function() {},
                    fixPaperViewBox: function() {
                        var e = this.paper.getViewBox();
                        this.paper.setViewBox(e.x, e.y, e.width, e.height)
                    },
                    getFieldSize: function() {
                        var e = this.options;
                        return {
                            width: this.course && this.course.width || e.fieldWidth,
                            height: this.course && this.course.height || e.fieldHeight
                        }
                    },
                    getPlayerHoles: function(e) {
                        return e.playerHoles ? "group" === e.playerMode ? e.playerHoles : [e.playerHoles[0]] : []
                    },
                    layoutCanvas: function(e, t) {
                        t && (this.course = t);
                        for (var r = this.canvas, o = this.container.width(), a = 0, n = this.container; 0 === a;) a = n.height(), n = n.parent();
                        !o && a && (o = 4.8 * a);
                        var i = e || 0,
                            d = this.getFieldSize(),
                            s = d.width,
                            l = d.height,
                            c = i / (Math.min(o / s, a / l) || 1),
                            h = this.canvasRatio = Math.min(o / s, a / (l + c)) || 1;
                        if (!this.options.disableCanvasPositioning) {
                            var p = Math.floor(s * h),
                                u = Math.floor((l + c) * h);
                            r.css({
                                left: (o - p) / 2,
                                top: (a - u) / 2,
                                width: p,
                                height: u
                            })
                        }
                        this.paper.setViewBox(0, -i / this.canvasRatio, s, l)
                    },
                    layoutShotFlag: function() {
                        if (this.shotFlag) {
                            var e = this.shotFlag,
                                t = this.options,
                                r = e.image,
                                o = e.point,
                                a = (this.options.manualMarkerRatio || this.canvasRatio) / t.markerRatio,
                                n = e.imageWidth / a,
                                i = e.imageHeight / a;
                            r.attr({
                                x: o.x - n / 2,
                                y: o.y - i + 2 / a,
                                width: n,
                                height: i
                            })
                        }
                    },
                    layoutShotMarker: function(e) {
                        var t = this.options,
                            r = e.image,
                            o = e.label,
                            a = e.point,
                            n = (this.options.manualMarkerRatio || this.canvasRatio) / t.markerRatio || 1,
                            i = e.imageWidth / n,
                            d = e.imageHeight / n,
                            s = t.markerFontSize / n;
                        r.attr({
                            x: a.x - i / 2,
                            y: a.y - d + 5 / n,
                            width: i,
                            height: d
                        }), o.attr({
                            "font-size": s
                        }), o.attr({
                            x: a.x,
                            y: a.y - d + o.getBBox().height + 6 / n
                        })
                    },
                    layoutShots: function() {
                        this.shotPoints.forEach(function(e) {
                            e.attr({
                                r: this.options.plotRadius / (this.options.manualMarkerRatio || this.canvasRatio)
                            })
                        }, this), t.each(this.shotMarkers, this.proxy(function(e, t) {
                            this.layoutShotMarker(t)
                        })), this.layoutShotFlag()
                    },
                    layoutToolTip: function() {},
                    resize: function() {
                        this.layoutCanvas(), this.layoutShots(), this.checkMarkersBounds(), this.fixPaperViewBox(), this.layoutToolTip()
                    },
                    onLoadFlagComplete: function(e) {
                        var t = r.shottracker.Plotter.plot(this.round.cup, this.plotterOptions),
                            o = this.options.markerImageUrl + "hole-flag.png",
                            a = this.paper.image(o);
                        e && (a.attr({
                            src: e.url,
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0
                        }), this.shotFlag = {
                            image: a,
                            imageWidth: e.width,
                            imageHeight: e.height,
                            point: t
                        }, this.layoutShotFlag(), this.fixPaperViewBox())
                    }
                })
            }(window, jQuery, pgatour)
        },
        c7mE: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.Playoff = o.Playoff || r.BaseModule.extend({
                    PLAYOFF_TEMPLATE: "#lbnPlayoffTemplate",
                    PLAYOFF_CONTAINER: "#lbnPlayoffContainer",
                    ARROWS: ".arrows a",
                    NEXT_ARROW: ".arrows a.next-td",
                    PREV_ARROW: ".arrows a.prev-td",
                    HOLES: "td.hole",
                    SMALL_HIDDEN_CLASS: "hidden-small",
                    MEDIUM_HIDDEN_CLASS: "hidden-medium",
                    smallScreenRotationIndex: 0,
                    context: null,
                    playoffContainer: null,
                    playoffTemplate: null,
                    holeContainers: null,
                    arrows: null,
                    constructor: function(e) {
                        this.context = e, this.playoffContainer = this.context.config.getOrCreate(this.PLAYOFF_CONTAINER), this.base(this.playoffContainer), this.playoffTemplate = this.context.config.getOrCreate(this.PLAYOFF_TEMPLATE)
                    },
                    processData: function(e) {
                        if (e && e.trn && e.trn.playoff) {
                            var t = e.trn.playoff.plrs.map(this.proxy(this.buildPlayer, this.context.leaderboardModel.players, e));
                            this.render(t)
                        }
                    },
                    buildPlayer: function(e, t, r) {
                        var o = {
                            holes: [],
                            status: r.status,
                            id: r.id,
                            current_round: e[r.id] && e[r.id].current_round,
                            sponsors: e[r.id] && e[r.id].sponsors
                        };
                        e[r.id] && e[r.id].player_bio && (o.firstName = e[r.id].player_bio.first_name, o.lastName = e[r.id].player_bio.last_name, o.displayName = e[r.id].player_bio.display_name, o.course = e[r.id].course), this.populateHoles(o, t);
                        for (var a = o.holes.length; a < 18; a++) o.holes.push({});
                        return o
                    },
                    populateHoles: function(e, t) {
                        for (var r = 0; r < t.trn.playoff.holes.length; r++)
                            for (var o = 0; o < t.trn.playoff.holes[r].plrs.length; o++)
                                if (t.trn.playoff.holes[r].plrs[o].id === e.id && e.course && e.holes) {
                                    var a = e.course.holes[t.trn.playoff.holes[r].cNum - 1];
                                    e.holes.push({
                                        score: t.trn.playoff.holes[r].plrs[o].holeScore,
                                        n: t.trn.playoff.holes[r].n,
                                        cNum: t.trn.playoff.holes[r].cNum,
                                        par: this.getPar(e, a)
                                    });
                                    break
                                }
                    },
                    getPar: function(e, t) {
                        for (var r = 0, o = 0; o < t.round.length; o++)
                            if (t.round[o].round_num === e.current_round.toString()) {
                                r = t.round[o].par;
                                break
                            }
                        return r
                    },
                    isPlayoff: function(e) {
                        var t = e && e.trn && e.trn.playoffInfo;
                        return t && t.isPlayoff && "y" === t.isPlayoff.toLowerCase()
                    },
                    render: function(e) {
                        var t = null;
                        e && e.length > 0 && (t = e[0].status && "winner" === e[0].status ? e[0] : this.getPlayerWithMostHoles(e)), this.playoffContainer.empty(), t && this.playoffContainer.html(this.playoffTemplate.tmpl({
                            players: e,
                            holes: t.holes,
                            utils: this.context.utils,
                            playerSponsor: this.context.config.playerSponsor,
                            sponsorName: this.context.config.sponsorName
                        })), this.holeContainers = this.playoffContainer.find(this.HOLES), this.arrows = this.playoffContainer.find(this.ARROWS), r.colorizeTable(this.playoffContainer.find("table tbody")), this.initControls()
                    },
                    getPlayerWithMostHoles: function(e) {
                        for (var t, r = 0, o = e[0], a = 0; a < e.length; a++) {
                            var n = 0;
                            (t = e[a]).holes && t.holes.length && (n = this.getPlayerHolesCount(t.holes)) >= r && (r = n, o = e[a])
                        }
                        return o
                    },
                    getPlayerHolesCount: function(e) {
                        for (var t = 0, r = 0; r < e.length; r++)
                            if (!e[r].cNum) {
                                t = r;
                                break
                            }
                        return t
                    },
                    initControls: function() {
                        var e = this;
                        this.arrows.click(function() {
                            e.arrowClickMedium(), e.arrowClickSmall()
                        })
                    },
                    arrowClickMedium: function() {
                        this.isMediumScreen() && this.holeContainers.toggleClass(this.MEDIUM_HIDDEN_CLASS)
                    },
                    arrowClickSmall: function() {
                        if (this.isSmallScreen()) {
                            this.smallScreenRotationIndex += 3, this.smallScreenRotationIndex > 17 && (this.smallScreenRotationIndex = 0), this.holeContainers.addClass(this.SMALL_HIDDEN_CLASS);
                            for (var e = 0; e < 3; e++) {
                                var t = "[data-hole-index=" + (this.smallScreenRotationIndex + e + 1) + "]";
                                this.holeContainers.filter(t).removeClass(this.SMALL_HIDDEN_CLASS)
                            }
                        }
                    }
                })
            }(jQuery, window, pgatour)
        },
        d4Xb: function(e, t, r) {
            (e.exports = r("I1BE")()).push([e.i, '.clearfix:after,.clearfix:before{display:table;content:"";line-height:0}.headerWrapper,.moduleHeader{border-bottom:1px solid #ccc}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .thumb.play-mode .thumb-img,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .thumb.play-mode .thumb-img,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .thumb.play-mode .thumb-img{visibility:hidden}@font-face{font-family:NanumGothicBold;src:url(' + r("ILh9") + ");src:url(" + r("ILh9") + "?#iefix) format('embedded-opentype'),url(" + r("6WOd") + ") format('woff2'),url(" + r("inoD") + ") format('woff'),url(" + r("g4f6") + ") format('truetype'),url(" + r("TaUw") + "#NanumGothicBold) format('svg')}@font-face{font-family:NanumGothicRegular;src:url(" + r("7go+") + ");src:url(" + r("7go+") + "?#iefix) format('embedded-opentype'),url(" + r("7kdD") + ") format('woff2'),url(" + r("OISa") + ") format('woff'),url(" + r("a9T5") + ") format('truetype'),url(" + r("Tit0") + "#NanumGothicRegular) format('svg')}.clearfix:after{clear:both}.headerWrapper{padding:14px 0 18px 20px}.box-sizing{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.moduleBottom{padding:3px 0 0;height:45px}.moduleBottom .module-bottom-social{float:left;padding-left:15px}.moduleBottom .module-bottom-more{float:right;text-align:right;margin-top:4px}.moduleBottom .module-bottom-more a{color:#000;text-transform:uppercase;font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:18px;line-height:28px;padding-right:15px}.locale-ko .moduleBottom .module-bottom-more a{font-family:'NanumGothicRegular ',sans-serif}.moduleBottom .module-bottom-more a:before{content:'\\203A';font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:26px;line-height:28px;margin-right:3px}.locale-ko .moduleBottom .module-bottom-more a:before{font-family:'NanumGothicBold ',sans-serif}.moduleBottom .module-bottom-more a strong{font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .moduleBottom .module-bottom-more a strong{font-family:'NanumGothicBold ',sans-serif}.moduleHeader{padding:16px 15px;height:50px;position:relative}.moduleHeader.with-sponsor .header-info{margin-right:170px}.moduleHeader .title{font-size:28px;line-height:28px;font-family:'Roboto Condensed',sans-serif;font-weight:400;margin-bottom:2px}.locale-ko .moduleHeader .title{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .title .live{margin-left:3px;color:#FFF;background:#FB0000;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:16px;line-height:18px;padding:2px 5px;text-transform:uppercase;vertical-align:middle}.locale-ko .moduleHeader .title .live{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .subtitle{font-size:18px;line-height:20px;font-family:'Roboto Condensed',sans-serif;font-weight:400}.locale-ko .moduleHeader .subtitle{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .sponsor{position:absolute;right:15px;bottom:15px}.moduleHeader .control{position:absolute;right:15px;top:15px;display:none;width:70px}.moduleHeader .control .btn{border:2px solid #00284B;border-radius:5px;display:block;cursor:pointer;color:#00284B;font-size:16px;line-height:26px;font-family:'Roboto Condensed',sans-serif;font-weight:700;text-align:center;text-transform:uppercase}.locale-ko .moduleHeader .control .btn{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .control .btn.full{width:100%}.moduleHeader .control .btn.half{width:40%;float:right}.moduleHeader .control .btn.half:first-child{float:left}@media (min-width:768px) and (max-width:979px){.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .control{display:block}}@media (max-width:767px){.moduleBottom{height:auto}.moduleBottom .module-bottom-social{float:none;text-align:center;padding:10px}.moduleBottom .module-bottom-more{float:none;padding:10px}.moduleHeader{padding:16px 10px}.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .title{font-size:24px}.moduleHeader .title .live{font-size:12px;line-height:14px}.moduleHeader .control{display:block}}.tournament-leaderboard-new-2.tournament-leaderboard-yahoo{padding-top:65px}.tournament-leaderboard-new-2.tournament-leaderboard-yahoo .leaderboard-header .leaderboard-header-content-part{left:30px}.tournament-leaderboard-new-2 .ad-pro-am{background-color:#DDD;padding:25px 0}.tournament-leaderboard-new-2 .no-data-message{padding:20px 20px 30px;border-bottom:1px solid #E6E6E6}.tournament-leaderboard-new-2 .table{table-layout:fixed}.tournament-leaderboard-new-2 .cell-fix{position:relative}.tournament-leaderboard-new-2 .cell-fix .cell-fix-inner{position:absolute;top:0;right:0;left:0}.tournament-leaderboard-new-2 .sponsor-advertisement{display:inline-block;margin-bottom:7px;text-align:center}.tournament-leaderboard-new-2 .sponsor-advertisement-300{display:block}.tournament-leaderboard-new-2 .details-player .cell-fix,.tournament-leaderboard-new-2 .first-tab .cell-fix,.tournament-leaderboard-new-2 .second-tab .cell-fix{height:420px}.tournament-leaderboard-new-2 .second-tab{vertical-align:middle!important}.tournament-leaderboard-new-2 .second-tab .row-details-close{display:block;width:29px;height:29px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -1470px no-repeat;position:absolute;text-transform:uppercase}.tournament-leaderboard-new-2 .leaderboard-favorite-content .second-tab .row-details-close{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -89px no-repeat}.tournament-leaderboard-new-2 .leaderboard-header{background:#FFF;padding:0;position:relative}.tournament-leaderboard-new-2 .leaderboard-header .lbnLeaderboardRolexBlock{position:relative;min-height:70px}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-header-content-part{position:absolute;top:-56px;left:335px}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-header-content-part .scoring{min-width:inherit;display:inline-block}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-header-content-part .scoring span{font-size:14px;color:#999}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-header-content-part .scoring .top-ad{display:none}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-header-content-part .message{display:inline-block;font-size:14px}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-amateur{background:#FFF;position:relative}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-amateur .title{margin:30px;padding:0;display:inline-block}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-amateur .btn-amateur{float:right;margin:30px;font-size:15px;line-height:32px;height:32px;padding:0 30px}.tournament-leaderboard-new-2 .leaderboard-header .header-ad-tee-off{clear:both;width:420px;height:auto}.tournament-leaderboard-new-2 .leaderboard-header .alert{display:none;background:#D40000;position:relative;min-height:20px;padding:14px;font-family:'Roboto Condensed',sans-serif;font-weight:700;text-align:left;margin:12px 12px 10px}.locale-ko .tournament-leaderboard-new-2 .leaderboard-header .alert{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-header .alert>a{cursor:default}.tournament-leaderboard-new-2 .leaderboard-header .alert .message{color:#FFF;font-size:15px;line-height:17px;width:100%}.tournament-leaderboard-new-2 .leaderboard-header .alert .weather-sponsor-logo{position:absolute;top:8px;right:8px;height:30px;display:none}.tournament-leaderboard-new-2 .leaderboard-header .alert.show-sponsor-logo>a{cursor:pointer}.tournament-leaderboard-new-2 .leaderboard-header .alert.show-sponsor-logo .message>div{padding:0 105px 0 0}.tournament-leaderboard-new-2 .leaderboard-header .alert.show-sponsor-logo .weather-sponsor-logo{display:block}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-watch{float:right;width:490px}.tournament-leaderboard-new-2 .leaderboard-header .tabs .tab{float:left;margin:4px 6px 4px 4px;padding:0 7px;background:#515151;color:#E4E4E4;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:13px;line-height:25px;text-align:center;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.tournament-leaderboard-new-2 .leaderboard-header .tabs .tab.tab-active,.tournament-leaderboard-new-2 .leaderboard-header .tabs .tab:hover{background:#CCC;color:#515151!important}.locale-ko .tournament-leaderboard-new-2 .leaderboard-header .tabs .tab{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-header .tabs .tab[data-tab-type=stracka]{display:none}.tournament-leaderboard-new-2 .leaderboard-header .scoring{margin-top:14px;padding-left:20px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/img/icon-watch.png\") left center no-repeat;min-width:370px}.tournament-leaderboard-new-2 .leaderboard-header .scoring span{font-size:13px;line-height:15px;display:inline-block;margin-right:5px}.tournament-leaderboard-new-2 .leaderboard-header .scoring .scoring-ad{display:inline-block}.tournament-leaderboard-new-2 .leaderboard-header .link-button{display:inline-block;text-transform:uppercase;position:absolute;right:0;bottom:10px;font-size:16px;padding:8px 28px;text-align:center}.tournament-leaderboard-new-2 .leaderboard-header h2{margin:0;padding:20px 0 6px}.tournament-leaderboard-new-2.no-rolex .leaderboard-header{padding:10px 15px}.tournament-leaderboard-new-2.no-rolex .leaderboard-header .scoring{margin:0;float:none;min-width:0;display:inline-block}.tournament-leaderboard-new-2.no-rolex .leaderboard-header .message{position:static;margin:0;display:inline-block}.tournament-leaderboard-new-2 .leaderboard-playoff-table .header{background:#00284B;position:relative}.tournament-leaderboard-new-2 .leaderboard-playoff-table .header h3{text-transform:uppercase;margin:0;color:#FFF;padding:20px 0 20px 10px;width:60%;float:left}.tournament-leaderboard-new-2 .leaderboard-playoff-table table tr.odd.highlight{background:#C8E4FC}.tournament-leaderboard-new-2 .leaderboard-playoff-table table tr.even.highlight{background:#DAEDFE}.tournament-leaderboard-new-2 .leaderboard-playoff-table table tr td.player-hole{text-align:left;padding-left:10px;color:#2D333A;font-family:'Roboto Condensed',sans-serif;font-weight:700;width:30%;min-width:300px}.locale-ko .tournament-leaderboard-new-2 .leaderboard-playoff-table table tr td.player-hole{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-playoff-table table tr td.player-hole span.hole,.tournament-leaderboard-new-2 .leaderboard-playoff-table table tr td.player-hole span.winner{float:right;text-transform:uppercase;color:#FFF;font-size:10px;margin-right:12px;padding:0 5px}.tournament-leaderboard-new-2 .leaderboard-playoff-table table tr td.player-hole span.winner{background:#EB0302}.tournament-leaderboard-new-2 .leaderboard-playoff-table table tr td.player-hole span.hole{background:#CFCFCF}.tournament-leaderboard-new-2 .leaderboard-playoff-table table tr td.player-hole .sponsor-logo{max-width:45px;margin-left:5px}.tournament-leaderboard-new-2 .leaderboard-playoff-table table tr td.hole{width:3.8%}.tournament-leaderboard-new-2 .leaderboard-container{background:#FFF;position:relative}.tournament-leaderboard-new-2 .leaderboard-container .cut-line{text-align:center;font-family:'Roboto Condensed',sans-serif;font-weight:700;padding:10px;background-color:silver;color:#232323}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .cut-line{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .col-earn-card.col-wildcard{padding:1px 0 0}.tournament-leaderboard-new-2 .leaderboard-container .col-earn-card .earn-card-container{padding:0 0 0 46px;margin:0 11px;min-height:30px;line-height:16px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/earn-card.png\") left no-repeat;text-align:left}.tournament-leaderboard-new-2 .leaderboard-container .col-earn-card .wildcard-logo{height:55px;line-height:16px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/wildcard.png\") left no-repeat;background-size:100% auto}.tournament-leaderboard-new-2 .leaderboard-container table{width:100%;border-collapse:collapse;border-spacing:0;text-align:center;font-size:14px;line-height:20px;table-layout:fixed}.tournament-leaderboard-new-2 .leaderboard-container table td{padding:13px 0}.tournament-leaderboard-new-2 .leaderboard-container table .col-pin{width:27px}.tournament-leaderboard-new-2 .leaderboard-container table .col-pos{width:34px}.tournament-leaderboard-new-2 .leaderboard-container table .col-move{width:33px}.tournament-leaderboard-new-2 .leaderboard-container table .col-country{width:64px}.tournament-leaderboard-new-2 .leaderboard-container table .col-country .flag{display:inline-block}.tournament-leaderboard-new-2 .leaderboard-container table .col-player{min-width:283px;width:100%;text-align:left}.tournament-leaderboard-new-2 .leaderboard-container table .col-player .sponsor-logo{margin-left:0}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div{padding:0 3%}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .flag{float:left;margin-right:5px}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .name{font-family:'Roboto Condensed',sans-serif;font-weight:700;float:left;line-height:20px;margin-right:15px}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container table .col-player div .name{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .article,.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .photo,.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .video{float:right;display:block;width:22px;height:22px;margin-left:3px;cursor:pointer;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") no-repeat}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .video{background-position:-5px -304px}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .photo{background-position:-5px -277px}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .article{background-position:-5px -250px}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .live-at-video{float:right;display:block;width:22px;height:22px;margin-left:3px;margin-top:0;cursor:pointer;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") 0 -1594px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .ocqs-logo,.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .sponsor-logo{position:relative;top:-1px;margin-right:5px}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .sponsor-logo{max-width:45px}.tournament-leaderboard-new-2 .leaderboard-container table .col-total{width:44px}.tournament-leaderboard-new-2 .leaderboard-container table .col-thru{width:43px}.tournament-leaderboard-new-2 .leaderboard-container table .col-round{width:49px}.tournament-leaderboard-new-2 .leaderboard-container table .col-thru-round{width:93px}.tournament-leaderboard-new-2 .leaderboard-container table .col-earn-card{width:140px}.tournament-leaderboard-new-2 .leaderboard-container table .col-r{width:27px}.tournament-leaderboard-new-2 .leaderboard-container table .col-strokes{width:59px}.tournament-leaderboard-new-2 .leaderboard-container table .col-header-3{width:142px;border-bottom:1px solid #405E78}.tournament-leaderboard-new-2 .leaderboard-container table .col-color{width:35px}.tournament-leaderboard-new-2 .leaderboard-container table .col-fed-move,.tournament-leaderboard-new-2 .leaderboard-container table .col-project,.tournament-leaderboard-new-2 .leaderboard-container table .col-starting{width:46px}.tournament-leaderboard-new-2 .leaderboard-container table .icon-pos-up{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/img/sprite.png\") -213px -232px no-repeat;padding-left:10px}.tournament-leaderboard-new-2 .leaderboard-container table .icon-pos-down{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/img/sprite.png\") -213px -252px no-repeat;padding-left:10px}.tournament-leaderboard-new-2 .leaderboard-container table .finals-ranking-gold{color:#E1A10C}.tournament-leaderboard-new-2 .leaderboard-container table .finals-ranking-green{color:#266C2D}.tournament-leaderboard-new-2 .leaderboard-container table .finals-ranking-red{color:#7F312F}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head{color:#E4E4E4;font-family:'Roboto Condensed',sans-serif;font-weight:700;background:#00284B}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td{border-right:1px solid #405E78;font-size:14px;line-height:17px;padding:0}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td .icon-pin{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -532px no-repeat;width:17px;height:17px;display:block;margin:auto}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td .icon-moves{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/img/sprite.png\") -213px -211px no-repeat;width:18px;height:17px;display:block;margin:auto}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td .icon-color{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -598px no-repeat;width:15px;height:19px;display:block;margin:auto}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td.col-x3{border-bottom:1px solid #405E78;padding:4px 0}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td.col-fed-move a,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td.col-project a,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td.col-starting a{font-size:70%;display:block;padding:4px 0}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td.sort-desc{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") center -861px no-repeat #001528}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td.sort-asc{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") center -817px no-repeat #001528}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td.col-fed-move.sort-asc,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td.col-fed-move.sort-desc,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td.col-project.sort-asc,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td.col-project.sort-desc,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td.col-starting.sort-asc,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td.col-starting.sort-desc{background-image:none}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td a{color:#E4E4E4;text-decoration:none;cursor:pointer;padding:17px 0;display:block}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td a:hover{color:#E4E4E4;text-decoration:none}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td a.visible-large{display:block!important}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head .col-player>div{padding:0}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head .col-player .name{line-height:22px;padding:14px 0 14px 3%;cursor:pointer}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head .col-player .name .sort-trigger{padding:0}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head .col-player .play-by-play{float:right;line-height:22px;padding:14px 5px 14px 0}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head .col-player .play-by-play .switcher{float:right;cursor:pointer;display:block;height:22px;width:36px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") no-repeat;margin:0 15px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head .col-player .play-by-play .switcher:before{display:none}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head .col-player .play-by-play .off .switcher{background-position:-5px 0}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head .col-player .play-by-play .on .switcher{background-position:-5px -27px}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker{position:relative;display:block;width:20px;height:19px;cursor:pointer;margin:auto;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -331px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup{display:none;background:#393939;position:absolute;padding:5px;top:-5px;right:-5px;z-index:500;cursor:default}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup ul{height:19px;margin:0;width:200px}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup ul li{display:block;float:right;margin-left:4px}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup p{color:#FFFCC9;padding:0;margin:0;font-size:11px;line-height:9px;text-align:left}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup b.color-pen{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -598px no-repeat;width:15px;height:19px;display:block}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span{display:block;float:right;width:20px;height:19px;cursor:pointer}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span:hover{border:1px solid #828282;width:18px;height:17px}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span.clean{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -331px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span.clean:hover{border:none;width:20px;height:19px}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span.highlight-0,.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span.white{background:#FFF}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span.green,.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span.highlight-1{background:#C1ECA2}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span.highlight-2,.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span.purple{background:#C3DBF9}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span.highlight-3,.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span.orange{background:#FFD89A}.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span.blue,.tournament-leaderboard-new-2 .leaderboard-container .colorpicker .colorpicker-popup span.highlight-4{background:#B3E8FF}.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-content{display:none}.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-content td{padding:4px 0}.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-content .col-play{font-weight:400;text-align:left;padding:5px 1.4%}.tournament-leaderboard-new-2 .leaderboard-container .favorite{position:relative;display:block;width:17px;height:17px;cursor:pointer;margin:auto;z-index:1}.tournament-leaderboard-new-2 .leaderboard-container .favorite.add-to-favorite{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -487px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .favorite.remove-from-favorite{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -576px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .favorite .favorite-tooltip{display:none;position:absolute;height:34px;line-height:17px;padding:3px;font-size:14px;font-weight:400;text-align:center;border-radius:5px;left:25px;top:-13px}.tournament-leaderboard-new-2 .leaderboard-container .favorite .favorite-tooltip:after{content:\"\";position:absolute;width:0;height:0;border:10px solid;top:11px;left:-20px}.tournament-leaderboard-new-2 .leaderboard-container .favorite:hover .favorite-tooltip{display:block}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .table{border-bottom:1px solid #4F4F4F}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .table .col-play{border-top:1px solid #4F4F4F}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head{padding:0 0 6px;background:#E6E6E6;position:relative;min-height:45px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head p{margin:0;padding:8px;color:#030303;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:20px;line-height:30px}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head p{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live{float:left;margin-right:6px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live .btn-live{display:inline-block;height:25px;background:#CCC;padding:7px 21px 0 14px;margin-left:4px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live .btn-live a{text-transform:uppercase;color:#FFF;font-size:15px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live .btn-live .icon{display:inline-block;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .colorpicker,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .colorpicker,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider{display:none}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live .btn-live.watch .icon{width:15px;height:10px;background-position:-5px -1367px;margin-right:12px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live .btn-live.listen{position:relative;padding-left:41px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live .btn-live.listen .icon{width:19px;height:19px;background-position:-5px -1397px;position:absolute;top:6px;left:13px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-player-select{position:absolute;top:11px;right:10px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-player-select span.customSelect{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") right -978px no-repeat #FFF;color:#4A4A4A;text-transform:none;padding-left:12px;border:1px solid #C5C5C5}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .finals-ranking-gold,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .finals-ranking-green,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .finals-ranking-red,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content a,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content a:hover{color:#E4E4E4}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .leaderboard-item:nth-child(odd),.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .leaderboard-item:nth-child(odd) .row-main>td{background:#323232!important}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .leaderboard-item:nth-child(even),.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .leaderboard-item:nth-child(even) .row-main>td{background:#424141!important}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content td{border-right:1px solid #474747}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .favorite-tooltip{width:120px;color:#00182E;background:#FFF;border:2px solid #FFF}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .favorite-tooltip:after{border-color:transparent #FFF transparent transparent}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-ad-space{margin:20px auto}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .table{border-bottom:1px solid #E6E6E6;table-layout:fixed}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .table .col-play{border-top:1px solid #E6E6E6}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-head{padding:8px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-head p{float:left;margin:0;color:#303030;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:20px;line-height:30px}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-head p{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content{color:#333;border-top:1px solid #DDD}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content a,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content a:hover{color:#333}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .full-stats-link{float:left;margin:12px 8px 2px 0;padding:0 7px;background:#515151;color:#E4E4E4;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:13px;line-height:25px;text-align:center;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .full-stats-link{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .full-stats-link:hover{text-decoration:none;background:#5B5B5B}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item:nth-child(odd){background:#F7F7F7}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-container.reverse-odd .leaderboard-item:nth-child(odd),.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item:nth-child(even){background:#FFF}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-container.reverse-odd .leaderboard-item:nth-child(even){background:#F7F7F7}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-container.no-border-bottom .leaderboard-item:last-child>table{border-bottom:none}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-container.border-top .leaderboard-item:first-child>table{border-top:1px solid #E6E6E6}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.highlight-0,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.white{background:inherit}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.green,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.highlight-1{background:#C1ECA2!important}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.green>table.table tr.row-main td,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.highlight-1>table.table tr.row-main td{color:#333;border-color:#C1ECA2}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.green>table.table tr.row-main td a.name,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.highlight-1>table.table tr.row-main td a.name{color:#333}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.highlight-2,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.purple{background:#C3DBF9!important}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.highlight-2>table.table tr.row-main td,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.purple>table.table tr.row-main td{color:#333;border-color:#C3DBF9}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.highlight-2>table.table tr.row-main td a.name,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.purple>table.table tr.row-main td a.name{color:#333}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.highlight-3,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.orange{background:#FFD89A!important}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.highlight-3>table.table tr.row-main td,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.orange>table.table tr.row-main td{color:#333;border-color:#FFD89A}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.highlight-3>table.table tr.row-main td a.name,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.orange>table.table tr.row-main td a.name{color:#333}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.blue,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.highlight-4{background:#B3E8FF!important}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.blue>table.table tr.row-main td,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.highlight-4>table.table tr.row-main td{color:#333;border-color:#B3E8FF}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.blue>table.table tr.row-main td a.name,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .leaderboard-item.highlight-4>table.table tr.row-main td a.name{color:#333}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content td{border-right:1px solid #E6E6E6}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .favorite-tooltip{width:120px;color:#FFFCC9;background:#393939;border:2px solid #393939}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .favorite-tooltip:after{border-color:transparent #393939 transparent transparent}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td{color:#E4E4E4!important;background:#5A5A5A!important}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .favorite.add-to-favorite,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .favorite.add-to-favorite{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -465px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .favorite.remove-from-favorite,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .favorite.remove-from-favorite{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -554px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .finals-ranking-gold,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .finals-ranking-green,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .finals-ranking-red,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .finals-ranking-gold,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .finals-ranking-green,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .finals-ranking-red{color:#E4E4E4}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td td,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed td{border-right:1px solid #6B6B6B!important;border-bottom:1px solid #6B6B6B!important}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td td.col-play,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed td.col-play{border-top:1px solid #6B6B6B!important}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td td.col-player .name,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed td.col-player .name{color:#E4E4E4!important}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main td,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-main td{border-bottom:none!important}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider.has-videos,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider.has-videos{display:table-row}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td{padding:0}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video{height:auto;padding:20px 20px 60px;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAOBAMAAAAcbWtvAAAAKlBMVEUxMTExMTExMTEpKSkeHh4ZGRkVFRUTExMREREODg4MDAwKCgoICAgGBga6JJAZAAAADnRSTlMBBAYLExsjKzI4PUJHQ5pczFwAAAAkSURBVHheY2BgEGBQYDBgcGAIYEhgKGBoYJjAsIBhA8MBhgsAM0wFsSVacEsAAAAASUVORK5CYII=') 0 100% repeat-x #424242;border-bottom:1px solid #4F4F4F}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video .bx-wrapper .bx-loading,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video .bx-wrapper .bx-loading{background:0 0}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul{margin:0;padding:0;list-style:none}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li{position:relative;padding:0}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .elem,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .elem{display:block;position:relative;overflow:hidden;max-width:280px;margin:0 auto}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .elem img,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .elem img{max-width:280px;max-height:157px}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .elem .elem-img,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .elem .elem-img{background:0 0;display:block;position:static}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .elem .elem-img:before,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .elem .elem-img:before{content:\"\";position:absolute;top:0;right:0;bottom:0;left:0;z-index:9;background:-moz-linear-gradient(top,rgba(0,0,0,0) 30%,rgba(0,0,0,.65) 100%);background:-webkit-linear-gradient(top,rgba(0,0,0,0) 30%,rgba(0,0,0,.65) 100%);background:linear-gradient(to bottom,rgba(0,0,0,0) 30%,rgba(0,0,0,.65) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#a6000000', GradientType=0)}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .elem .elem-info,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .elem .elem-info{position:absolute;top:auto;max-height:48px;overflow:hidden;left:10px;right:10px;bottom:16px;padding:0;color:#FFF;display:block;text-decoration:none;text-align:left;font-size:14px;line-height:16px;z-index:10}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .elem .elem-info:hover,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .elem .elem-info:hover{text-decoration:none}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .elem .elem-length,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .elem .elem-length{position:absolute;z-index:10;right:0;bottom:0;background:rgba(0,0,0,.5);color:#FFF;font-size:12px;line-height:14px;padding:3px 5px 1px}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .elem .inline-video-player,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .elem .inline-video-player{top:0;left:0;bottom:0;right:0;display:none}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .elem .elem-info .category,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .elem .elem-info .category{font-family:'Roboto Condensed',sans-serif;font-weight:400;color:#FFF;font-size:12px;line-height:16px;display:block;opacity:.7;text-shadow:0 0 2px rgba(0,0,0,.5)}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .elem .elem-info .category,.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .elem .elem-info .category{font-family:'NanumGothicRegular ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .elem .elem-video,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .elem .elem-video{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/img/sprite.png\") -360px -250px no-repeat;position:absolute;display:block;top:37%;left:50%;width:40px;height:40px;margin-top:-20px;margin-left:-20px}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .thumb.play-mode .elem-length,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .thumb.play-mode .thumb-info,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .thumb.play-mode .elem-length,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .thumb.play-mode .thumb-info{display:none}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video ul li .thumb.play-mode .inline-video-player,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video ul li .thumb.play-mode .inline-video-player{display:block}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video .bx-pager,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video .bx-pager{bottom:-45px}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video .bx-pager a,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video .bx-pager a{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -24px -123px no-repeat;text-indent:-9999px;display:block;width:10px;height:10px;margin:0 3px}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video .bx-pager a.active,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider td .details-video .bx-pager a:hover,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video .bx-pager a.active,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider td .details-video .bx-pager a:hover{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -123px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .row-ad,.tournament-leaderboard-new-2 .leaderboard-container .row-ad.has-videos,.tournament-leaderboard-new-2 .leaderboard-container .row-details,.tournament-leaderboard-new-2 .leaderboard-container .row-details.has-videos,.tournament-leaderboard-new-2 .leaderboard-container .row-video-slider,.tournament-leaderboard-new-2 .leaderboard-container .row-video-slider.has-videos{display:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details{background:#323232}.tournament-leaderboard-new-2 .leaderboard-container .row-details>td{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAOBAMAAAAcbWtvAAAAKlBMVEUGBgYICAgKCgoMDAwODg4RERETExMVFRUZGRkeHh4pKSkxMTExMTExMTG7EsdrAAAADnRSTlNDR0I9ODIrIxsTCwYEAcd0YkgAAAAkSURBVHheY2BgEGBQYDBgcGAIYEhgKGBoYJjAsIBhA8MBhgsAM0wFsSVacEsAAAAASUVORK5CYII=') repeat-x,url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAOBAMAAAAcbWtvAAAAKlBMVEUxMTExMTExMTEpKSkeHh4ZGRkVFRUTExMREREODg4MDAwKCgoICAgGBga6JJAZAAAADnRSTlMBBAYLExsjKzI4PUJHQ5pczFwAAAAkSURBVHheY2BgEGBQYDBgcGAIYEhgKGBoYJjAsIBhA8MBhgsAM0wFsSVacEsAAAAASUVORK5CYII=') 0 100% repeat-x;padding:0;vertical-align:top}.tournament-leaderboard-new-2 .leaderboard-container .row-details td{border-right:1px solid #4F4F4F!important}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-player .padding{padding:15px 8px 0}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-player .player-photo{width:100%;max-width:160px;overflow:hidden;margin:0 auto 7px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-player .player-name{color:#A2A2A2;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:20px;line-height:22px;margin:0 0 7px}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .row-details .details-player .player-name{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-player .player-name.no-ad{margin-bottom:12px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-player .player-sponsor{height:22px;margin-bottom:14px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-player a{display:block;margin-bottom:9px;background:#525252;color:#E4E4E4;font-family:'Roboto Condensed',sans-serif;font-weight:700;line-height:30px;text-transform:uppercase;font-size:13px}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .row-details .details-player a{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-player a.live-at-video{background:#ea0203}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-player a:hover{color:#E4E4E4;text-decoration:none;background:#646464}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-player a:hover.live-at-video{background:#ea0203}.tournament-leaderboard-new-2 .leaderboard-container .row-details .tabs .tab{float:left;margin:0 15px;padding:4px 0;color:#A2A2A2;font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:15px;line-height:52px;text-align:center;position:relative}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .row-details .tabs .tab{font-family:'NanumGothicRegular ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .row-details .tabs .tab:hover{padding:4px 0 0;color:#A2A2A2;border-bottom:4px solid #424242}.tournament-leaderboard-new-2 .leaderboard-container .row-details .tabs .tab.tab-active{padding:4px 0 0;border-bottom:4px solid #696969;color:#FFF;font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .row-details .tabs .tab.tab-active{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .row-details .tabs .tab.new-video:after{content:\"\";width:6px;height:6px;background:#EA0203;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;display:block;position:absolute;right:-7px;top:20px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-head,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th>div,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th>div{position:relative}.tournament-leaderboard-new-2 .leaderboard-container .row-details .tabs .tab[data-tab-type=stracka]{display:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-head .details-head-addition{float:right;height:29px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-head .row-details-share{display:block;float:right;width:29px;height:29px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -138px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-head .row-details-close{display:block;float:right;margin-left:10px;width:29px;height:29px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -89px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard .hidden-hole,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards .hidden-hole,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .bx-pager,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .scorecards-slider .second{display:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .scorecards-slider{margin:0 0 15px;list-style:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-slider li{width:100%;height:135px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards{width:100%;border-collapse:separate;border-spacing:0;text-align:center;font-size:13px;line-height:16px;table-layout:auto}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th{position:relative;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAOBAMAAAAcbWtvAAAAKlBMVEUxMTExMTExMTEpKSkeHh4ZGRkVFRUTExMREREODg4MDAwKCgoICAgGBga6JJAZAAAADnRSTlMBBAYLExsjKzI4PUJHQ5pczFwAAAAkSURBVHheY2BgEGBQYDBgcGAIYEhgKGBoYJjAsIBhA8MBhgsAM0wFsSVacEsAAAAASUVORK5CYII=') 0 100% repeat-x #323232;border-top:1px solid #4F4F4F;border-right:1px solid #4F4F4F;border-bottom:1px solid #4F4F4F;font-weight:400;padding:0}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th.first-col,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th.first-col{padding-left:6px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th>div a,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th>div a:hover,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th>div a,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th>div a:hover{font-weight:400;color:#FFF;padding:11px 0 7px;display:block}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th>div span,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th>div span{display:block;padding:11px 0 7px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th.active,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th.active{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") center -930px no-repeat #0F0F0F}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th.first-col,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th.first-col{text-align:left;font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th.first-col,.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th.first-col{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th.last-col,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th.last-col{border-right:none;padding-right:25px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th .scorecards-next,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th .scorecards-next{padding:0;position:absolute;right:-24px;top:1px;display:block;width:24px;height:32px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -172px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th .scorecards-next:hover,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th .scorecards-next:hover{padding:0}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th .scorecards-prev,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th .scorecards-prev{padding:0;position:absolute;right:-24px;top:1px;display:block;width:24px;height:32px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -211px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th .scorecards-prev:hover,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th .scorecards-prev:hover{padding:0}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr:nth-child(odd) td,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr:nth-child(odd) td{background:#323232}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr:nth-child(even) td,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr:nth-child(even) td{background:#444}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr:nth-child(2) td,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr:nth-child(2) td{vertical-align:top}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td{border-right:1px solid #4F4F4F;border-bottom:1px solid #4F4F4F;position:relative;padding:0}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td>div,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td>div{padding:9px 6px 7px;position:relative;white-space:nowrap}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.active,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.active{background:#1C1C1C}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td .has-video{display:block;margin:3px auto 0;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -27px -480px no-repeat;width:15px;height:10px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.double-eagle,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.result-3,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.double-eagle,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.result-3{background:#6D98BB;color:#000}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.eagle,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.result-2,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.eagle,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.result-2{background:#32B1E4;color:#000}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.birdie,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.result-1,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.birdie,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.result-1{background:#AED4F6;color:#000}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.par,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.result0,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.par,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.result0{background:0 0}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.bogey,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.result1,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.bogey,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.result1{background:#F7B942;color:#000}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.double-bogey,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.result2,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.double-bogey,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.result2{background:#EE5A00;color:#000}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.more-bogey,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.result3,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.more-bogey,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.result3{background:#9F5924;color:#000}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.birdie .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.bogey .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.double-bogey .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.double-eagle .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.eagle .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.more-bogey .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.result-1 .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.result-2 .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.result-3 .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.result1 .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.result2 .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.result3 .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.birdie .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.bogey .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.double-bogey .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.double-eagle .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.eagle .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.more-bogey .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.result-1 .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.result-2 .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.result-3 .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.result1 .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.result2 .has-video,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.result3 .has-video{background-position:-27px -465px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.first-col,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.first-col{text-align:left;font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.first-col,.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.first-col{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.last-col,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.last-col{border-right:none;padding-right:25px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats{background:#3F3F3F;border-bottom:1px solid #4F4F4F;padding:8px;text-align:left}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .stats-slider.largeContainer li{list-style:none;float:left;width:50%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .stats-slider.mobileContainer li .details-value{margin-bottom:20px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale>div{height:38px;line-height:38px;background:#FFF;display:block;float:left;color:#333;text-align:center}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale>div.double-eagle{background:#6D98BB}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale>div.eagle{background:#32B1E4}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale>div.birdie{background:#AED4F6}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale>div.par{background:#A2A7AB}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale>div.bogey{background:#F7B942}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale>div.double-bogey{background:#EE5A00}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale>div.more-bogey{background:#9F5924}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-01{width:5.55%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-02{width:11.1%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-03{width:16.65%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-04{width:22.2%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-05{width:27.75%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-06{width:33.3%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-07{width:38.85%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-08{width:44.4%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-09{width:49.95%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-10{width:55.5%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-11{width:61.05%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-12{width:66.6%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-13{width:72.15%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-14{width:77.7%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-15{width:83.25%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-16{width:88.8%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-17{width:94.35%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale .par-value-18{width:100%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .details-stats-container>div{width:50%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .details-stats-container>div:nth-child(odd){float:left}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .details-stats-container>div:nth-child(even){float:right}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .details-stats-container .details-block{padding-bottom:3px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .details-stats-container .details-title{color:#CCC;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:14px;text-transform:uppercase;line-height:16px;padding:5px 0;margin:0}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .details-stats-container .details-title{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .details-stats-container .details-value{padding-bottom:7px;border-bottom:solid 1px #424141}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .details-stats-container .details-value span{display:block;float:left}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .details-stats-container .details-value .main{color:#E4E4E4;font-size:36px;line-height:32px;margin-right:5px;letter-spacing:-1px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .details-stats-container .details-value .sup{color:#9E9E9E;font-size:12px;line-height:16px;letter-spacing:-.25px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote{padding:0 8px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote table{width:100%;table-layout:inherit}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote table td{border:none!important;padding:7px 0;font-size:10px;text-align:left;vertical-align:top;white-space:nowrap}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote table td p{padding:0 4px 0 18px;margin:0;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote table td p.double-eagle{background-position:-2px -616px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote table td p.eagle{background-position:-2px -633px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote table td p.birdie{background-position:-2px -650px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote table td p.par{background-position:-2px -667px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote table td p.bogey{background-position:-2px -684px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote table td p.double-bogey{background-position:-2px -701px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote table td p.more-bogey{background-position:-2px -718px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote table td p.video{background-position:-2px -734px;padding-left:20px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video{background:#424242;padding:25px 25px 0;height:215px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul{margin:0;padding:0;list-style:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li{position:relative;padding:0}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .elem{display:block;position:relative;overflow:hidden;max-width:280px;margin:0 auto}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .elem img{max-width:280px;max-height:157px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .elem .elem-img{background:0 0;display:block;position:static}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .elem .elem-img:before{content:\"\";position:absolute;top:0;right:0;bottom:0;left:0;z-index:9;background:-moz-linear-gradient(top,rgba(0,0,0,0) 30%,rgba(0,0,0,.65) 100%);background:-webkit-linear-gradient(top,rgba(0,0,0,0) 30%,rgba(0,0,0,.65) 100%);background:linear-gradient(to bottom,rgba(0,0,0,0) 30%,rgba(0,0,0,.65) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#a6000000', GradientType=0)}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .elem .elem-info{position:absolute;top:auto;max-height:48px;overflow:hidden;left:10px;right:10px;bottom:16px;padding:0;color:#FFF;display:block;text-decoration:none;text-align:left;font-size:14px;line-height:16px;z-index:10}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .elem .elem-info:hover{text-decoration:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .elem .elem-length{position:absolute;z-index:10;right:0;bottom:0;background:rgba(0,0,0,.5);color:#FFF;font-size:12px;line-height:14px;padding:3px 5px 1px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .elem .inline-video-player{top:0;left:0;bottom:0;right:0;display:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .elem .elem-info .category{font-family:'Roboto Condensed',sans-serif;font-weight:400;color:#FFF;font-size:12px;line-height:16px;display:block;opacity:.7;text-shadow:0 0 2px rgba(0,0,0,.5)}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .elem .elem-info .category{font-family:'NanumGothicRegular ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .elem .elem-video{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/img/sprite.png\") -360px -250px no-repeat;position:absolute;display:block;top:37%;left:50%;width:40px;height:40px;margin-top:-20px;margin-left:-20px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .thumb.play-mode .elem-length,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .thumb.play-mode .thumb-info{display:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .thumb.play-mode .inline-video-player{display:block}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .bx-pager{bottom:-45px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .bx-pager a{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -24px -123px no-repeat;text-indent:-9999px;display:block;width:10px;height:10px;margin:0 3px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .bx-pager a.active,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .bx-pager a:hover{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -123px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo{padding:0 9px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo ul{margin:0;padding:0;list-style:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo ul li{position:relative;padding:0}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo ul li .elem{display:block;position:relative;height:250px;overflow:hidden}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo ul li .elem img{width:100%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo ul li .elem .elem-img{display:block;position:relative}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo ul li .elem .shadow{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABACAQAAABxGNXLAAAAMUlEQVQIW2NgYmRiYGJiQCbxIGYYCUcsYARksOLgYgrCNaIxIAjZFmRLmZCcxwh3MABxHQEsGo2jVgAAAABJRU5ErkJggg==') left bottom repeat-x;position:absolute;bottom:0;left:0;right:0;height:64px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo ul li .elem .elem-info{position:absolute;bottom:0;left:0;right:0;color:#E4E4E4;padding:2% 11%;display:block;text-decoration:none;text-align:center;font-size:15px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo ul li .elem .elem-info:hover{text-decoration:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo ul li .elem .maximize{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -355px no-repeat;display:block;width:19px;height:19px;position:absolute;bottom:10px;right:10px;cursor:pointer}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .bx-pager{top:242px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .bx-pager a{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -24px -123px no-repeat;text-indent:-9999px;display:block;width:10px;height:10px;margin:0 3px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .bx-pager a.active,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .bx-pager a:hover{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -123px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .row-details .round-selector-box,.tournament-leaderboard-new-2 .leaderboard-container .row-details .round-selector-container{display:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .cell-playbyplay .round-selector-box,.tournament-leaderboard-new-2 .leaderboard-container .row-details .cell-playbyplay .round-selector-container,.tournament-leaderboard-new-2 .leaderboard-container .row-details .cell-shottracker .round-selector-box,.tournament-leaderboard-new-2 .leaderboard-container .row-details .cell-shottracker .round-selector-container,.tournament-leaderboard-new-2 .leaderboard-container .row-details .cell-stats .round-selector-box,.tournament-leaderboard-new-2 .leaderboard-container .row-details .cell-stats .round-selector-container,.tournament-leaderboard-new-2 .leaderboard-container .row-details .cell-stracka .round-selector-box,.tournament-leaderboard-new-2 .leaderboard-container .row-details .cell-stracka .round-selector-container{display:block}.tournament-leaderboard-new-2 .leaderboard-container .row-details .round-selector-container{position:absolute;top:75px;left:15px;z-index:100}.tournament-leaderboard-new-2 .leaderboard-container .row-details .round-selector-container .label{font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:12px;line-height:14px;text-transform:uppercase;color:#E4E4E4;display:inline-block;vertical-align:middle}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .row-details .round-selector-container .label{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .row-details .round-selector-container .round{display:inline-block;vertical-align:middle;width:26px;height:26px;line-height:27px;font-size:14px;font-family:'Roboto Condensed',sans-serif;font-weight:700;color:#E4E4E4;border:1px solid #E4E4E4;text-align:center;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;margin-left:6px;opacity:.5;cursor:pointer;overflow:hidden}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .row-details .round-selector-container .round{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .row-details .round-selector-container .round:hover{opacity:1}.tournament-leaderboard-new-2 .leaderboard-container .row-details .round-selector-container .round.active{opacity:1;background:#323232;cursor:default}.tournament-leaderboard-new-2 .leaderboard-container .row-details.round-selector-initialized .visible-large .details-stats,.tournament-leaderboard-new-2 .leaderboard-container .row-details.round-selector-initialized .visible-medium .details-stats{padding-top:55px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .shot-tracker-holder{min-height:170px;background:#424242}.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-scroller{padding:5px 5px 5px 10px;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAOBAMAAAAcbWtvAAAAKlBMVEUxMTExMTExMTEpKSkeHh4ZGRkVFRUTExMREREODg4MDAwKCgoICAgGBga6JJAZAAAADnRSTlMBBAYLExsjKzI4PUJHQ5pczFwAAAAkSURBVHheY2BgEGBQYDBgcGAIYEhgKGBoYJjAsIBhA8MBhgsAM0wFsSVacEsAAAAASUVORK5CYII=') 0 100% repeat-x #3F3F3F;text-align:left}.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-scroller .viewport{height:106px}.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-scroller .thumb,.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-scroller .thumb .end{background-color:#B2B2B2}.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-scroller .track{background-color:#565656}.tournament-leaderboard-new-2 .leaderboard-container .round-selector-initialized .visible-large .play-by-play-scroller,.tournament-leaderboard-new-2 .leaderboard-container .round-selector-initialized .visible-medium .play-by-play-scroller{padding-top:55px}.tournament-leaderboard-new-2 .leaderboard-container .round-selector-initialized .visible-large .play-by-play-scroller .viewport,.tournament-leaderboard-new-2 .leaderboard-container .round-selector-initialized .visible-medium .play-by-play-scroller .viewport{height:110px}.tournament-leaderboard-new-2 .leaderboard-container .details-articles{padding:10px 5px 10px 15px;border-top:1px solid #4F4F4F;text-align:left}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .viewport{height:340px;width:95%}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .viewport .overview{width:100%}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .thumb,.tournament-leaderboard-new-2 .leaderboard-container .details-articles .thumb .end{background-color:#B2B2B2}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .track{background-color:#565656}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .article{padding:11px 0;border-top:1px solid #4F4F4F}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .article:first-child{border:none;padding-top:0}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .article .article-img{float:left;width:80px;margin-right:10px}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .article .article-img img{display:block;max-width:80px;max-height:50px}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .article .article-title{color:#6D6D6D;font-size:11px;line-height:13px;margin:0 0 8px}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .article .article-text{color:#E4E4E4;font-size:18px;line-height:20px;margin:0}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .article .article-text a,.tournament-leaderboard-new-2 .leaderboard-container .details-articles .article .article-text a:hover{color:#E4E4E4}.tournament-leaderboard-new-2 .leaderboard-container .details-articles.native-scroll .scrollbar,.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-scroller.native-scroll .scrollbar{display:none}.tournament-leaderboard-new-2 .leaderboard-container .details-articles.native-scroll .viewport,.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-scroller.native-scroll .viewport{overflow:auto}.tournament-leaderboard-new-2 .leaderboard-container .details-articles.native-scroll .viewport .overview,.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-scroller.native-scroll .viewport .overview{position:relative}.tournament-leaderboard-new-2 .leaderboard-container .pagination{text-align:center;padding:7px 0}.tournament-leaderboard-new-2 .leaderboard-container .pagination a{display:inline-block;width:10px;height:10px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -24px -123px no-repeat;margin:0 3px}.tournament-leaderboard-new-2 .leaderboard-container .pagination a.current,.tournament-leaderboard-new-2 .leaderboard-container .pagination a:hover{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -5px -123px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .details-map{height:150px;padding-top:10px}.tournament-leaderboard-new-2 .leaderboard-container .details-map-info{top:55px;left:15px}.tournament-leaderboard-new-2 .leaderboard-container .details-map-info .details-map-hole{float:left;margin-right:6px}.tournament-leaderboard-new-2 .leaderboard-container .details-map-info .details-map-par,.tournament-leaderboard-new-2 .leaderboard-container .details-map-info .details-map-rank,.tournament-leaderboard-new-2 .leaderboard-container .details-map-info .details-map-yds{clear:none;margin-left:3px}.tournament-leaderboard-new-2 .leaderboard-container .shot-tracker{width:80%;float:right}.tournament-leaderboard-new-2 .leaderboard-container .details-map-legend{width:80%;left:auto}.tournament-leaderboard-new-2 .leaderboard-container .play-video-button{font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:12px;line-height:16px;text-transform:uppercase;background:#003e7e;padding:6px 15px 4px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;position:absolute;top:150px;left:15px;cursor:pointer;z-index:100;display:none}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .play-video-button{font-family:'NanumGothicRegular ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .play-video-button:before{content:\"\";display:inline-block;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") -27px -480px no-repeat;width:15px;height:10px;margin-right:7px}.tournament-leaderboard-new-2 .leaderboard-footer{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABJ4AAAAnCAYAAABOmYJEAAAWDUlEQVR4Xu2dCY5cx9GEJ2gbvoUl3f8aWqh932VL8kEYP37Y4x6whh3M+ZhdD48ZgCFz+tWWVfV6MiYyU++///7f7+7unt09Dv33f3ev89/l+Qu0fB7+Hfp8tswvznVtI/2nqe37tpJ0GT/1vT632i0/o8Xque1doX8/9rOlfWW8FeL91Pu9rGVZY24P8ETbuTi+XtFexTmazguMC+3N26I58nnwPjjU2Jd373f5TOYx/Zp3yWDuXWvKa1nv/vp8Xoc3rBfMYdC7B/mMhWePeH782Fq22rZ/Du62b+P83TGv4vl1eD+DuYPxwlhprbnP/DsBtIWJ7XL7y7rJubqyfqf1hT5V7MNPaVPcM4d+r7RLfa192H7orzvPM8+v0OZFsltewzrWclZCX0u70H/oJ7QJn4efp7OnDz744G++bK+uOfCSCmTK8nmVwHl2pZ9HyCf9d/5aCaMHkFbCpzCnpd+wTkok6Yq/p9xfdr4rjjf6bN2DO/v+31cc27wGA/IrOG/IQc52zk20+PNg/AU7+sl7kh2CdQ9dOBOVc7rAvtPlM4Aa+adgB0S4pPEB0Ume6ydsLlMRuAJgKblR1RniNq2TWIXzqoITlQmAlTxb/z+Di4cg3628VhVIXfM9yw5kXx+Z4LkleQHOrB487uJSAwdcny8gzpxsngm7bCtKtoR7JXAvXss+9sWegCTybUir3AcgR8J9scP5NCCgAom4fGZGVmVb2fU2hTWm/q40ky97sdjExTk6zRXsbyAy1lMl/e9OWlqeeXy+67vWgHx77Ky9KJzn4h7Un7Xt9SNdXaP0v2aun9M8t/9XPP01OAlBCbXwUbqsUw+dZy3t1w4UyZvVAXy0bUVlVCDKFoR5B8LAeujiSg/JmOAU1uaViZfs3KpA1Cj+Qp4dp5fPkC/N0l6tnqC0jIWIo0B2vOoZBUds+Yztsfywvzeo9NJiU0pArRCwCXWIhUy03iuDM+cr56eklst9XvbUXn5+Zy+E20IeF9YEFGoRAk6lGsgIQC5xwo+rwfKaMjmiV+y/tTbxpc3l3wrHyFe+Gyj80tITOXJtLQ9tUjpzeUgD5dvlGITvuKW/ZX2AWDw6CkQ+QIf6is+pSnhefkdfKAgvPwPKl4isBHn5PePKe5PanxJYqQ87k4Cl+V0e9TqNTMSX7JJJO6cxCvbxahv78e8wxzEAcYNVa7HP9ZvJdlyXksKrQigBZVVYX4Uguyy8bnf5CnFzZ9u19eV1A2LSb/Kskp/fK57+UlbH5J+p+vM4dg5fK5FXoV0eL8/Dj5EQkmT7Sl8lQkdhXZakN+zAqKgQEiACqs/ric6RCs8AB5OFskl6k+SFaVgadXiJDcPaosMg6dnyl4D7+7JC91Lf+yaSGLnG1+dMnuXQMUAAViFCunBw8kWSHsqubV/7w4n71sfvX/hLsSrkYSLZgU3WvckEv8NdUZ4TdzZB+OPiULYSsFw1JayyqJ9xg/nScLs729bFW3vp+3l9/mEb2+m7477PpV/bRFUkGDrleF/z/czzzcSel/Ez3KmEWxUZrr9zMqHvwr1INlVwgN0d8mhHgsMF+wTlXz4vNLwQO+7ZVpakK7aLRByZC1M/8XFC/3E+URGXxxELI8xzpCGOeUyudgT9LqF2zyqEDPiZKoRRJmByuzRGKQwury+3ye0FnEKc36cjl08MHaiPqSAtT/vkIvHF55ydM6c+mvIqqdKnpIckTP7FOxOXepn8kfS6Sj9HYrFOdji1A2QsINqQc6gQlkDg1Vnm9y7ZbUP+LGVnoZ8Qk6RX3Dk/yINQJ25vBPC+Q+QHOJNpbDUrYXSLfokik5M92TmVpOC4vuqZZW6SlD6/Mo9AEpXtaEm2raUdP6O67z/MOZMq9fvj5lxVvqGazAXijjrw187eVRWi7VcRlZYk20EVU3qHGdzx6ODeE7QQfkKIpzOhmu9KxU4sD1lun9aLyWAeWsgJjzph6hZVD1etOYTrhbEK4yGikBNT+vDDD59VSBPw80As5TbgeaDKAsRTWGt3jh2Q94mqhFywUXfuFxHHiIQUts+Nnx23z7Xe1oWz+iKFj4L9FiScnMfLdzSSbFkCrWDbhXADTntQo6Az5vBuOTy6Q41SsphE5Cbi9v6ZB47NssdBtbOcE6Z6yvO03fE+zOQ3J22yM8FVuE55pqrfR5IeC2NQdi45Ajm0YJlHaC9psZfXtg8VUXrF2L4yj8WuYS+RjcL8CMFpoLJ3zteWiQZArDkoZQAqiqf83cxDWVf7hX2h6jCHPXJaD1ewZsUuTXgeCTuuxDQhAgrnr7w/Ya9RmBdVGgECJY7RSAIZEX583jz8cyWePnpWc4I4EQWrtinNJ8xfgDQLbbEizDTxNyS1snokOxqcJOMkkQBhghHswdpy+3LCrL8ilwMJg6snBue4ErapbTbmpKUW2XFw8iFp6BginMmQdZ45rEHJ2ab3pkvJElRlcb6988whNsvPg5NVIF5fVEmknpDhHN4Hw8DdtW/F3zdcyTVUTCTvYjinuHIv90dJ4XAfQNLrArEMVYOBDHYiRymBBe+uCwQ2ndsLHuKaARSOjjbh47miLG9au+m8YRuedyrntBIgxEr5kTrJCKogwsQbJ6l46Bq3uRv2DLbL0EcffaQnEBScCOHKINU/489X8kc1ECK3KeMfUAhnw/32tOGKFrDXrlYp405S3ieQA8qhrWA4h5nyK98JaFsvay+QVAxcRURznBFyrU+9xJNkF4h2kGMLlcpWcvrA/SVOnwvjwnObbVE88xz8/WVGGHJQx5C+fwoEVDlkHBBnXvZnIfCroZn5HBCHtzoOqICa2hpUr+1K+O60zxWFKK/sx5VFBZVk2CsA0HdQyQLHHRBCGe4m6gqEFCbkADFDFV/m54mHWnJFFT8LDXZqJ5iq4+r58+eiCXApGVUlpqoEFZivyJqBWoqpZ/JzAk466JvNm5Jd3H58D2i4GieisvPTRZxkEo4rNIqJ6h3JJ4iisy7UZ1bLKMif492hTgDI9ePKOQlEEbrvQSUXAAiSBqKgoYqgcV4l7hCpoKwxUGKGeVHygZekByGvBs+cAKtiD67bjfnWUJ6pBmK1TAIku5PvAWAHQHyA/ULquAwa/kTa4Od5G4PzRPc5n/nrcCCLN+de6ifcMpHE14D65Z+74dw1kFfMNnr+/GMctsNVPrx6HgyV4zms+kk5Xoq+nxQS7yuTIkRRUxkTEETVcB9uyxqEQzA4+dO/N9wGemKCd4UYd8F1u1SJiaKeuF9NBIiCPfI7g8/RG0N4FVUKXMHpG6jtTNsDNanzuvM5BI4dJaRMVHVBlUnDbwRCvSohXdqQaLofXFWgQqUvjJQ7kNi5kVxyCIPcm+S8bgOT9Rfu/x51BCcbxBJx87EayT13qVv4+Jk47SZT+PPcpjvDPvcpGzP08ccfIwIEOKaYXGkgt/J4nLgyUGFhBRpI0CtQsrrWb39IXUb//hjZPoKTfVUVCiBACoquUsiAaFVCogLrSBrdqLpSIaFpo7Iv25uohZAdOYTUKzzk0VXyv543Jf8bOWTcOeW5cDgMQj8TnMO/MpG1k1wBFTjdnyOrH0ChVj03jqrSuuLPOAdTVmZw8MqBLqitQULsQIwABQwgUhqULS1hlS6GO7sjpCmQLkKkCScOVSS9TEi67nAypJJa4e7wtg5it59k4m31ySefAIKpDDUmghZ+LiCQXdiZx3bor5wmVMksj2OQsBzn9QljEqjiBJO5gLCiuJ/hc0RkkjA5Tppxsj2p8Eg1rf4k/By88l8m8cE6GnKiRQiMD3JxNYGXV1eREHR3BU1wtszD/fhdrIc27kfX+QVqsWpIprDSIZ9/V6oSwjulZudElWdLZeYzSWP43e8WIoffTYMy7WT8/D7juatcsJeLOfI4CcGJIfEcP3eiRFS0az+R4t1Ezh5VH++bP7u/vT799NOGUJ8WRYng+GoaR+BZQDBgEkitKhuuvBGdG1W40PUFWfdNCMVURaxDtdbTJ7dRUcmjHcm+C+S8txBS/D6aEJRAlXZIkDxVhPiFtu/vl/cnQtQAJafB+xGpL3M5du68PNHJFOgTk+nFd70byRiV7NcFHi6kgjqJkT7c0VR1/4GNKnBn/qJNIW4+kvqCl/Pn/RfGEVIB7VfXeMO5RfZKbU90t71BlZuIp89Kz9PnSCjbNlKqP2m19tidz6MjlAkSXmq2kzrP/+bE7Oodhz/XW8K+3g6W9xZXEfUTDZ3jgPECwcnGBs6JgOMpErLF1ZCcZOgPYeLEQmHPMjFRV8AIhL8dk0jsP7MG4aqguiFbIyDoAAFQCo822y9+9zcQFXnP63ZxleiG4VqG4Zh+YpiRgMKwrUodeq7/TLqDPNmU98n7bdjf3/HD4fg6do+lzz77nDsO/e3VTACoWy1F1UlVZxQ4ke0Jg3eRFb2ONFeQNObwUVN1OnPikt+XxncMrxhYL7EuYIu0RwJONyU6sg0OC06M7yBmmCqEk4SsdDa3IVTLGO63NpAZTF2Zx98Pfl7618oJX+/KXVTNOwaShdfJoRVuUBMCu6D1GCmL8n6pwREmZf21QSljovqq2r/D3rDog9E4xycCRW3Zv07ejmP/mPr880w8HVThoQ3V1yih0E/gcPWCQH/b1Br7SS0evtU1L/KXfxCeB+aN7K4GtVxDuOUCY0d+L/SG12Bg45SvQ0G1AubDzwuodkbUV/0Y+HB271fn+YmKIzWUjO+Gw7jUnkaKQG5Dh72hzp8gAeQwfn5/ZtWvKTHVlATcWKWa5yUQYgbOH1XhcbLjxsnffQACxN197Snpf/4QOD5WP/TFF1+A5gdVRWWofdzjhyZp435rB6m5mfDTDffUGxRqBAJqLmgnrtqoEnpcrcWrUtZCUXIyd+C8orXvczp53ppm8t1tfXB1mEFunR2kKycE62osEXIA2HLjueNEBVXybVjjVrtsTFLvTX24MRRUm6pOGShAjMMAOaHYv7f96hztnjMrerCfVDnQXLxz3nyc40NffvllQ7eHJku0ifBR45y9gdxpIAngGvYrXXTQKmTaEN53gndDxH5F3/nf2f3Kt/5E+P026K/e6OKZNyAGAVHX69BvJrTUcHbbkrxvtLnhd2kmTHOfJknpG/N/GZLjDncdEXhb8r7ws+j+OXNyiBNo+bnUL7CVbk0ugfvmGxIL3knWEiLsqETShMX1Q1999dVeJ4ZDB2yng9pRm515txMEHLrBWnQkhVr/evqTaoO1tO1XcFwO/P7kziJM6O5WYpEnLxaz6+rAkZA5dO73wxve60m9586zluYC5gAc6e1w4byDNlucLfeTdTxBe5OTKtiPQL4hSmC4m1zO68xKUUaY7Ce8gOoVzGW/yoXPld/9rWsE2Ll/Qyxx6OuvvwbNN+QH2eeg7ycXOHTwfvm+90MNzg8oEU/vFleW7AlfyuqA1D+18X57cYKREERX+lVD5bIN5y2NmefHVQu5/dHDfAaDcnLqDCeSv3m+AgmlBRxCMm+umOLfn6YqlxZ1F4dTuCvIi6TQ/hjEAX9GgYjbtp4Nyqmjq3f637EAQywdnnj6BjQ/qTqKQ7vK4Z9gr4Cz1T43ncWmoBz6ueydoTOH2vGcTftDyGCuKSHyNjsE2kDWgCpveY0gYe8kFD+ecswForx0txqKn3i37fKecgKsUJWqlntv/5l3I2mihpw8YO77nG9AUoFqg7wi51tYXcydxDIg7yfsrHUeA33zzbeg+dEcD6422h8GcP68LG+ZqomTNtxR5XMcBZx2OZbQoRTs3537S/PdbLD7eb4nef/ekxdwPylaIh45zFXk/JwAlZ5PSyZmQlrAadyV6FsHd9q9paIjRn/I4a55k1x9O0LrTnCmTxNitqMoxl7CfqBvv/3urVvzCZ0UHWyMIbf2l/AXaX/m8M+NydB11nPOHWN+RveTqP3qs0bi0CAX1qiZDo5CQmilNuRMVNVUXOHCw7VoSHKDeoUkuxYgmrrhnf0C2+5YqxvJXYP3XYN9TlRVrF+B5KN/B43iaKDvvvu+r/chpsYJ5Y4TDyU5FHgpeBz61V82XhvmC8a5WaJmYXvtD8sz2Cuw7t7k0qHdGaG0bhDiIqCygDlkOJorx4n1w6tTVezenH9jwAk8HaSam/pCgDJRSar0URvEPo+fj0evaQedqDy89/Q3hNEQSwN9/32ReBpo5sEdvubwHJ9HIdavqOgmJzYk5YbznrteUB14b6gyJ/322GrAiUO+/3QcDh6CMuCkAVAhtO1hGJeGygl8vuH+EBKJY3+CZd7PCRREYgQYX8+QSP2KrvNjoB9++CE0GEw42WGgDcomkoxXs39NdpmiBT7DfQZqgCNCJC/MYLUJTIzeT1xQ1BVfLtjA8LvU24mw/neC4bvIvQrE/bYE4Y598+ShyQahkepIcD0VvPh5G5XP8ec3GOjHH38cKxxBAXQu6GYkwxAqOjx5MIpEb5inmsZ2U24yE/sNuOKQ73d/n4Pjk7MNCbZVIuQG/YnUeR8Kn3eQct4QPnpEEkonzb3jzfY0JyjPr0AaDPTTTz9tGXgwJEGQ0g5uGSp3fGdfs3+HhDrPy6jIeHJxQEgZkOxDMgEVB9q78xNqBnkedzr9wmuvl/fXRgUJH3OUGd77DuKqLtB3C/YSj0MmDQb6+eeft09iMKTVrHfCoHiC736SaBxqEIJ6YrUjyFfWR9YMBCuTcQXG8ZU5OoOjDnM48ST853fwDJTtZvY6PkE84XEzv9fGrHMwxNMvR5rPYAicsc9AEyrH58tVPgOeCJ87dy3KisFgYJAa4daJ6XUK5c5qI01SZmjD48JTLOHl9Q4GA/3yy6+nWtBgMGQQr+w0ewwc+Akv23qOcZXL42MwGAwMKtltACmwsL8K5ahvOGatg8FAv/7621hhMOhx6DX22B56NSTphPr5yKGSs1f9/QWHN+X9EEjUK0QY5Od0xcGfRNwDQwWvG8vyC7fJVQYF1rINQWWnU6uK+BoUzsVGDAYD/fbbP8+4rsFgiIWBDq1oGqiQQ0OTD+kcObAA6dJfZa2fMNOtqoAtbQZT1RCEYqO8YIOsQjsd5h20YjAYyPbhJjUY/Otfv9cbDXR853xQUeQUFBcIgzmDu4oMgP7PAIOqrt02dYUcTjnPgLIL5K+rKyQpCckx6qwGUnn2ilRQPDMGg8EQT4PB77+fm3gajPJrCI3sBA8Gg8Hg/CXeh2zjlRn7MXjvvffO5qMMBkM8DQZ//PHHadYyGDJrMECJgOfcjvqAtzFQyO5QpxncJ0p0qLn8vkAOpuOQDaO48tuphhu8++675/FXBoMhngZDPP35ln+pvVOx1dJuu/2GwDJIeKoT5aMaDAaDwYTE8Up4vAKe7waD/Pv36oOsz5zFfxkMhngaDP78899v9frfeecfJ7LfYJCrEZH22IEaDAaDUdhVKjW6QugMBvP792Aw+OsRJzUYSCfyBcd+g4HDZ7B9xuTI2BB21JMYWIBQNCi1LtDHYat6BhJBO4jaPF4mT3A41GoPgX1ez0mev8GdJnD+vP7+HAzGfxkMBv8HC9VC+XLuSvQAAAAASUVORK5CYII=') center top no-repeat #FFF;padding:25px 17px 17px}.tournament-leaderboard-new-2 .leaderboard-footer p{font-size:16px;line-height:23px;margin:0}.tournament-leaderboard-new-2 .leaderboard-footer .title{color:#333;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:16px;line-height:18px;margin:26px 0 4px}.locale-ko .tournament-leaderboard-new-2 .leaderboard-footer .title{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-footer .scoring{float:left;color:#9D9D9D;font-size:14px;line-height:27px}.tournament-leaderboard-new-2 .leaderboard-footer .scoring span{margin-right:10px}.tournament-leaderboard-new-2 .leaderboard-footer .scoring img{height:27px}.tournament-leaderboard-new-2 .leaderboard-footer .mastercard{float:right;height:27px}.tournament-leaderboard-new-2 .leaderboard-footer .web-tour-legend-line{display:none}.tournament-leaderboard-new-2 .leaderboard-footer .legend-icon{float:left;display:block;width:19px;height:23px;text-align:center;font-size:14px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") no-repeat}.tournament-leaderboard-new-2 .leaderboard-footer .legend-icon.live-at-video{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") 0 -1594px no-repeat;width:22px;height:22px}.tournament-leaderboard-new-2 .leaderboard-footer .legend-icon.video{background-position:-5px -444px}.tournament-leaderboard-new-2 .leaderboard-footer .legend-icon.photo{background-position:-5px -426px}.tournament-leaderboard-new-2 .leaderboard-footer .legend-icon.article{background-position:-5px -375px}.tournament-leaderboard-new-2 .leaderboard-footer .legend-icon.asterisk{background-position:-29px -392px}.tournament-leaderboard-new-2 .leaderboard-footer .legend-icon.number-sign{background-position:-5px -407px}.tournament-leaderboard-new-2 .leaderboard-footer .legend-icon.amateur{background:0 0}.tournament-leaderboard-new-2 .leaderboard-footer .legend-icon.sponsor{background:0 0;width:auto;height:auto}.tournament-leaderboard-new-2 .leaderboard-footer .legend-icon.sponsor img{max-width:45px;margin-right:10px}.tournament-leaderboard-new-2 .leaderboard-footer .legend-icon.earn-card{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/earn-card.png\") no-repeat;background-size:100% 100%;width:18px;height:15px;position:relative;bottom:-4px;right:-5px}.tournament-leaderboard-new-2 .leaderboard-footer .legend-icon.movers{width:15px;height:15px;margin:4px 0 0 2px;background:0 0}.tournament-leaderboard-new-2 .leaderboard-footer .legend-text{display:block;padding-left:36px}.tournament-leaderboard-new-2 .leaderboard-footer .abbr{margin-right:15px}.tournament-leaderboard-new-2 .message-outer{position:absolute;top:150px;left:50%;width:500px;margin-left:-250px;z-index:5}.tournament-leaderboard-new-2 .message-outer .message-inner{background-color:rgba(24,24,24,.8);margin:0 auto;position:relative;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.tournament-leaderboard-new-2 .message-outer .message-inner .message-icon{float:left;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") 0 -782px no-repeat #262626;width:16px;height:16px;padding:15px;-webkit-border-radius:3px 0 0 3px;-moz-border-radius:3px 0 0 3px;border-radius:3px 0 0 3px}.tournament-leaderboard-new-2 .message-outer .message-inner .message-icon img{display:block;width:16px;height:16px}.tournament-leaderboard-new-2 .message-outer .message-inner .message-text{float:right;width:453px;text-align:center;font-size:14px;line-height:17px;padding:15px 0;color:#FFFCC9}.tournament-leaderboard-new-2 .message-outer .message-inner .message-text a{color:#FFFCC9;font-family:'Roboto Condensed',sans-serif;font-weight:700;text-decoration:underline}.locale-ko .tournament-leaderboard-new-2 .message-outer .message-inner .message-text a{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .message-outer .message-inner .message-text a:hover{color:#FFFCC9;text-decoration:none}@media (min-width:1320px){.tournament-leaderboard-new-2 .leaderboard-playoff-table .header .arrows{display:none;float:right;width:76px}.tournament-leaderboard-new-2 .leaderboard-playoff-table .header .arrows .next-td{position:relative;background:#001528;width:36px;height:60px;border-left:1px solid #405E78;display:block;float:right}.tournament-leaderboard-new-2 .leaderboard-playoff-table .header .arrows .next-td:after{content:\"\\203A\";position:absolute;color:#FFF;font-size:38px;top:20px;left:16px}.tournament-leaderboard-new-2 .leaderboard-playoff-table .header .arrows .prev-td{position:relative;background:#001528;width:36px;height:60px;border-left:1px solid #405E78;display:block;float:right}.tournament-leaderboard-new-2 .leaderboard-playoff-table .header .arrows .prev-td:after{content:\"\\2039\";position:absolute;color:#FFF;font-size:38px;top:20px;left:10px}}@media (min-width:979px){.tournament-leaderboard-new-2 .second-tab .row-details-close{right:4px;top:13px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .full-scorecards{width:auto;float:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .full-scorecards li{float:left;width:50%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .full-scorecards li.first-part{display:block!important}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .full-scorecards li.first-part .last-col{display:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .full-scorecards li.second-part{display:block!important}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .full-scorecards .scorecards th .scorecards-next,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .full-scorecards .scorecards th .scorecards-prev,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .full-scorecards li.second-part .first-col,.tournament-leaderboard-new-2 .leaderboard-container .row-details .tabs .tab[data-tab-type=videos]{display:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .full-scorecards-footnote table{width:500px;margin:auto}}@media (min-width:980px) and (max-width:1150px){.tournament-leaderboard-new-2 .details-player .cell-fix,.tournament-leaderboard-new-2 .first-tab .cell-fix,.tournament-leaderboard-new-2 .second-tab .cell-fix{height:490px}.tournament-leaderboard-new-2 .row-ad{right:11px}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .viewport{height:400px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .shot-tracker-holder{min-height:240px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map{padding-top:80px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map-info{top:18px;left:220px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .play-video-button{top:112px}.tournament-leaderboard-new-2 .leaderboard-container .shot-tracker{width:100%;float:none}.tournament-leaderboard-new-2 .leaderboard-container .details-map-legend{width:100%;left:0}.tournament-leaderboard-new-2 .leaderboard-container .round-selector-initialized .visible-large .play-by-play-scroller .viewport,.tournament-leaderboard-new-2 .leaderboard-container .round-selector-initialized .visible-medium .play-by-play-scroller .viewport{height:180px}}@media (min-width:768px) and (max-width:979px){.tournament-leaderboard-new-2.tournament-leaderboard-yahoo .leaderboard-header .leaderboard-header-content-part{left:19px}.tournament-leaderboard-new-2 .details-player .cell-fix,.tournament-leaderboard-new-2 .first-tab .cell-fix,.tournament-leaderboard-new-2 .second-tab .cell-fix{height:490px}.tournament-leaderboard-new-2 .ad-pro-am{padding:20px 0}.tournament-leaderboard-new-2 .leaderboard-header .header-ad-tee-off{width:380px}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-watch{width:320px}.tournament-leaderboard-new-2 .row-ad{position:static;background:#323232}.tournament-leaderboard-new-2 .row-ad .ad-pack.active,.tournament-leaderboard-new-2 .row-ad>img{padding-top:20px;padding-bottom:20px}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .viewport{height:400px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video{padding:25px 14px 0 15px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .bx-pager-item{margin-top:8px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .shot-tracker-holder{min-height:240px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map{padding-top:80px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map .details-map-menu{top:5px;right:15px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map .details-map-menu .btn{float:left;margin-left:6px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map-info{top:18px;left:220px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .play-video-button{top:112px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td .has-video{-webkit-transform:scale(.8);-moz-transform:scale(.8);-ms-transform:scale(.8);-o-transform:scale(.8);transform:scale(.8)}.tournament-leaderboard-new-2 .leaderboard-container .shot-tracker{width:100%;float:none}.tournament-leaderboard-new-2 .leaderboard-container .details-map-legend{width:100%;left:0}.tournament-leaderboard-new-2 .leaderboard-container .round-selector-initialized .visible-large .play-by-play-scroller .viewport,.tournament-leaderboard-new-2 .leaderboard-container .round-selector-initialized .visible-medium .play-by-play-scroller .viewport{height:180px}.tournament-leaderboard-new-2 .leaderboard-container table .col-pin{width:42px}.tournament-leaderboard-new-2 .leaderboard-container table .col-pos{width:49px}.tournament-leaderboard-new-2 .leaderboard-container table .col-move{width:48px}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-main>td .row-video-slider.has-videos,.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider.has-videos{display:none}.tournament-leaderboard-new-2 .leaderboard-playoff-table .header h3{font-size:16px;padding-top:10px;padding-bottom:10px}.tournament-leaderboard-new-2 .leaderboard-playoff-table .header .arrows{float:right;width:76px}.tournament-leaderboard-new-2 .leaderboard-playoff-table .header .arrows .next-td{position:relative;background:#001528;width:36px;height:40px;border-left:1px solid #405E78;float:right}.tournament-leaderboard-new-2 .leaderboard-playoff-table .header .arrows .next-td:after{content:\"\\203A\";position:absolute;color:#FFF;font-size:29px;top:9px;left:16px}.tournament-leaderboard-new-2 .leaderboard-playoff-table .header .arrows .prev-td{position:relative;background:#001528;width:36px;height:40px;border-left:1px solid #405E78;display:block;float:right}.tournament-leaderboard-new-2 .leaderboard-playoff-table .header .arrows .prev-td:after{content:\"\\2039\";position:absolute;color:#FFF;font-size:29px;top:9px;left:13px}.tournament-leaderboard-new-2 .leaderboard-playoff-table table tbody tr td.player-hole{min-width:160px}.tournament-leaderboard-new-2 .leaderboard-playoff-table table tbody tr td.hole{width:4%}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .flag{position:relative;top:-3px}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .name{margin-right:5px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head p{text-indent:-9999px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-head .row-details-share{margin-left:10px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-head .row-details-close{position:absolute;top:16px;right:13px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .bx-pager{display:none}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td a.hidden-large,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td a.hidden-small,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td a.visible-medium{display:block!important}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td a.visible-large{display:none!important}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .details-photo,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .details-video{margin:auto}.tournament-leaderboard-new-2 .leaderboard-container .details-title{margin-bottom:5px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .par-scale>div{height:25px;line-height:25px}}@media (max-width:767px){.tournament-leaderboard-new-2.tournament-leaderboard-yahoo{padding-top:0}.tournament-leaderboard-new-2.scoring-type-1 .details-map,.tournament-leaderboard-new-2.scoring-type-2 .details-map{height:40px}.tournament-leaderboard-new-2.scoring-type-1 .details-map .map-insert,.tournament-leaderboard-new-2.scoring-type-2 .details-map .map-insert{display:none}.tournament-leaderboard-new-2 .ad-pro-am{padding:10px 0}.tournament-leaderboard-new-2 .sponsor-advertisement{margin-bottom:0;text-align:left}.tournament-leaderboard-new-2 .leaderboardRolexBlock{position:relative}.tournament-leaderboard-new-2 .cell-fix .cell-fix-inner{position:static}.tournament-leaderboard-new-2 .row-ad{position:static;background:#323232;display:block;width:100%}.tournament-leaderboard-new-2 .row-ad .ad-pack.active,.tournament-leaderboard-new-2 .row-ad>img{padding-top:0;padding-bottom:0}.tournament-leaderboard-new-2 .leaderboard-playoff-table .arrows{float:right;width:76px}.tournament-leaderboard-new-2 .leaderboard-playoff-table .arrows .next-td{position:relative;background:#001528;width:36px;height:60px;border-left:1px solid #405E78;display:block;float:right}.tournament-leaderboard-new-2 .leaderboard-playoff-table .arrows .next-td:after{content:\"\\203A\";position:absolute;color:#FFF;font-size:38px;top:20px;left:16px}.tournament-leaderboard-new-2 .leaderboard-playoff-table .arrows .prev-td{position:relative;background:#001528;width:36px;height:60px;border-left:1px solid #405E78;display:block;float:right}.tournament-leaderboard-new-2 .leaderboard-playoff-table .arrows .prev-td:after{content:\"\\2039\";position:absolute;color:#FFF;font-size:38px;top:20px;left:10px}.tournament-leaderboard-new-2 .leaderboard-playoff-table table tbody tr td.hole{width:11%}.tournament-leaderboard-new-2 .leaderboard-playoff-table table tbody tr td.player-hole{min-width:270px}.tournament-leaderboard-new-2 .leaderboard-header{position:relative}.tournament-leaderboard-new-2 .leaderboard-header .tabs{float:none}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-header-content-part{top:inherit;left:inherit;position:static;padding:10px 7px 0 12px;white-space:nowrap}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-header-content-part .scoring{float:left;margin-top:0}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-header-content-part .scoring span{float:left;font-size:12px;line-height:20px}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-header-content-part .message{float:left;margin-bottom:10px;font-size:12px;line-height:20px}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-amateur .title{margin:5px 0 12px 12px;float:none;display:block}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-amateur .btn-amateur{float:none;display:inline-block;margin:0 0 20px 12px}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-amateur .btn-amateur.visible-small{display:inline-block!important}.tournament-leaderboard-new-2 .leaderboard-header .header-ad-tee-off{display:none}.tournament-leaderboard-new-2 .leaderboard-header .alert{text-align:center;padding:12px 10px;margin:5px}.tournament-leaderboard-new-2 .leaderboard-header .alert .message{display:block}.tournament-leaderboard-new-2 .leaderboard-header .alert .message>div{display:block;height:auto;padding:8px 0}.tournament-leaderboard-new-2 .leaderboard-header .alert .weather-sponsor-logo{position:static;margin:0 auto;height:37px}.tournament-leaderboard-new-2 .leaderboard-header .alert.show-sponsor-logo .message>div{padding:8px 0 16px}.tournament-leaderboard-new-2 .leaderboard-header .scoring{float:none;width:auto;min-width:0;margin-top:10px}.tournament-leaderboard-new-2 .leaderboard-header .leaderboard-watch{float:none;width:95%;position:relative;top:0}.tournament-leaderboard-new-2 .leaderboard-header .link-button{display:block;position:relative;right:inherit;bottom:inherit;font-size:15px;margin:5px 0 10px}.tournament-leaderboard-new-2 .leaderboard-container table .col-player.sorting div .name{float:left}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div{position:relative}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .name{float:none;margin-right:0}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .name .visible-small.has-xx{display:block!important}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .live-at-video{position:relative;top:-1px}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .ocqs-logo,.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .sponsor-logo{margin-right:0}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th.last-col,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th.last-col{width:1px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th .scorecards-next,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard th .scorecards-prev,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th .scorecards-next,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards th .scorecards-prev{top:-16px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td .has-video{-webkit-transform:scale(.8);-moz-transform:scale(.8);-ms-transform:scale(.8);-o-transform:scale(.8);transform:scale(.8)}.tournament-leaderboard-new-2 .leaderboard-container .row-details .round-selector-container{top:125px;left:10px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map-menu{top:11px;right:9px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map-info{top:61px;left:10px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map-info .details-map-hole{margin-right:0;font-size:14px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map-info .details-map-par,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map-info .details-map-rank,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map-info .details-map-yds{margin-left:1px;font-size:14px}.tournament-leaderboard-new-2 .leaderboard-container .play-video-button{top:168px;right:9px;left:auto;font-size:11px;padding-left:10px;padding-right:10px}.tournament-leaderboard-new-2 .leaderboard-container .play-video-button:before{-webkit-transform:scale(.8);-moz-transform:scale(.8);-ms-transform:scale(.8);-o-transform:scale(.8);transform:scale(.8);margin-right:6px;position:relative;top:1px}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .table{border-bottom:none}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed td.visible-small{border-bottom:none!important}.tournament-leaderboard-new-2 .leaderboard-container .table-deployed .row-video-slider.has-videos{display:none}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head{min-height:27px;padding:10px 8px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live{position:absolute;left:inherit;right:-135px;width:120px;white-space:nowrap;bottom:-5px;text-align:right;float:left}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live .btn-live{font-size:0;margin:0 2px;padding:0;width:32px;height:32px;display:inline-block;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live .btn-live a{display:inline-block;width:31px;height:31px;font-size:0}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live .btn-live .icon{display:none}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live .btn-live.watch{background-position:0 -1514px;padding:0}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live .btn-live.listen{background-position:0 -1552px;padding:0}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-favorite-live .btn-live.cbs{background-position:0 -1628px;padding:0}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-player-select{position:relative;top:0;float:none;right:inherit;left:inherit;margin:0 128px 0 0;width:auto}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-player-select .hasCustomSelect{width:calc(100% - 1px)!important}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-head .leaderboard-player-select .customSelect{width:calc(100% - 22px)!important}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head .col-player .play-by-play .switcher{margin:0 0 0 4px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td a.hidden-large,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td a.visible-small{display:block!important}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td a.hidden-medium,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-head td a.visible-large{display:none!important}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video{padding:25px 0 0}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .elem{max-width:280px;margin:0 auto}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video ul li .video-mobile-overlay:after{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:100}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .bx-pager-item{margin-top:8px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-head{background:#1C1C1C;height:50px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-head .row-details-close{position:absolute;top:10px;right:10px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-head .tabs{float:left;max-width:190px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-head .live-at-video{float:right;display:block;width:22px;height:22px;margin-left:3px;margin-top:4px;cursor:pointer;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") 0 -1594px no-repeat}.tournament-leaderboard-new-2 .leaderboard-container .row-details .round-selector-box{background:#323232}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .scorecards-slider .second{display:block}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .bx-pager{display:block;top:157px;bottom:auto;padding-top:0}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .bx-pager a.active,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards-box .bx-pager a:hover{background:#FFF}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video{height:205px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .bx-wrapper,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .bx-wrapper{max-width:350px!important}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .bx-wrapper .bx-viewport,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .bx-wrapper .bx-viewport{min-height:157px!important}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .bx-wrapper .detail-video-slider li,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .bx-wrapper .detail-video-slider li{min-width:350px!important;min-height:157px!important}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .bx-wrapper .detail-video-slider li .elem,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .bx-wrapper .detail-video-slider li .elem{max-width:280px;min-height:157px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .bx-wrapper .detail-video-slider li .elem img,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .bx-wrapper .detail-video-slider li .elem img{max-width:350px;max-height:157px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .transform-none,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .transform-none{width:0;height:0;transform:none!important;-webkit-transform:none!important}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .close-button,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .close-button{position:fixed;top:10px;right:9px;width:22px;height:22px;z-index:100000;display:none;background:rgba(0,0,0,.8);border:1px solid rgba(195,195,195,.8);-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;cursor:pointer}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .close-button:after,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .close-button:before,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .close-button:after,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .close-button:before{content:\"\";position:absolute;top:50%;left:50%;width:15px;height:1px;background:#FFF;-webkit-box-shadow:0 0 1px 0 #FFF;-moz-box-shadow:0 0 1px 0 #FFF;box-shadow:0 0 1px 0 #FFF}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .close-button:before,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .close-button:before{-webkit-transform:translate(-50%,-50%) rotate(45deg);-moz-transform:translate(-50%,-50%) rotate(45deg);-ms-transform:translate(-50%,-50%) rotate(45deg);-o-transform:translate(-50%,-50%) rotate(45deg);transform:translate(-50%,-50%) rotate(45deg)}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .close-button:after,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .close-button:after{-webkit-transform:translate(-50%,-50%) rotate(-45deg);-moz-transform:translate(-50%,-50%) rotate(-45deg);-ms-transform:translate(-50%,-50%) rotate(-45deg);-o-transform:translate(-50%,-50%) rotate(-45deg);transform:translate(-50%,-50%) rotate(-45deg)}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-photo .bx-pager,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-video .bx-pager{bottom:-40px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard thead tr th.first-col,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards thead tr th.first-col{padding-left:3px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td.last-col div,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard thead tr th.last-col span,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td.last-col div,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards thead tr th.last-col span{display:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr td div,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr td div{padding-left:3px;padding-right:3px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecard tbody tr:last-child td,.tournament-leaderboard-new-2 .leaderboard-container .row-details .scorecards tbody tr:last-child td{border-bottom:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats{padding:55px 10px 10px;height:auto;border-bottom:none}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .details-stats-container>div{float:none!important;width:100%}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .bx-pager{bottom:0}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .bx-pager a.active,.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-stats .bx-pager a:hover{background:#FFF}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote table{width:auto}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-footnote table td{padding-left:10px;text-align:left}.tournament-leaderboard-new-2 .leaderboard-container .row-details .shot-tracker-holder{min-height:230px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map{padding-top:95px;height:130px}.tournament-leaderboard-new-2 .leaderboard-container .row-details .shot-tracker{width:100%;float:none;margin:0}.tournament-leaderboard-new-2 .leaderboard-container .row-details .details-map-legend{width:100%;left:0}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content ::-webkit-scrollbar,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-main-content ::-webkit-scrollbar,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-favorite-content ::-webkit-scrollbar,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content ::-webkit-scrollbar{display:none}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .phone-tabs,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-main-content .phone-tabs,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-favorite-content .phone-tabs,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .phone-tabs{height:60px;overflow-x:auto;overflow-y:hidden;white-space:nowrap;text-align:left}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .phone-tabs .tab,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-main-content .phone-tabs .tab,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-favorite-content .phone-tabs .tab,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .phone-tabs .tab{margin:0 13px;padding:4px 0;color:#A2A2A2;font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:14px;line-height:52px;text-align:center;position:relative;display:inline-block}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .phone-tabs .tab,.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-main-content .phone-tabs .tab,.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-favorite-content .phone-tabs .tab,.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .phone-tabs .tab{font-family:'NanumGothicRegular ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .phone-tabs .tab:hover,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-main-content .phone-tabs .tab:hover,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-favorite-content .phone-tabs .tab:hover,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .phone-tabs .tab:hover{padding:4px 0 0;color:#A2A2A2;border-bottom:4px solid #424242}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .phone-tabs .tab.tab-active,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-main-content .phone-tabs .tab.tab-active,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-favorite-content .phone-tabs .tab.tab-active,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .phone-tabs .tab.tab-active{padding:4px 0 0;border-bottom:4px solid #696969;color:#FFF;font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .phone-tabs .tab.tab-active,.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-main-content .phone-tabs .tab.tab-active,.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-favorite-content .phone-tabs .tab.tab-active,.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .phone-tabs .tab.tab-active{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .phone-tabs .tab.new-video:after,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-main-content .phone-tabs .tab.new-video:after,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-favorite-content .phone-tabs .tab.new-video:after,.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .phone-tabs .tab.new-video:after{content:\"\";width:6px;height:6px;background:#EA0203;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;display:block;position:absolute;right:-7px;top:20px}.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-favorite-content .phone-tabs .tab[data-tab-type=stracka],.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-favorite .leaderboard-main-content .phone-tabs .tab[data-tab-type=stracka],.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-favorite-content .phone-tabs .tab[data-tab-type=stracka],.tournament-leaderboard-new-2 .leaderboard-container .leaderboard-main .leaderboard-main-content .phone-tabs .tab[data-tab-type=stracka]{display:none}.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-scroller{background-color:#424242;padding:55px 10px 10px;height:165px}.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-scroller .viewport{height:165px}.tournament-leaderboard-new-2 .leaderboard-container .play-by-play-scroller .viewport .overview{position:static}.tournament-leaderboard-new-2 .leaderboard-container .details-articles{padding:10px}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .article .article-title{margin:0 0 3px}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .article .article-text{font-size:15px;line-height:18px}.tournament-leaderboard-new-2 .leaderboard-container .details-articles .viewport{height:246px}.tournament-leaderboard-new-2 .leaderboard-container .legend-box{position:relative;padding:10px 0;height:34px}.tournament-leaderboard-new-2 .leaderboard-container .legend-box .legend{position:absolute;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") right -24px top -509px no-repeat;padding-right:20px;left:10px;top:17px;color:#E4E4E4!important;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:12px;line-height:18px;z-index:100}.locale-ko .tournament-leaderboard-new-2 .leaderboard-container .legend-box .legend{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-container .legend-box .legend:hover{color:#E4E4E4!important;text-decoration:none}.tournament-leaderboard-new-2 .message-outer{width:300px;margin-left:-150px}.tournament-leaderboard-new-2 .message-outer .message-inner .message-text{width:254px;padding:6px 0}.tournament-leaderboard-new-2 .leaderboard-footer .scoring span{display:block}.tournament-leaderboard-new-2 .leaderboard-footer #moversHighlight{display:none!important}.tournament-leaderboard-new-2 .leaderboard-footer .abbr{display:block}}@media (max-width:767px) and (max-width:359px){.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .sponsor-logo{display:none}}@media (max-width:320px){.tournament-leaderboard-new-2 .leaderboard-playoff-table table tbody tr td.player-hole{min-width:220px}.tournament-leaderboard-new-2 .leaderboard-playoff-table table tbody tr td.player-hole .sponsor-logo{display:none}}@media only screen and (min-device-width:320px) and (max-device-width:568px) and (orientation:landscape){.tournament-leaderboard-new-2 .leaderboard-playoff-table table tbody tr td.player-hole{min-width:270px}.tournament-leaderboard-new-2 .leaderboard-container table .col-player div .sponsor-logo,.tournament-leaderboard-new-2 .leaderboard-playoff-table table tbody tr td.player-hole .sponsor-logo{display:none}}.tournament-leaderboard-new-2 .leaderboard-item{position:relative}.tournament-leaderboard-new-2 .leaderboard-player-select{float:right}.tournament-leaderboard-new-2 .leaderboard-player-select span.customSelect{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") 7px -985px no-repeat #696969;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:13px;text-transform:uppercase;color:#E4E4E4;padding:5px 7px 5px 30px;border:1px solid #696969;-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;line-height:20px!important;height:20px!important;width:220px}.locale-ko .tournament-leaderboard-new-2 .leaderboard-player-select span.customSelect{font-family:'NanumGothicBold ',sans-serif}.tournament-leaderboard-new-2 .leaderboard-player-select span.customSelect.changed{background-color:#E4E4E4}.tournament-leaderboard-new-2 .leaderboard-player-select .hasCustomSelect{height:30px!important;width:259px}.tournament-leaderboard-new-2 .details-head-addition span.customSelect{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") 107px -750px no-repeat;border-radius:0;color:#E4E4E4;font-style:italic;height:29px!important;line-height:29px;padding:0 38px 0 9px;border:1px solid #696969;width:87px!important;text-align:left}.tournament-leaderboard-new-2 .details-head-addition .hasCustomSelect{height:31px!important;width:136px!important}.tournament-leaderboard-new-2 .map-view-select{margin-bottom:2px}.tournament-leaderboard-new-2 .map-view-select span.customSelect{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/page.tournament/tournament-leaderboard-new-2/img/sprite.png\") 89px -753px no-repeat;border-radius:0;color:#E4E4E4;font-style:italic;height:23px!important;line-height:23px;padding:0 38px 0 9px;border:1px solid #696969;width:67px!important;text-align:left}.tournament-leaderboard-new-2 .map-view-select .hasCustomSelect{height:25px!important;width:116px!important}.tournament-leaderboard-new-2 .leaderboard-header .header-ad-tee-off{display:block}@media (max-width:767px){.tournament-leaderboard-new-2 .leaderboard-header .header-ad-tee-off{display:none}}", ""])
        },
        "dYg+": function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.ExtendedWorkflows = o.ExtendedWorkflows || o.Workflows.extend({
                    start: function() {
                        this.context.dataLoader.loadLeaderboardMini(this.proxy(this.onLeaderboardMiniLoaded), this.proxy(this.onLeaderboardMiniLoadError)), this.context.dataLoader.loadTournamentSetupJson(), this.context.dataLoader.loadPlayerStatsJson(), setInterval(e.proxy(this.context.dataLoader.loadTournamentSetupJson, this.context.dataLoader), 1e3 * this.context.config.setupRefreshRate), setInterval(e.proxy(this.context.dataLoader.loadPlayerStatsJson, this.context.dataLoader), 1e3 * this.context.config.refreshRate)
                    },
                    firstLbLoad: function(e) {
                        r.PlayerNameTranslations.load(this.context.config.lbPlayerNameTranslator, this.proxy(this.processDataTranslationsLoaded, e))
                    },
                    processDataTranslationsLoaded: function(e) {
                        var t = this;
                        this.context.leaderboardModel.populateLbData(e), this.context.config.isProAm || this.context.config.hideDrawerAd ? this._processLeaderboard(!0) : this.context.dataLoader.loadSponsors(function() {
                            t.context.dataLoader.loadOCQS(function() {
                                t._processLeaderboard(!0)
                            })
                        }), this.context.dataLoader.loadMessage(), this.initHighlightLegendItem()
                    },
                    initLoadTimers: function() {
                        var e = this;
                        setInterval(function() {
                            e.context.dataLoader.loadLeaderboard(function(t) {
                                e.onLoadLeaderboard(t, !1)
                            })
                        }, 1e3 * this.context.config.refreshRate), setInterval(function() {
                            e.context.dataLoader.loadMediaIcons()
                        }, 1e3 * this.context.config.mediaRefreshRate)
                    },
                    onLeaderboardMiniLoaded: function(e) {
                        if (this.validateSetupYear(e)) {
                            this.firstLbLoad(e), this.context.leaderboardModel.lastUpdatedDate = null, this.context.dataLoader.loadMediaIcons();
                            var t = this;
                            this.context.dataLoader.loadLeaderboard(function(e) {
                                t.validateSetupYear(e) && e && (t.onLoadLeaderboard(e, !0), t.initLoadTimers())
                            })
                        }
                    },
                    onLeaderboardMiniLoadError: function() {
                        var e = this;
                        this.context.dataLoader.loadLeaderboard(function(t) {
                            e.validateSetupYear(t) && t && (e.firstLbLoad(t), e.context.leaderboardModel.lastUpdatedDate = null, e.context.dataLoader.loadMediaIcons(), e.onLoadLeaderboard(t, !0), e.initLoadTimers())
                        })
                    }
                })
            }(jQuery, window, pgatour)
        },
        erBK: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.LeaderboardContext = o.LeaderboardContext || r.BaseModule.extend({
                    controller: null,
                    utils: null,
                    message: null,
                    config: null,
                    drawersQueue: null,
                    playoff: null,
                    leaderboardModel: null,
                    leaderboardModal: null,
                    userModel: null,
                    dataLoader: null,
                    presenter: null,
                    favouritePresenter: null,
                    media: null,
                    tabsFactory: null,
                    workflow: null,
                    analytics: null,
                    customEventTracker: null,
                    constructor: function(e, t) {
                        this.config = new o.LeaderboardConfig(t), this.base(e)
                    },
                    init: function() {
                        this.base(), this.controller = new o.LeaderboardController(this), this.utils = new o.RenderUtils(this), this.message = new o.LeaderboardMessage(this), this.drawersQueue = new o.DrawersQueue(this), this.playoff = new o.Playoff(this), this.leaderboardModel = new o.LeaderboardModel(this), this.userModel = new o.UserModel(this), this.dataLoader = new o.DataLoader(this), this.presenter = new o.LeaderboardPresenter(this), this.favouritePresenter = new o.FavouriteLeaderboardPresenter(this), this.media = new o.MediaContent(this), this.tabsFactory = new o.TabsFactory(this), this.analytics = new o.Analytics(this), this.customEventTracker = new o.CustomEventTracker(this), this.leaderboardModal = r.drawerModal, this.leaderboardModal.bindContext(this), this.config.lbMiniJson ? this.workflows = new o.ExtendedWorkflows(this) : this.workflows = new o.Workflows(this), this.workflows.start()
                    }
                })
            }(jQuery, window, pgatour)
        },
        fupk: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.Workflows = o.Workflows || r.Base.extend({
                    context: null,
                    lastLeader: null,
                    constructor: function(e) {
                        this.base(), this.context = e
                    },
                    start: function() {
                        var e = this;
                        this.context.dataLoader.loadLeaderboard(function(t) {
                            e.onLoadLeaderboard(t, !0), e.context.dataLoader.loadMediaIcons(), e.initHighlightLegendItem()
                        }), setInterval(function() {
                            e.context.dataLoader.loadLeaderboard(function(t) {
                                e.onLoadLeaderboard(t, !1)
                            })
                        }, 1e3 * this.context.config.refreshRate), setInterval(function() {
                            e.context.dataLoader.loadMediaIcons()
                        }, 1e3 * this.context.config.mediaRefreshRate)
                    },
                    _processLeaderboard: function(e) {
                        this._processLeaderboardStage1(e);
                        var t = new r.leaderboard2.newlb.LeaderboardPlayerComparator(this.context, {
                                preference: this.context.userModel.sortPreference,
                                ascending: this.context.userModel.sortAscending
                            }),
                            o = this.context.leaderboardModel.getPlayers(t)[0];
                        o && this.context.config.openDrawersAtStartup && (this.context.userModel.addExpandedPlayer(o.player_id, !1), this.lastLeader = o.player_id);
                        var a = this.context.leaderboardModel.needToHighlightMovements();
                        this.context.presenter.enableHighlightLegendItem(a)
                    },
                    _processLeaderboardStage1: function(e) {
                        this.context.presenter.render(), (!this.context.config.useGigya || this.context.config.useGigya && !e) && this.context.favouritePresenter.renderPlayers(), this.context.favouritePresenter.renderDropDown(), this.lastLeader && this.context.controller.closeDrawer(this.lastLeader, !1), this.context.config.useGigya && !this.context.controller.gigyaInitialized && t.gigya && this.context.controller.initializeGigya()
                    },
                    initHighlightLegendItem: function() {
                        var e = this.context.config.movementHighlightsColor;
                        e && this.context.presenter.setHighlightLegendItemColor(e)
                    },
                    _openDrawers: function(e) {
                        e && !this.context.config.openDrawersAtStartup || (this._openDrawersForPlayers(), this._openDrawersForFavouritePlayers())
                    },
                    _openDrawersForPlayers: function() {
                        if (this.context.userModel.expandedPlayers && !this.context.config.isProAm)
                            for (var e in this.context.userModel.expandedPlayers) this.context.userModel.expandedPlayers.hasOwnProperty(e) && this.context.controller.openDrawer(e, !1, null)
                    },
                    _openDrawersForFavouritePlayers: function() {
                        if (this.context.userModel.favouriteExpandedPlayers && !this.context.config.isProAm)
                            for (var e in this.context.userModel.favouriteExpandedPlayers) this.context.userModel.favouriteExpandedPlayers.hasOwnProperty(e) && this.context.controller.openDrawer(e, !0, null)
                    },
                    parseMediaContent: function(e, t, r) {
                        if (e && e.expansion && e.expansion.tabs[t]) {
                            "videos" === t && (this._parseMediaContentVideos(r, e), e.renderVideoRow());
                            for (var o = 0; o < e.expansion.tabs[t].length; o++) e.expansion.tabs[t][o] && e.expansion.tabs[t][o].renderContent && e.expansion.tabs[t][o].renderContent(r);
                            if ("videos" === t)
                                for (var a = Object.keys(e.expansion.tabs), n = 0; n < a.length; n++)
                                    for (var i = 0; i < r.items.length; i++) this._initHoleVideo(r.items[i], e, a[n])
                        }
                    },
                    _parseMediaContentVideos: function(e, t) {
                        for (var o, a = 0; a < e.items.length; a++) {
                            var n = e.items[a];
                            (o = n["livefyre-comments"]) && (n._lfId = o.articleId, n._lfMeta = o.collectionMeta, n._lfChecksum = o.checksum, n._lfSiteId = o.siteId), n.tags && Array.isArray(n.tags) && (n.tags = n.tags.join(",")), n.duration && r.videoPlayer && (n.formattedDuration = r.videoPlayer.formatVideoDuration(n.duration))
                        }
                        t.videos = e
                    },
                    validateSetupYear: function(e) {
                        if (this.context.config.noDataDefaultMessage) {
                            var t = "";
                            return e && e.debug && e.debug.setup_year && (t = e.debug.setup_year), t === this.context.config.setupYear || (this.context.presenter.showDataNotAvailable(), !1)
                        }
                        return !0
                    },
                    _initHoleVideo: function(e, t, r) {
                        for (var o, a, n = Array.isArray(e.tags) ? e.tags : e.tags.split(","), i = 0; i < n.length; i++) 0 === n[i].indexOf("PGATOUR:Holes/hole") && (o = parseInt(n[i].substring("PGATOUR:Holes/hole".length), 10)), 0 === n[i].indexOf("PGATOUR:Rounds/round") && (a = parseInt(n[i].substring("PGATOUR:Rounds/round".length), 10));
                        o && e.videoId && a && this._updatedScorecardTabs(t.expansion.tabs[r], a, o, e.videoId)
                    },
                    _updatedScorecardTabs: function(e, t, r, o) {
                        if (e)
                            for (var a = 0; a < e.length; a++) e[a].initHoleVideo && e[a].initHoleVideo(t, r, o)
                    },
                    onLoadLeaderboard: function(e, t) {
                        this.context.leaderboardModel.populateLbData(e) && (r.strackaCourse = null, this.context.config.isProAm || this.context.config.hideDrawerAd ? (this._processLeaderboard(t), this._openDrawers(t)) : this.context.dataLoader.loadSponsors(this.proxy(this.onLoadSponsors, t))), this.context.dataLoader.loadPlayoff(), this.context.dataLoader.loadMessage(), this.context.dataLoader.loadBroadcasts()
                    },
                    onLoadSponsors: function(e) {
                        this.context.dataLoader.loadOCQS(this.proxy(this.onLoadOCQS, e))
                    },
                    onLoadOCQS: function(e) {
                        this._processLeaderboard(e), this._openDrawers(e)
                    }
                }), o.Workflows.LIVE_AT_CATEGORY = "Live@"
            }(jQuery, window, pgatour)
        },
        fuq9: function(e, t, r) {
            var o = r("Y9UD");
            "string" == typeof o && (o = [
                [e.i, o, ""]
            ]);
            var a = {
                hmr: !0,
                transform: void 0,
                insertInto: void 0
            };
            r("aET+")(o, a);
            o.locals && (e.exports = o.locals)
        },
        gQ2p: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.LeaderboardMessage = o.LeaderboardMessage || r.Base.extend({
                    MESSAGE_CONTAINER: "#lbnLeaderboardMessageBlock",
                    context: null,
                    container: null,
                    constructor: function(e) {
                        this.base(), this.context = e, this.container = this.context.config.getOrCreate(this.MESSAGE_CONTAINER)
                    },
                    getWeatherSponsor: function(e, t) {
                        var r = JSPath.apply('.tournaments {.tournamentNumber == "' + t + '"}', e);
                        if (r.length) return r[0]
                    },
                    processMessage: function(t, r) {
                        var o, a, n = "";
                        if (t && t.notes && t.tc === this.context.leaderboardModel.tourCode && t.tid0.indexOf(this.context.leaderboardModel.tournamentId) > -1)
                            for (var i = 0; i < t.notes.length; i++)(o = t.notes[i]).active && "y" === o.active.toLowerCase() && e(o.html).html() && (n += o.html);
                        a = this.context.leaderboardModel.tourCode + this.context.leaderboardModel.tournamentId;
                        var d = this.getWeatherSponsor(r, a);
                        e.trim(n) ? (this.container.find(".message").html(n), this.updateSponsorLogo(d), this.container.show()) : this.container.hide()
                    },
                    updateSponsorLogo: function(e) {
                        var t = this.container.find(".weather-sponsor-logo");
                        e && e.alertImage && (e.WeatherHubLink && this.container.find("a").attr("href", e.WeatherHubLink), t.attr("src", e.alertImage));
                        var r = !(!e || !e.alertImage);
                        this.container.toggleClass("show-sponsor-logo", r)
                    }
                })
            }(jQuery, window, pgatour)
        },
        gZ5a: function(e, t) {
            ! function(e, t, r) {
                r.shottracker.model.ShotModel = r.Base.extend({
                    _data: null,
                    vector: null,
                    distance: 0,
                    distanceLeft: 0,
                    fromLocation: null,
                    toLocation: null,
                    location: null,
                    isPutt: !1,
                    isInCup: !1,
                    isPenalty: !1,
                    colourIndex: null,
                    constructor: function(e) {
                        this._data = e, this.vector = new r.shottracker.math.Vector3(parseFloat(e.x), parseFloat(e.y), parseFloat(e.z)), this.distance = parseFloat(e.distance), this.distanceLeft = parseFloat(e.left), this.fromLocation = e.from, this.toLocation = e.to, this.location = this.toLocation || this.fromLocation, this.isPutt = e.putt, this.isInCup = e.cup, this.isPenalty = -1 !== r.getItemIndex(["PNL", "OWD"], this.location), this.colourIndex = void 0 === e.colourIndex ? null : e.colourIndex
                    },
                    getLocationName: function(e) {
                        return r.shottracker.model.ShotModel.getLocations()[e] || "Unknown"
                    },
                    getMessage: function(e) {
                        var t;
                        if (this.isInCup) t = r.feetAndInchesFromInches(this.distance) + " - in the hole";
                        else if (this.isPenalty) t = "Penalty Stroke";
                        else if ("TEE" === this.location) t = "Waiting to tee off";
                        else {
                            var o = this.isPutt ? " putt" : " to " + this.getLocationName(this.location);
                            t = (this.isPutt ? r.feetAndInchesFromInches(this.distance) : r.yardsFromInches(this.distance)) + o + ", " + (e ? r.feetAndInchesFromInches(this.distanceLeft) : r.yardsFromInches(this.distanceLeft)) + " to hole"
                        }
                        return t
                    }
                }, {
                    locationValues: ["OUK|Unknown", "OTL|Tee Left", "OTC|Tee Center", "OTR|Tee Right", "OFW|Fairway", "ORO|Primary Rough", "OBD|Building", "OGS|Green Side Bunker", "ONA|Native Area", "OGB|Grass Bunker", "OWA|Water", "OBR|Bridge", "OCO|Fringe", "OGR|Green", "OCA|Cart Path", "OTH|Other", "ODO|Dirt Outline", "OIR|Intermediate Rough", "OLN|Landscaping", "OPT|Path", "OST|Fairway Bunker", "OTB|Tee Box", "OTO|Tree Outline", "OWB|Waste Bunker", "OWL|Wall", "OWS|Walk Strip", "OBO|Bush", "ORK|Rock Outline", "OSS|Step", "OWD|Water Drop", "ATG|Around the Green", "ELR|Left Rough", "ERR|Right Rough", "ELI|Left Intermediate", "ERI|Right Intermediate", "ELF|Left Fairway", "ERF|Right Fairway", "EG4|Front Center Green Side Bunker", "EG5|Front Left Green Side Bunker", "EG6|Left Green Side Bunker", "EG7|Left Rear Green Side Bunker", "EG8|Rear Green Side Bunker", "EG1|Right Rear Green Side Bunker", "EG2|Right Green Side Bunker", "EG3|Right Front Green Side Bunker", "T01|TV Zone 1", "T02|TV Zone 2", "T03|TV Zone 3", "T04|TV Zone 4", "T05|TV Zone 5", "T06|TV Zone 6", "T07|TV Zone 7", "T08|TV Zone 8", "T09|TV Zone 9", "T10|TV Zone 10", "T11|TV Zone 11", "T12|TV Zone 12", "T13|TV Zone 13", "T14|TV Zone 14", "T15|TV Zone 15", "T16|TV Zone 16", "T17|TV Zone 17", "T18|TV Zone 18", "T19|TV Zone 19", "T20|TV Zone 20", "T21|TV Zone 21", "T22|TV Zone 22", "T23|TV Zone 23", "T24|TV Zone 24", "T25|TV Zone 25", "P|Pin l", "name|Tee l", "CA|Fairway Center Pt A", "CB|Fairway Center Pt B", "F25|250 Yards", "F27|275 Yards", "F30|300 Yards", "F32|325 Yards", "F35|350 Yards", "EUK|Unknown", "PNL|Penalty"],
                    addLocationValue: function(e, t) {
                        var r = t.split("|");
                        this.locations[r[0]] = r[1]
                    },
                    createFromTee: function(e) {
                        return new r.shottracker.model.ShotModel({
                            x: e.x,
                            y: e.y,
                            z: e.z,
                            from: "TEE",
                            to: null,
                            distance: 0,
                            left: 0,
                            putt: null,
                            cup: !1
                        })
                    },
                    getLocations: function() {
                        return this.locations || (this.locations = {}, t.each(this.locationValues, t.proxy(this.addLocationValue, this))), this.locations
                    }
                })
            }(window, jQuery, pgatour)
        },
        h3Hl: function(e, t) {
            (function() {
                /*! jsviews.js v1.0.0-alpha single-file version:
                includes JsRender, JsObservable and JsViews  http://github.com/BorisMoore/jsrender and http://jsviews.com/jsviews
                informal pre V1.0 commit counter: 63 (Beta Candidate) */
                ! function(e, t, r) {
                    "use strict";
                    if (!(t && t.render || e.jsviews)) {
                        var o, a, n, i, d, s = "{",
                            l = "{",
                            c = "}",
                            h = "}",
                            p = "^",
                            u = /^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
                            m = /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(!*?[#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?[#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=\s*[.^]|\s*$|[^\(\[])|[)\]])([([]?))|(\s+)/g,
                            b = /[ \t]*(\r\n|\n|\r)/g,
                            f = /\\(['"])/g,
                            g = /['"\\]/g,
                            w = /(?:\x08|^)(onerror:)?(?:(~?)(([\w$]+):)?([^\x08]+))\x08(,)?([^\x08]+)/gi,
                            x = /^if\s/,
                            y = /<(\w+)[>\s]/,
                            v = /[\x00`><\"'&]/,
                            k = /^on[A-Z]|^convert(Back)?$/,
                            _ = /[\x00`><"'&]/g,
                            T = 0,
                            E = 0,
                            C = {
                                "&": "&amp;",
                                "<": "&lt;",
                                ">": "&gt;",
                                "\0": "&#0;",
                                "'": "&#39;",
                                '"': "&#34;",
                                "`": "&#96;"
                            },
                            R = "html",
                            S = "object",
                            A = "data-jsv-tmpl",
                            P = {},
                            L = {
                                template: {
                                    compile: function o(a, n, d, s) {
                                        function l(n) {
                                            if ("" + n === n || n.nodeType > 0) {
                                                try {
                                                    h = n.nodeType > 0 ? n : !i.test(n) && t && t(e.document).find(n)[0]
                                                } catch (e) {}
                                                return h && ((n = B[a = a || h.getAttribute(A)]) || (a = a || "_" + T++, h.setAttribute(A, a), n = B[a] = o(a, h.innerHTML, d, s)), h = r), n
                                            }
                                        }
                                        var c, h;
                                        n = n || "";
                                        c = l(n);
                                        s = s || (n.markup ? n : {});
                                        s.tmplName = a;
                                        d && (s._parentTmpl = d);
                                        !c && n.markup && (c = l(n.markup)) && (!c.fn || c.debug === n.debug && c.allowCode === n.allowCode || (c = c.markup));
                                        if (c !== r) return a && !d && (P[a] = function() {
                                                return n.render.apply(n, arguments)
                                            }), c.fn || n.fn ? c.fn && (n = a && a !== c.tmplName ? me(s, c) : c) : (n = te(c, s), se(c.replace(g, "\\$&"), n)),
                                            function(e) {
                                                var t, r, o, a, n, i, d;
                                                for (t in L)
                                                    if (n = L[t], (i = n.compile) && (r = e[t + "s"]))
                                                        for (o in r)(a = r[o] = i(o, r[o], e)) && (d = D.onStore[t]) && d(o, a, i)
                                            }(s), n
                                    }
                                },
                                tag: {
                                    compile: function(e, t, o) {
                                        var a, n, i, d, s = new D._tg;
                                        $(t) && (t = {
                                            depends: t.depends,
                                            render: t
                                        });
                                        if (i = t.baseTag)
                                            for (d in t.flow = !!t.flow, t.baseTag = i = "" + i === i ? o && o.tags[i] || N[i] : i, s = q(s, i), t) s[d] = V(i[d], t[d]);
                                        else s = q(s, t);
                                        (n = s.template) !== r && (s.template = "" + n === n ? B[n] || B(n) : n);
                                        !1 !== s.init && (((a = s._ctr = function() {}).prototype = s).constructor = a);
                                        o && (s._parentTmpl = o);
                                        return s
                                    }
                                },
                                helper: {},
                                converter: {}
                            },
                            M = {
                                jsviews: "v1.0.0-beta",
                                settings: function(e) {
                                    q(F, e), Y(F._dbgMode), F.jsv && F.jsv()
                                },
                                sub: {
                                    View: Z,
                                    Err: W,
                                    tmplFn: se,
                                    cvt: J,
                                    parse: pe,
                                    extend: q,
                                    syntaxErr: de,
                                    onStore: {},
                                    _ths: z,
                                    _tg: function() {}
                                },
                                map: ee,
                                _cnvt: function(e, t, o, a) {
                                    var n, i, d = +o === o && t.tmpl.bnds[o - 1],
                                        s = t.linkCtx;
                                    o = (a = a !== r && {
                                        props: {},
                                        args: [a]
                                    }) || (d ? d(t.data, t, M) : o), i = o.args[0], (e || d) && ((n = s && s.tag) || (n = q(new D._tg, {
                                        _: {
                                            inline: !s,
                                            bnd: d,
                                            unlinked: !0
                                        },
                                        tagName: ":",
                                        cvt: e,
                                        flow: !0,
                                        tagCtx: o
                                    }), s && (s.tag = n, n.linkCtx = s), o.ctx = me(o.ctx, (s ? s.view : t).ctx)), n._er = a && i, z(n, o), o.view = t, n.ctx = o.ctx || {}, delete o.ctx, t._.tag = n, i = J(n, n.convert || "true" !== e && e)[0], i = d && t._.onRender ? t._.onRender(i, t, d) : i, t._.tag = r);
                                    return i != r ? i : ""
                                },
                                _tag: function(e, t, o, a, n, i) {
                                    var d, s, l, c, h, p, u, m, b, f, g, w, x, y, v, k, _, T = "",
                                        E = t.linkCtx || 0,
                                        C = t.ctx,
                                        S = o || t.tmpl,
                                        A = +a === a && S.bnds[a - 1];
                                    "tag" === e._is && (e = (d = e).tagName, a = d.tagCtxs);
                                    for (d = d || E.tag, i = i !== r && (T += i, [{
                                            props: {},
                                            args: []
                                        }]), a = i || (A ? A(t.data, t, M) : a), p = a.length, h = 0; h < p; h++) h || o && d || (g = t.getRsc("tags", e) || ie("Unknown tag: {{" + e + "}}")), m = a[h], (!E.tag || h && !E.tag._.inline || d._er) && (f = m.tmpl, f = m.content = f && S.tmpls[f - 1], q(m, {
                                        tmpl: (d || g).template || f,
                                        render: ne,
                                        index: h,
                                        view: t,
                                        ctx: me(m.ctx, C)
                                    })), (o = m.props.tmpl) && (o = "" + o === o ? t.getRsc("templates", o) || B(o) : o, m.tmpl = o), d || (d = new g._ctr, w = !!d.init, d._ = {
                                        inline: !E,
                                        unlinked: !0
                                    }, E && (E.tag = d, d.linkCtx = E), (d._.bnd = A || E.fn) ? d._.arrVws = {} : d.dataBoundOnly && ie("{^{" + e + "}} tag must be data-bound"), d.tagName = e, d.parent = c = C && C.tag, d._def = g, d.tagCtxs = a), m.tag = d, d.dataMap && d.tagCtxs && (m.map = d.tagCtxs[h].map), d.flow || (b = m.ctx = m.ctx || {}, s = d.parents = b.parentTags = C && me(b.parentTags, C.parentTags) || {}, c && (s[c.tagName] = c), s[d.tagName] = b.tag = d);
                                    if (t._.tag = d, !(d._er = i)) {
                                        for (z(d, a[0]), d.rendering = {}, h = 0; h < p; h++) m = d.tagCtx = d.tagCtxs[h], k = m.props, v = J(d, d.convert), (x = k.dataMap || d.dataMap) && (v.length || k.dataMap) && ((y = m.map) && y.src === v[0] && !n || (y && y.src && y.unmap(), y = m.map = x.map(v[0], k)), v = [y.tgt]), d.ctx = m.ctx, !h && w && (_ = d.template, d.init(m, E, d.ctx), w = r, d.template !== _ && (d._.tmpl = d.template)), E && (E.attr = d.attr = E.attr || d.attr), u = r, d.render && (u = d.render.apply(d, v)), v = v.length ? v : [t], u = u !== r ? u : m.render(v[0], !0) || (n ? r : ""), T = T ? T + (u || "") : u;
                                        delete d.rendering
                                    }
                                    d.tagCtx = d.tagCtxs[0], d.ctx = d.tagCtx.ctx, d._.inline && (l = d.attr) && l !== R && (T = "text" === l ? O.html(T) : "");
                                    return A && t._.onRender ? t._.onRender(T, t, A) : T
                                },
                                _err: ie
                            };
                        for (a in (W.prototype = new Error).constructor = W, Q.depends = function() {
                                return [this.get("item"), "index"]
                            }, X.depends = "index", Z.prototype = {
                                get: function(e, t) {
                                    t || (t = e, e = r);
                                    var o, a, n, i, d = this,
                                        s = !t || "root" === t;
                                    if (e) {
                                        if (!(i = d.type === t ? d : r))
                                            if (o = d.views, d._.useKey) {
                                                for (a in o)
                                                    if (i = o[a].get(e, t)) break
                                            } else
                                                for (a = 0, n = o.length; !i && a < n; a++) i = o[a].get(e, t)
                                    } else if (s)
                                        for (; d.parent.parent;) i = d = d.parent;
                                    else
                                        for (; d && !i;) i = d.type === t ? d : r, d = d.parent;
                                    return i
                                },
                                getIndex: X,
                                getRsc: function(e, t) {
                                    for (var o, a, n = this; o === r && n;) o = (a = n.tmpl[e]) && a[t], n = n.parent;
                                    return o || M[e][t]
                                },
                                hlp: function(t) {
                                    var o, a = this,
                                        n = a.linkCtx,
                                        i = (a.ctx || {})[t];
                                    return i === r && n && n.ctx && (i = n.ctx[t]), i === r && (i = I[t]), i && $(i) && !i._wrp && ((o = function() {
                                        return i.apply(this && this !== e ? this : a, arguments)
                                    })._wrp = !0, q(o, i)), o || i
                                },
                                _is: "view"
                            }, L) re(a, L[a]);
                        var B = M.templates,
                            O = M.converters,
                            I = M.helpers,
                            N = M.tags,
                            D = M.sub,
                            F = M.settings;
                        D._tg.prototype = {
                            baseApply: function(e) {
                                return this.base.apply(this, e)
                            }
                        }, t ? ((o = t).fn.render = function(e, t, r) {
                            var o = this.jquery && (this[0] || ie('Unknown template: "' + this.selector + '"')),
                                a = o.getAttribute(A);
                            return ae.call(a ? B[a] : B(o), e, t, r)
                        }, o.observable && (q(D, o.views.sub), M.map = o.views.map)) : (o = e.jsviews = {}).isArray = Array.isArray || function(e) {
                            return "[object Array]" === o.toString.call(e)
                        }, o.render = P, o.views = M, o.templates = B = M.templates, F({
                            debugMode: Y,
                            delimiters: K,
                            onError: function(e, t, o) {
                                return t && (e = o === r ? "{Error: " + (e.message || e) + "}" : $(o) ? o(e, t) : o), e == r ? "" : e
                            },
                            _dbgMode: !0
                        }), N({
                            else: function() {},
                            if: {
                                render: function(e) {
                                    return this.rendering.done || !e && (arguments.length || !this.tagCtx.index) ? "" : (this.rendering.done = !0, this.selected = this.tagCtx.index, this.tagCtx.render(this.tagCtx.view, !0))
                                },
                                flow: !0
                            },
                            for: {
                                render: function(e) {
                                    var t, a = this.tagCtx,
                                        n = "",
                                        i = 0;
                                    return this.rendering.done || ((t = !arguments.length) && (e = a.view.data), e !== r && (n += a.render(e, t), i += o.isArray(e) ? e.length : 1), (this.rendering.done = i) && (this.selected = a.index)), n
                                },
                                flow: !0
                            },
                            props: {
                                baseTag: "for",
                                dataMap: ee(function(e) {
                                    var t, r, o = [];
                                    if (typeof e === S)
                                        for (t in e)(r = e[t]) && r.toJSON && !r.toJSON() || $(r) || o.push({
                                            key: t,
                                            prop: r
                                        });
                                    return o
                                })
                            },
                            include: {
                                flow: !0
                            },
                            "*": {
                                render: G,
                                flow: !0
                            }
                        }), O({
                            html: fe,
                            attr: fe,
                            url: function(e) {
                                return e != r ? encodeURI("" + e) : null === e ? e : ""
                            }
                        }), K()
                    }

                    function H(e, t) {
                        return function() {
                            var r, o = this.base;
                            return this.base = e, r = t.apply(this, arguments), this.base = o, r
                        }
                    }

                    function V(e, t) {
                        return $(t) && ((t = H(e ? e._d ? e : H(U, e) : U, t))._d = 1), t
                    }

                    function z(e, t) {
                        for (var r in t.props) k.test(r) && (e[r] = V(e[r], t.props[r]))
                    }

                    function G(e) {
                        return e
                    }

                    function U() {
                        return ""
                    }

                    function j(e) {
                        return this.base ? this.baseApply(arguments) : e
                    }

                    function Y(e) {
                        F._dbgMode = e, d = e ? "Unavailable (nested view): use #getIndex()" : "", N("dbg", I.dbg = O.dbg = e ? j : G)
                    }

                    function W(e) {
                        this.name = (o.link ? "JsViews" : "JsRender") + " Error", this.message = e || this.name
                    }

                    function q(e, t) {
                        var r;
                        for (r in t) e[r] = t[r];
                        return e
                    }

                    function $(e) {
                        return "function" == typeof e
                    }

                    function K(e, t, r) {
                        return D.rTag && !e || (s = e ? e.charAt(0) : s, l = e ? e.charAt(1) : l, c = t ? t.charAt(0) : c, h = t ? t.charAt(1) : h, e = "\\" + s + "(\\" + (p = r || p) + ")?\\" + l, t = "\\" + c + "\\" + h, n = "(?:(?:(\\w+(?=[\\/\\s\\" + c + "]))|(?:(\\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\\*)))\\s*((?:[^\\" + c + "]|\\" + c + "(?!\\" + h + "))*?)", D.rTag = n + ")", n = new RegExp(e + n + "(\\/)?|(?:\\/(\\w+)))" + t, "g"), i = new RegExp("<.*>|([^\\\\]|^)[{}]|" + e + ".*" + t)), [s, l, c, h, p]
                    }

                    function Q() {
                        var e = this.get("item");
                        return e ? e.index : r
                    }

                    function X() {
                        return this.index
                    }

                    function J(e, t) {
                        var r = e.tagCtx,
                            o = r.view,
                            a = r.args;
                        return t = t && ("" + t === t ? o.getRsc("converters", t) || ie("Unknown converter: '" + t + "'") : t), a = a.length || r.index ? t ? a.slice() : a : [o.data], t && (t.depends && (e.depends = D.getDeps(e.depends, e, t.depends, t)), a[0] = t.apply(e, a)), a
                    }

                    function Z(e, t, r, o, a, n, i, s) {
                        var l, c, h, p = "array" === t,
                            u = {
                                key: 0,
                                useKey: p ? 0 : 1,
                                id: "" + E++,
                                onRender: s,
                                bnds: {}
                            };
                        this.data = o, this.tmpl = a, this.content = i, this.views = p ? [] : {}, this.parent = r, this.type = t || "top", this._ = u, this.linked = !!s, r ? (l = r.views, (c = r._).useKey ? (l[u.key = "_" + c.useKey++] = this, this.index = d, this.getIndex = Q, h = c.tag, u.bnd = p && (!h || !!h._.bnd && h)) : l.splice(u.key = this.index = n, 0, this), this.ctx = e || r.ctx) : this.ctx = e
                    }

                    function ee(e) {
                        return $(e) && (e = {
                            getTgt: e
                        }), e.baseMap && (e = q(q({}, e.baseMap), e)), e.map = function(t, r) {
                            return new function(t, r) {
                                this.tgt = e.getTgt(t, r)
                            }(t, r)
                        }, e
                    }

                    function te(e, t) {
                        var r, a = F.wrapMap || {},
                            n = q({
                                markup: e,
                                tmpls: [],
                                links: {},
                                tags: {},
                                bnds: [],
                                _is: "template",
                                render: ae
                            }, t);
                        return t.htmlTag || (r = y.exec(e), n.htmlTag = r ? r[1].toLowerCase() : ""), (r = a[n.htmlTag]) && r !== a.div && (n.markup = o.trim(n.markup)), n
                    }

                    function re(e, t) {
                        var o = e + "s";
                        M[o] = function a(n, i, d) {
                            var s, l, c, h;
                            if (n && typeof n === S && !n.nodeType && !n.markup && !n.getTgt) {
                                for (c in n) a(c, n[c], i);
                                return M
                            }
                            return i === r && (i = n, n = r), n && "" + n !== n && (d = i, i = n, n = r), h = d ? d[o] = d[o] || {} : a, l = t.compile, null === i ? n && delete h[n] : (i = l ? i = l(n, i, d) : i, n && (h[n] = i)), l && i && (i._is = e), i && (s = D.onStore[e]) && s(n, i, l), i
                        }, L[e] = t
                    }

                    function oe(e, t, r) {
                        if (F._dbgMode) try {
                            return e.fn(t, r, M)
                        } catch (e) {
                            return ie(e, r)
                        }
                        return e.fn(t, r, M)
                    }

                    function ae(e, t, r, a, n, i) {
                        return a || !this.fn._nvw || o.isArray(e) ? ne.call(this, e, t, r, a, n, i) : oe(this, e, {
                            tmpl: this
                        })
                    }

                    function ne(e, t, a, n, i, d) {
                        function s(e) {
                            (_ = q({}, t))[k] = e
                        }
                        var l, c, h, p, u, m, b, f, g, w, x, y, v, k, _, T = this,
                            E = "";
                        if (!!t === t && (a = t, t = r), typeof t !== S && (t = r), !0 === i && (m = !0, i = 0), T.tag ? (b = T, g = (T = T.tag)._, x = T.tagName, y = g.tmpl || b.tmpl, g.noVws = v = T.attr && T.attr !== R, t = me(t, T.ctx), f = b.content, !1 === b.props.link && ((t = t || {}).link = !1), n = n || b.view, (k = b.props.itemVar) && ("~" !== k.charAt(0) && de("Use itemVar='~myItem'"), k = k.slice(1)), e = arguments.length ? e : n) : y = T, y && (!n && e && "view" === e._is && (n = e), n && (f = f || n.content, d = d || n._.onRender, e === n && (e = n.data), t = me(t, n.ctx)), n && "top" !== n.type || ((t = t || {}).root = e), y.fn || (y = B[y] || B(y)), y)) {
                            if (w = d = !1 !== (t && t.link) && !v && d, !0 === d && (w = r, d = n._.onRender), t = y.helpers ? me(y.helpers, t) : t, _ = t, o.isArray(e) && !a)
                                for (h = m ? n : i !== r && n || new Z(t, "array", n, e, y, i, f, d), k && (h.it = k), k = h.it, l = 0, c = e.length; l < c; l++) k && s(e[l]), p = new Z(_, "item", h, e[l], y, (i || 0) + l, f, d), u = oe(y, e[l], p), E += h._.onRender ? h._.onRender(u, p) : u;
                            else k && s(e), h = m ? n : new Z(_, x || "data", n, e, y, i, f, d), g && !T.flow && (h.tag = T), E += oe(y, e, h);
                            return w ? w(E, h) : E
                        }
                        return ""
                    }

                    function ie(e, t, r) {
                        var o = F.onError(e, t, r);
                        if ("" + e === e) throw new D.Err(o);
                        return !t.linkCtx && t.linked ? O.html(o) : o
                    }

                    function de(e) {
                        ie("Syntax error\n" + e)
                    }

                    function se(e, t, r, o, a) {
                        function i(t) {
                            (t -= g) && v.push(e.substr(g, t).replace(b, "\\n"))
                        }

                        function d(t) {
                            t && de('Unmatched or missing tag: "{{/' + t + '}}" in template:\n' + e)
                        }
                        var l, c, p, u = t && t.allowCode,
                            m = [],
                            g = 0,
                            y = [],
                            v = m,
                            _ = [, , m];
                        return r && (e = s + e + h), d(y[0] && y[0][2].pop()[0]), e.replace(n, function(n, s, l, h, m, T, E, C, S, A, P, L) {
                            T && (m = ":", h = R), A = A || r && !a;
                            var M = (s || r) && [
                                    []
                                ],
                                B = "",
                                O = "",
                                I = "",
                                N = "",
                                D = "",
                                F = "",
                                H = "",
                                V = "",
                                z = !A && !m && !E;
                            l = l || (S = S || "#data", m), i(L), g = L + n.length, C ? u && v.push(["*", "\n" + S.replace(f, "$1") + "\n"]) : l ? ("else" === l && (x.test(S) && de('for "{{else if expr}}" use "{{else expr}}"'), M = _[7] && [
                                []
                            ], _[8] = e.substring(_[8], L), _ = y.pop(), v = _[2], z = !0), S && pe(S.replace(b, " "), M, t).replace(w, function(e, t, r, o, a, n, i, d) {
                                return i ? (O += n + ",", N += "'" + d + "',") : r ? (I += o + n + ",", F += o + "'" + d + "',") : t ? H += n : ("trigger" === a && (V += n), B += o + n + ",", D += o + "'" + d + "',", p = p || k.test(a)), ""
                            }).slice(0, -1), M && M[0] && M.pop(), c = [l, h || !!o || p || "", z && [], ce(N, D, F), ce(O, B, I), H, V, M || 0], v.push(c), z && (y.push(_), (_ = c)[8] = g)) : P && (d(P !== _[0] && "else" !== _[0] && P), _[8] = e.substring(_[8], L), _ = y.pop()), d(!_ && P), v = _[2]
                        }), i(e.length), (g = m[m.length - 1]) && d("" + g !== g && +g[8] === g[8] && g[0]), r ? le(l = ue(m, e, r), [m[0][7]]) : l = ue(m, t), l._nvw && (l._nvw = !/[~#]/.test(e)), l
                    }

                    function le(e, t) {
                        var r, o, a = 0,
                            n = t.length;
                        for (e.deps = []; a < n; a++)
                            for (r in o = t[a]) "_jsvto" !== r && o[r].length && (e.deps = e.deps.concat(o[r]));
                        e.paths = o
                    }

                    function ce(e, t, r) {
                        return [e.slice(0, -1), t.slice(0, -1), r.slice(0, -1)]
                    }

                    function he(e, t) {
                        return "\n\t" + (t ? t + ":{" : "") + "args:[" + e[0] + "]" + (e[1] || !t ? ",\n\tprops:{" + e[1] + "}" : "") + (e[2] ? ",\n\tctx:{" + e[2] + "}" : "")
                    }

                    function pe(e, t, r) {
                        var o, a, n, i, d, s = t && t[0],
                            h = {
                                bd: s
                            },
                            p = {
                                0: h
                            },
                            b = 0,
                            f = r ? r.links : s && (s.links = s.links || {}),
                            g = 0,
                            w = {},
                            x = {};
                        return (e + (r ? " " : "")).replace(m, function(m, y, v, k, _, T, E, C, R, S, A, P, L, M, B, O, I, N, D, F) {
                            var H, V, z, G, U;
                            if ((k = s && k) && !C && (_ = k + _), T = T || "", v = v || y || P, _ = _ || R, S = S || I || "", !E || d || i) {
                                if (s && O && !d && !i && (!o || n || a) && (H = x[g - 1], F.length - 1 > D - (H || 0))) {
                                    if (H = F.slice(H, D + m.length), !0 !== V)
                                        if (z = a || p[g - 1].bd, (G = z[z.length - 1]) && G.prm) {
                                            for (; G.sb && G.sb.prm;) G = G.sb;
                                            U = G.sb = {
                                                path: G.sb,
                                                bnd: G.bnd
                                            }
                                        } else z.push(U = {
                                            path: z.pop()
                                        });
                                        (V = f[O = l + ":" + H + " onerror=''" + c]) || (f[O] = !0, f[O] = V = se(O, r, !0)), !0 !== V && U && (U._jsv = V, U.prm = h.bd, U.bnd = U.bnd || U.path && U.path.indexOf("^") >= 0)
                                }
                                return d ? (d = !L) ? m : '"' : i ? (i = !M) ? m : '"' : (v ? (x[g] = D++, h = p[++g] = {
                                    bd: []
                                }, v) : "") + (N ? g ? "" : (b = F.slice(b, D), (o ? (o = n = a = !1, "\b") : "\b,") + b + (b = D + m.length, s && t.push(h.bd = []), "\b")) : C ? (g && de(e), s && t.pop(), o = _, n = k, b = D + m.length, k && (s = h.bd = t[o] = []), _ + ":") : _ ? _.split("^").join(".").replace(u, function(e, r, n, i, d, l, c, p) {
                                    var u = "." === n;
                                    if (n && (_ = _.slice(r.length), u || (e = (i ? 'view.hlp("' + i + '")' : d ? "view" : "data") + (p ? (l ? "." + l : i ? "" : d ? "" : "." + n) + (c || "") : (p = i ? "" : d ? l || "" : n, "")), e = r + ("view.data" === (e += p ? "." + p : "").slice(0, 9) ? e.slice(5) : e)), s)) {
                                        if (z = "linkTo" === o ? a = t._jsvto = t._jsvto || [] : h.bd, G = u && z[z.length - 1]) {
                                            if (G._jsv) {
                                                for (; G.sb;) G = G.sb;
                                                G.bnd && (_ = "^" + _.slice(1)), G.sb = _, G.bnd = G.bnd || "^" === _.charAt(0)
                                            }
                                        } else z.push(_);
                                        x[g] = D + (u ? 1 : 0)
                                    }
                                    return e
                                }) + (S ? (h = p[++g] = {
                                    bd: []
                                }, w[g] = !0, S) : T) : T || (B ? (w[g] = !1, h = p[--g], B + (S ? (h = p[++g], w[g] = !0, S) : "")) : A ? (w[g] || de(e), ",") : y ? "" : (d = L, i = M, '"')))
                            }
                            de(e)
                        })
                    }

                    function ue(e, t, o) {
                        var a, n, i, d, s, l, c, h, p, u, m, g, w, x, y, v, k, _, T, E, C, S, A, P, L, M, B, O, I, N, D = 0,
                            F = "",
                            H = {},
                            V = e.length;
                        for ("" + t === t ? (_ = o ? 'data-link="' + t.replace(b, " ").slice(1, -1) + '"' : t, t = 0) : (_ = t.tmplName || "unnamed", t.allowCode && (H.allowCode = !0), t.debug && (H.debug = !0), m = t.bnds, k = t.tmpls), a = 0; a < V; a++)
                            if ("" + (n = e[a]) === n) F += '\n+"' + n + '"';
                            else if ("*" === (i = n[0])) F += ";\n" + n[1] + "\nret=ret";
                        else {
                            if (d = n[1], C = !o && n[2], s = he(n[3], "params") + "}," + he(w = n[4]), O = n[5], N = n[6], S = n[8] && n[8].replace(f, "$1"), (L = "else" === i) ? g && g.push(n[7]) : (D = 0, m && (g = n[7]) && (g = [g], D = m.push(1))), (M = ":" === i) ? d && (i = d === R ? ">" : d + i) : (C && ((T = te(S, H)).tmplName = _ + "/" + i, ue(C, T), k.push(T)), L || (E = i, P = F, F = ""), A = (A = e[a + 1]) && "else" === A[0]), I = O ? ";\ntry{\nret+=" : "\n+", x = "", y = "", M && (g || N || d && d !== R)) {
                                if (B = "return {" + s + "};", v = 'c("' + d + '",view,', (B = new Function("data,view,j,u", " // " + _ + " " + D + " " + i + "\n" + B))._er = O, x = v + D + ",", y = ")", B._tag = i, o) return B;
                                le(B, g), u = !0
                            }
                            if (F += M ? (o ? (O ? "\ntry{\n" : "") + "return " : I) + (u ? (u = r, p = h = !0, v + (g ? (m[D - 1] = B, D) : "{" + s + "}") + ")") : ">" === i ? (c = !0, "h(" + w[0] + ")") : (!0, "((v=" + (w[0] || "data") + ')!=null?v:"")')) : (p = l = !0, "\n{view:view,tmpl:" + (C ? k.length : "0") + "," + s + "},"), E && !A) {
                                if (F = "[" + F.slice(0, -1) + "]", v = 't("' + E + '",view,this,', o || g) {
                                    if ((F = new Function("data,view,j,u", " // " + _ + " " + D + " " + E + "\nreturn " + F + ";"))._er = O, F._tag = E, g && le(m[D - 1] = F, g), o) return F;
                                    x = v + D + ",undefined,", y = ")"
                                }
                                F = P + I + v + (D || F) + ")", g = 0, E = 0
                            }
                            O && (p = !0, F += ";\n}catch(e){ret" + (o ? "urn " : "+=") + x + "j._err(e,view," + O + ")" + y + ";}" + (o ? "" : "ret=ret"))
                        }
                        F = "// " + _ + "\nvar v" + (l ? ",t=j._tag" : "") + (h ? ",c=j._cnvt" : "") + (c ? ",h=j.converters.html" : "") + (o ? ";\n" : ',ret=""\n') + (H.debug ? "debugger;" : "") + F + (o ? "\n" : ";\nreturn ret;");
                        try {
                            F = new Function("data,view,j,u", F)
                        } catch (e) {
                            de("Compiled template code:\n\n" + F + '\n: "' + e.message + '"')
                        }
                        return t && (t.fn = F), p || (F._nvw = !0), F
                    }

                    function me(e, t) {
                        return e && e !== t ? t ? q(q({}, t), e) : e : t && q({}, t)
                    }

                    function be(e) {
                        return C[e] || (C[e] = "&#" + e.charCodeAt(0) + ";")
                    }

                    function fe(e) {
                        return null != e ? v.test(e) && ("" + e).replace(_, be) || e : ""
                    }
                }(this, this.jQuery),
                function(e, t, r) {
                    "use strict";
                    if (!t) throw "jsViews/jsObservable require jQuery";
                    if (!t.observable) {
                        var o = t.views = t.views || {
                                jsviews: "v1.0.0-alpha",
                                sub: {}
                            },
                            a = o.sub,
                            n = t.event.special,
                            i = [].slice,
                            d = [].splice,
                            s = [].concat,
                            l = t.isArray,
                            c = t.expando,
                            h = "object",
                            p = parseInt,
                            u = /\S+/g,
                            m = a.propChng = a.propChng || "propertyChange",
                            b = a.arrChng = a.arrChng || "arrayChange",
                            f = a._cbBnds = a._cbBnds || {},
                            g = m + ".observe",
                            w = t.isFunction,
                            x = 1,
                            y = 1,
                            v = 1,
                            k = t.hasData,
                            _ = {};
                        a.getDeps = function() {
                            var e = arguments;
                            return function() {
                                for (var t, r, o = [], a = e.length; a--;) t = e[a--], (r = e[a]) && (o = o.concat(w(r) ? r(t, t) : r));
                                return o
                            }
                        }, t.observable = E, E._fltr = function(e, t, r, o) {
                            if (!o || !w(o) || o(e, t, r)) return typeof(t = w(t) ? t.set && t.call(r[0]) : t) === h && t
                        }, E.Object = C, E.Array = R, t.observe = E.observe = L, t.unobserve = E.unobserve = function() {
                            return [].push.call(arguments, !0), L.apply(this, arguments)
                        }, E._apply = M, C.prototype = {
                            _data: null,
                            observeAll: B,
                            unobserveAll: O,
                            data: function() {
                                return this._data
                            },
                            setProperty: function(e, t, o) {
                                var a, n, i, d = this._data;
                                if (e = e || "", d)
                                    if (l(e))
                                        for (a = e.length; a--;) n = e[a], this.setProperty(n.name, n.value, o === r || o);
                                    else if ("" + e !== e)
                                    for (a in e) this.setProperty(a, e[a], t);
                                else if (e !== c) {
                                    for (i = e.split("."); d && i.length > 1;) d = d[i.shift()];
                                    d && this._setProperty(d, i[0], t, o)
                                }
                                return this
                            },
                            removeProperty: function(e) {
                                return this.setProperty(e, _), this
                            },
                            _setProperty: function(e, t, o, a) {
                                var n, i, d, s = t ? e[t] : e;
                                w(s) && s.set && (i = s, n = !0 === s.set ? s : s.set, s = s.call(e)), (s !== o || a && s != o) && (!(s instanceof Date) || s > o || s < o) && (n ? (n.call(e, o), o = i.call(e)) : (d = o === _) ? (delete e[t], o = r) : t && (e[t] = o), this._trigger(e, {
                                    change: "set",
                                    path: t,
                                    value: o,
                                    oldValue: s,
                                    remove: d
                                }))
                            },
                            _trigger: function(e, r) {
                                t(e).triggerHandler(m, r)
                            }
                        }, R.prototype = {
                            _data: null,
                            observeAll: B,
                            unobserveAll: O,
                            data: function() {
                                return this._data
                            },
                            insert: function(e, t) {
                                var r = this._data;
                                return 1 === arguments.length && (t = e, e = r.length), (e = p(e)) > -1 && e <= r.length && (t = l(t) ? t : [t]).length && this._insert(e, t), this
                            },
                            _insert: function(e, t) {
                                var r = this._data,
                                    o = r.length;
                                d.apply(r, [e, 0].concat(t)), this._trigger({
                                    change: "insert",
                                    index: e,
                                    items: t
                                }, o)
                            },
                            remove: function(e, t) {
                                var o, a = this._data;
                                return e === r && (e = a.length - 1), e = p(e), (t = t ? p(t) : 0 === t ? 0 : 1) > -1 && e > -1 && (t = (o = a.slice(e, e + t)).length) && this._remove(e, t, o), this
                            },
                            _remove: function(e, t, r) {
                                var o = this._data,
                                    a = o.length;
                                o.splice(e, t), this._trigger({
                                    change: "remove",
                                    index: e,
                                    items: r
                                }, a)
                            },
                            move: function(e, t, r) {
                                if (r = r ? p(r) : 0 === r ? 0 : 1, e = p(e), t = p(t), r > 0 && e > -1 && t > -1 && e !== t) {
                                    var o = this._data.slice(e, e + r);
                                    (r = o.length) && this._move(e, t, r, o)
                                }
                                return this
                            },
                            _move: function(e, t, r, o) {
                                var a = this._data,
                                    n = a.length;
                                a.splice(e, r), d.apply(a, [t, 0].concat(o)), this._trigger({
                                    change: "move",
                                    oldIndex: e,
                                    index: t,
                                    items: o
                                }, n)
                            },
                            refresh: function(e) {
                                var t = this._data.slice();
                                return this._refresh(t, e), this
                            },
                            _refresh: function(e, t) {
                                var r = this._data,
                                    o = r.length;
                                d.apply(r, [0, r.length].concat(t)), this._trigger({
                                    change: "refresh",
                                    oldItems: e
                                }, o)
                            },
                            _trigger: function(e, r) {
                                var o = this._data,
                                    a = o.length,
                                    n = t([o]);
                                a !== r && n.triggerHandler(m, {
                                    change: "set",
                                    path: "length",
                                    value: a,
                                    oldValue: r
                                }), n.triggerHandler(b, e)
                            }
                        }, n[m] = n[b] = {
                            remove: function(e) {
                                var r, o, a, n, i, d = e.data;
                                if (d && (d.off = !0, d = d.cb) && (r = f[d._cId])) {
                                    for (n = (a = t._data(this).events[e.type]).length; n-- && !o;) o = (i = a[n].data) && i.cb._cId === d._cId;
                                    o || (delete r[t.data(this, "obId")], A(r, d._cId))
                                }
                            }
                        }, o.map = function(e) {
                            function o(t, o, a) {
                                var n, i = this;
                                this.src && this.unmap(), typeof t === h && (i.src = t, i.tgt = a || i.tgt || [], i.options = o || i.options, i.update(), e.obsSrc && E(i.src).observeAll(i.obs = function(t, o) {
                                    n || (n = !0, e.obsSrc(i, t, o), n = r)
                                }, i.srcFlt), e.obsTgt && E(i.tgt).observeAll(i.obt = function(t, o) {
                                    n || (n = !0, e.obsTgt(i, t, o), n = r)
                                }, i.tgtFlt))
                            }
                            return w(e) && (e = {
                                getTgt: e
                            }), e.baseMap && (e = t.extend({}, e.baseMap, e)), e.map = function(e, t, r) {
                                return new o(e, t, r)
                            }, (o.prototype = {
                                srcFlt: e.srcFlt || I,
                                tgtFlt: e.tgtFlt || I,
                                update: function(t) {
                                    E(this.tgt).refresh(e.getTgt(this.src, this.options = t || this.options))
                                },
                                unmap: function() {
                                    var e = this;
                                    e.src && (e.obs && E(e.src).unobserveAll(e.obs, e.srcFlt), e.obt && E(e.tgt).unobserveAll(e.obt, e.tgtFlt), e.src = r)
                                },
                                map: o,
                                _def: e
                            }).constructor = o, e
                        }
                    }

                    function T(e) {
                        return e._cId = e._cId || ".obs" + y++
                    }

                    function E(e) {
                        return l(e) ? new R(e) : new C(e)
                    }

                    function C(e) {
                        return this._data = e, this
                    }

                    function R(e) {
                        return this._data = e, this
                    }

                    function S(e, t) {
                        var r, o, a = t,
                            n = a,
                            i = (e = l(e) ? e : [e]).length,
                            d = [];
                        for (r = 0; r < i; r++) o = e[r], w(o) ? d = d.concat(S(o.call(t, t), t)) : "" + o === o ? (n !== a && d.push(a = n), d.push(o)) : (t = n = o, n !== a && d.push(a = n));
                        return d
                    }

                    function A(e, t) {
                        for (var r in e) return;
                        delete f[t]
                    }

                    function P(e, t) {
                        function o(e) {
                            return typeof e === h && (m[0] || u && l(e))
                        }
                        if (!e.data || !e.data.off) {
                            var a, n, i, d = t.oldValue,
                                s = t.value,
                                c = e.data,
                                p = c.observeAll,
                                u = !c.cb.noArray,
                                m = c.paths;
                            e.type === b ? (c.cb.array || c.cb).call(c, e, t) : c.prop !== t.path && "*" !== c.prop || (p ? (a = p._path + "." + t.path, n = p.filter, i = [e.target].concat(p.parents()), o(d) && M(u, p.ns, [d], m, c.cb, !0, n, [i], a), o(s) && M(u, p.ns, [s], m, c.cb, r, n, [i], a)) : (o(d) && M(u, [d], m, c.cb, !0), o(s) && M(u, [s], m, c.cb)), c.cb(e, t))
                        }
                    }

                    function L() {
                        var e, o = 0 != this,
                            a = i.call(arguments),
                            n = a[0];
                        return n + "" === n && o && (e = n, a.shift(), n = a[0]),
                            function a() {
                                function c(r, o, a, n) {
                                    var i, d, s = k(te),
                                        c = function(e) {
                                            return l(e) ? [e] : e
                                        }(te),
                                        h = W,
                                        p = q;
                                    if (r = e ? r + "." + e : r, I || n) s && t(c).off(r, P);
                                    else {
                                        if (V = s && t._data(te))
                                            for (V = (V = V && V.events) && V[a ? b : m], F = V && V.length; F--;)
                                                if ((H = V[F].data) && H.cb._cId === N._cId && H.ns === e) {
                                                    if (a) return;
                                                    "*" === o && H.prop !== o && t(te).off(r, P)
                                                }(d = a ? {} : {
                                                    fullPath: B,
                                                    paths: o ? [o] : [],
                                                    prop: M
                                                }).ns = e, d.cb = N, q && (d.observeAll = {
                                            _path: p,
                                            path: function() {
                                                return i = h.length, p.replace(/[[.]/g, function(e) {
                                                    return i--, "[" === e ? "[" + t.inArray(h[i - 1], h[i]) : "."
                                                })
                                            },
                                            parents: function() {
                                                return h
                                            },
                                            filter: $,
                                            ns: e
                                        }), t(c).on(r, null, d, P), U && ((f[N._cId] = U)[t.data(te, "obId") || t.data(te, "obId", x++)] = te)
                                    }
                                }

                                function p(e) {
                                    var t = ee;
                                    return e.ob = z(e, t), e.cb = function(r, n) {
                                        var i = e.ob,
                                            d = e.sb,
                                            s = z(e, t);
                                        s !== i && (typeof i === h && (y(i, !0), (d || o && l(i)) && a([i], d, N, z, !0)), e.ob = s, typeof s === h && (y(s), (d || o && l(s)) && a([s], d, N, z))), N(r, n)
                                    }
                                }

                                function y(e, t, a, n) {
                                    if (o) {
                                        var i = te,
                                            d = q;
                                        te = e, n && (te = e[n], q += "." + n), $ && te && (te = E._fltr(q, te, n ? [e].concat(W) : W, $)), te && (a || l(te)) && c(b + ".observe" + (N ? D = T(N) : ""), r, !0, t), te = i, q = d
                                    }
                                }
                                var _, C, R, L, M, B, O, I, N, D, F, H, V, z, G, U, j, Y, W, q, $, K, Q, X = g,
                                    J = 1 != this ? s.apply([], arguments) : i.call(arguments),
                                    Z = J.pop() || !1,
                                    ee = J.shift(),
                                    te = ee,
                                    re = J.length;
                                for (Z + "" === Z && (q = Z, W = J.pop(), $ = J.pop(), Z = !!J.pop(), re -= 3), Z === !!Z && (I = Z, Z = J[re - 1], Z = re && Z + "" !== Z ? (re--, J.pop()) : r), N = Z, re && w(J[re - 1]) && (z = N, N = J.pop(), re--), X += I ? N ? N._cId + (N._inId || "") : "" : (D = T(N)) + (N._inId || ""), I || (U = f[D] = f[D] || {}), Q = (K = e && e.match(u) || [""]).length; Q--;)
                                    for (e = K[Q], l(ee) ? y(ee, I, !0) : I && 0 === re && ee && c(X, ""), j = 0, _ = 0; _ < re; _++)
                                        if ("" !== (B = J[_]) && B !== r) {
                                            if (te = ee, "" + B === B) {
                                                if ((L = B.split("^"))[1] && (j = L[0].split(".").length, j = (B = L.join(".")).split(".").length - j), z && (G = z(B, ee))) {
                                                    re += G.length - 1, d.apply(J, [_--, 1].concat(G));
                                                    continue
                                                }
                                                L = B.split(".")
                                            } else w(B) || (B && B._jsv ? ((Y = I ? B.cb : p(B)).noArray = !o, Y._cId = N._cId, Y._inId = Y._inId || ".obIn" + v++, (B.bnd || B.prm && B.prm.length || !B.sb) && a([te], B.path, [n], B.prm, Y, z, I), B.sb && a([B.ob], B.sb, N, z, I), B = n, te = r) : te = B), L = [ee = B];
                                            for (; te && (M = L.shift()) !== r;)
                                                if (typeof te === h) {
                                                    if ("" + M === M) {
                                                        if ("" === M) continue;
                                                        if (L.length < j + 1 && !te.nodeType) {
                                                            if (!I && (V = k(te) && t._data(te))) {
                                                                for (V = (V = V.events) && V[m], F = V && V.length, R = 0; F--;)(H = V[F].data) && H.cb === N && H.ns === e && (H.prop !== M && "*" !== H.prop || ((C = L.join(".")) && H.paths.push(C), R++));
                                                                if (R) {
                                                                    te = te[M];
                                                                    continue
                                                                }
                                                            }
                                                            if ("*" === M) {
                                                                for (C in !I && V && V.length && c(X, "", !1, !0), c(X, ""), te) y(te, I, r, C);
                                                                break
                                                            }
                                                            M && c(X + "." + M, L.join("^"))
                                                        }
                                                        q && (q += "." + M), M = te[M]
                                                    }
                                                    if (w(M)) {
                                                        (O = M.depends) && a([te], S(O, te), N, z, I);
                                                        break
                                                    }
                                                    te = M
                                                }
                                            y(te, I)
                                        }
                                return D && A(U, D), {
                                    cbId: D,
                                    bnd: U
                                }
                            }.apply(1, a)
                    }

                    function M() {
                        var e = s.apply([], arguments);
                        return L.apply(e.shift(), e)
                    }

                    function B(e, t, o, a) {
                        e + "" !== e && (o = t, t = e, e = ""),
                            function e(t, o, a, n, i, d, s) {
                                function p(e, t) {
                                    for (b = e.length, g = d + "[]"; b--;) u(e, b, t, 1)
                                }

                                function u(o, i, d, s) {
                                    var l, h;
                                    i !== c && (l = E._fltr(g, o[i], w, n)) && (h = w.slice(), s && x && h.unshift(x), e(t, l, a, n || (s ? r : 0), h, g, d))
                                }

                                function m(e, t) {
                                    switch (d = e.data.observeAll._path, x = e.target, t.change) {
                                        case "insert":
                                            p(t.items);
                                            break;
                                        case "remove":
                                            p(t.items, !0);
                                            break;
                                        case "refresh":
                                            p(t.oldItems, !0), p(e.target);
                                            break;
                                        case "set":
                                            g = d + "." + t.path, u(t, "oldValue", !0), u(t, "value")
                                    }
                                    x = r, a.apply(this, arguments)
                                }
                                var b, f, g, w, x;
                                if (typeof o === h)
                                    if (w = [o].concat(i), f = l(o) ? "" : "*", a ? (f || 0 !== n) && (m._cId = T(a), L(t, o, f, m, s, n, w, d)) : L(t, o, f, r, s, n, w, d), f)
                                        for (b in o) g = d + "." + b, u(o, b, s);
                                    else p(o, s)
                            }(e, this._data, t, o, [], "root", a)
                    }

                    function O(e, t, r) {
                        B.call(this, e, t, r, !0)
                    }

                    function I(e) {
                        return e.indexOf(".") < 0 && e.indexOf("[") < 0
                    }
                }(0, this.jQuery),
                function(e, t, r) {
                    "use strict";
                    var o, a, n, i, d, s, l, c, h, p, u, m, b, f, g = e.document,
                        w = t.views,
                        x = w.sub,
                        y = w.settings,
                        v = x.extend,
                        k = t.isFunction,
                        _ = w.converters,
                        T = w.tags,
                        E = t.observable,
                        C = E.observe,
                        R = "data-jsv",
                        S = x.propChng = x.propChng || "propertyChange",
                        A = x.arrChng = x.arrChng || "arrayChange",
                        P = "change.jsv",
                        L = "onBeforeChange",
                        M = "onAfterChange",
                        B = "onAfterCreate",
                        O = "checked",
                        I = "checkbox",
                        N = "radio",
                        D = "none",
                        F = "SCRIPT",
                        H = "true",
                        V = '"><\/script>',
                        z = '<script type="jsv',
                        G = R + "-df",
                        U = "script,[" + R + "]",
                        j = "html",
                        Y = {
                            value: "val",
                            input: "val",
                            html: j,
                            text: "text"
                        },
                        W = {
                            from: "value",
                            to: "value"
                        },
                        q = 0,
                        $ = t.cleanData,
                        K = y.delimiters,
                        Q = x.syntaxErr,
                        X = /<(?!script)(\w+)(?:[^>]*(on\w+)\s*=)?[^>]*>/,
                        J = /['"\\]/g,
                        Z = g.createDocumentFragment(),
                        ee = g.querySelector,
                        te = {
                            ol: 1,
                            ul: 1,
                            table: 1,
                            tbody: 1,
                            thead: 1,
                            tfoot: 1,
                            tr: 1,
                            colgroup: 1,
                            dl: 1,
                            select: 1,
                            optgroup: 1,
                            svg: 1,
                            svg_ns: 1
                        },
                        re = {
                            tr: "table"
                        },
                        oe = {
                            br: 1,
                            img: 1,
                            input: 1,
                            hr: 1,
                            area: 1,
                            base: 1,
                            col: 1,
                            link: 1,
                            meta: 1,
                            command: 1,
                            embed: 1,
                            keygen: 1,
                            param: 1,
                            source: 1,
                            track: 1,
                            wbr: 1
                        },
                        ae = {},
                        ne = {},
                        ie = 1,
                        de = /^#(view\.?)?/,
                        se = /(^|(\/>)|<\/(\w+)>|)(\s*)([#\/]\d+[_^])`(\s*)(<\w+(?=[\s\/>]))?|\s*(?:(<\w+(?=[\s\/>]))|<\/(\w+)>(\s*)|(\/>)\s*|(>))/g,
                        le = /(#)()(\d+)(_)/g,
                        ce = /(#)()(\d+)([_^])/g,
                        he = /(?:(#)|(\/))(\d+)(_)/g,
                        pe = /(#)()(\d+)(\^)/g,
                        ue = /(?:(#)|(\/))(\d+)([_^])([-+@\d]+)?/g,
                        me = e.getComputedStyle;
                    if (!t) throw "JsViews requires jQuery";
                    if (!w) throw "JsViews requires JsRender";
                    if (!E) throw "JsViews requires jquery.observable";

                    function be(e, o, a) {
                        var n, i, d, s, l, c, h, p, u, m, b, f, g, w, x, y, v = e.target,
                            _ = v._jsvBnd,
                            T = /&(\d+)\+?/g;
                        if (_)
                            for (; u = T.exec(_);)
                                if ((u = ne[u[1]]) && (w = u.to)) {
                                    if (p = (d = u.linkCtx).view, g = d.tag, h = t(v), b = p.hlp(L), f = p.hlp(M), i = ve(v), n = Y[i], a === r && (a = k(i) ? i(v) : n ? h[n]() : h.attr(i)), l = w[1], w = (w = w[0]) + "" === w ? [d.data, w] : w, l && (s = k(l) ? l : p.getRsc("converters", l)), s && (a = s.call(g, a)), m = p.linkCtx, p.linkCtx = d, x = {
                                            change: "change",
                                            oldValue: d._val,
                                            value: a
                                        }, !(b && !1 === b.call(d, e, x) || g && g.onBeforeChange && !1 === g.onBeforeChange(e, x) || a === r) && (c = w[0], a !== r && c)) {
                                        if (c._jsv)
                                            for (y = c, c = d.data; y && y.sb;) c = d._ctxCb(y, c), y = y.sb;
                                        g && (g._.chging = !0), E(c).setProperty(w[2] || w[1], a), f && f.call(d, e, x), g && (g.onAfterChange && g.onAfterChange(e, x), delete g._.chging), d._val = a
                                    }
                                    p.linkCtx = m
                                }
                    }

                    function fe(e, o, a) {
                        var n, i, d, s, l, h, p = this.tag,
                            u = this.data,
                            m = this.elem,
                            b = this.convert,
                            f = m.parentNode,
                            g = this.view,
                            x = g.linkCtx,
                            y = g.hlp(L);
                        if (g.linkCtx = this, f && (!y || !o || !1 !== y.call(this, e, o)) && (!o || "*" === e.data.prop || e.data.prop === o.path)) {
                            if (o && (this.eventArgs = o), o || this._initVal) {
                                if (delete this._initVal, a._er) try {
                                    i = a(u, g)
                                } catch (e) {
                                    l = a._er, i = [{
                                        props: {},
                                        args: [h = c(e, g, new Function("data,view", "return " + l + ";")(u, g))]
                                    }]
                                } else i = a(u, g, w);
                                if (n = function(e, o, a, n) {
                                        var i, d, s, l, h = a && a.parentElem || o.elem;
                                        if (e !== r) {
                                            if (l = t(h), n = a && a.attr || n, k(e) && c(o.expr + ": missing parens"), s = /^css-/.test(n) && n.slice(4)) i = t.style(h, s), +e === e && (i = parseInt(i));
                                            else if ("link" !== n) {
                                                if ("value" === n) h.type === I && (i = l.prop(n = O));
                                                else if (n === N) {
                                                    if (h.value !== "" + e) return n;
                                                    i = l.prop(O)
                                                }
                                                i === r && (d = Y[n], i = d ? l[d]() : l.attr(n))
                                            }
                                            o._val = i
                                        }
                                        return n
                                    }(i, this, p = this.tag, this.attr || ve(m, !0, b !== r)), p) {
                                    if (s = l || p._er, i = i[0] ? i : [i], d = !s && o && p.onUpdate && !1 === p.onUpdate(e, o, i), Fe(p, i, s), d || n === D) return n === j && p.onBeforeLink && p.onBeforeLink(), Oe(p), Te(this, u, m), void(g.linkCtx = x);
                                    if (p._.chging) return;
                                    i = ":" === p.tagName ? w._cnvt(p.cvt, g, i[0]) : w._tag(p, g, g.tmpl, i, !0, h)
                                } else a._tag && (i = (b = "" === b ? H : b) ? w._cnvt(b, g, i[0] || i) : w._tag(a._tag, g, g.tmpl, i, !0, h), p = this.tag, n = this.attr || n);
                                we(i, this, n, p) && o && (y = g.hlp(M)) && y.call(this, e, o), p && (p._er = l, Oe(p, o))
                            }
                            Te(this, u, m), g.linkCtx = x
                        }
                    }

                    function ge(e, t) {
                        e._df = t, e[(t ? "set" : "remove") + "Attribute"](G, "")
                    }

                    function we(o, a, n, i) {
                        var d, s, l, c, h, p, u, m, b, f, w, x, y, v = o !== r,
                            k = a.data,
                            _ = i && i.parentElem || a.elem,
                            T = t(_),
                            E = a.view,
                            C = a._val,
                            R = E.linkCtx,
                            S = i || n === j;
                        if (i && (i.parentElem = i.parentElem || a.expr || i._elCnt ? _ : _.parentNode, s = i._prv, l = i._nxt), v) {
                            if ("visible" === n && (n = "css-display"), /^css-/.test(n)) "visible" === a.attr && (y = (_.currentStyle || me.call(e, _, "")).display, o ? (o = _._jsvd || y) !== D || (o = ae[x = _.nodeName]) || (w = g.createElement(x), g.body.appendChild(w), o = ae[x] = (w.currentStyle || me.call(e, w, "")).display, g.body.removeChild(w)) : (_._jsvd = y, o = D)), (S = S || C !== o) && t.style(_, n.slice(4), o);
                            else if ("link" !== n) {
                                if (n === O) p = !0, o = o && "false" !== o;
                                else if (n === N) {
                                    if (_.value !== "" + o) return void Te(a, k, _);
                                    o = p = !0, n = O
                                } else "selected" !== n && "disabled" !== n && "multiple" !== n && "readonly" !== n || (o = o && "false" !== o ? n : null);
                                (d = Y[n]) ? n === j ? (E.linkCtx = a, i && i._.inline ? (h = i.nodes(!0), i._elCnt && (s && s !== l ? Ue(s, l, _, i._tgId, "^", !0) : (u = _._df) && (m = i._tgId + "^", b = u.indexOf("#" + m) + 1, f = u.indexOf("/" + m), b && f > 0 && f > (b += m.length) && (ge(_, u.slice(0, b) + u.slice(f)), je(u.slice(b, f)))), s = s ? s.previousSibling : l ? l.previousSibling : _.lastChild), t(h).remove(), i && i.onBeforeLink && i.onBeforeLink(), c = E.link(E.data, _, s, l, o, i && {
                                    tag: i._tgId,
                                    lazyLink: i.tagCtx.props.lazyLink
                                })) : (v && T.empty(), i && i.onBeforeLink && i.onBeforeLink(), v && (c = E.link(k, _, s, l, o, i && {
                                    tag: i._tgId
                                }))), E.linkCtx = R) : (S = S || C !== o) && ("text" === n && _.children && !_.children[0] ? _.textContent !== r ? _.textContent = o : _.innerText = null === o ? "" : o : T[d](o)): (S = S || C !== o) && T[p ? "prop" : "attr"](n, o !== r || p ? o : null), a._val = o
                            }
                            return c || S
                        }
                        n === j && i && i.onBeforeLink && i.onBeforeLink()
                    }

                    function xe(e, t) {
                        var r = this.hlp(L),
                            o = this.hlp(M);
                        if (!r || !1 !== r.call(this, e, t)) {
                            if (t) {
                                var a = t.change,
                                    n = t.index,
                                    i = t.items;
                                switch (a) {
                                    case "insert":
                                        this.addViews(n, i);
                                        break;
                                    case "remove":
                                        this.removeViews(n, i.length);
                                        break;
                                    case "move":
                                    case "refresh":
                                        this.refresh()
                                }
                            }
                            o && o.call(this, e, t)
                        }
                    }

                    function ye(e) {
                        var o, a, n = e.type,
                            i = e.data,
                            d = e._.bnd;
                        !e._.useKey && d && ((a = e._.bndArr) && (t([a[1]]).off(A, a[0]), e._.bndArr = r), d !== !!d ? n ? d._.arrVws[e._.id] = e : delete d._.arrVws[e._.id] : n && i && (o = function(t) {
                            t.data && t.data.off || xe.apply(e, arguments)
                        }, t([i]).on(A, o), e._.bndArr = [o, i]))
                    }

                    function ve(e, t, r) {
                        var o = e.nodeName.toLowerCase(),
                            a = y.merge[o] || e.contentEditable === H && {
                                to: j,
                                from: j
                            };
                        return a ? t ? "input" === o && e.type === N ? N : a.to : a.from : t ? r ? "text" : j : ""
                    }

                    function ke(e, o, a, n, i, d, s) {
                        var l, h, p, u, m, b = e.parentElem,
                            f = e._prv,
                            g = e._nxt,
                            w = e._elCnt;
                        if (f && f.parentNode !== b && c("Missing parentNode"), s)
                            for (m in u = e.nodes(), w && f && f !== g && Ue(f, g, b, e._.id, "_", !0), e.removeViews(r, r, !0), h = g, w && (f = f ? f.previousSibling : g ? g.previousSibling : b.lastChild), t(u).remove(), e._.bnds) Ve(m);
                        else {
                            if (o) {
                                if (!(p = n[o - 1])) return !1;
                                f = p._nxt
                            }
                            w ? f = (h = f) ? h.previousSibling : b.lastChild : h = f.nextSibling
                        }
                        l = a.render(i, d, e._.useKey && s, e, s || o, !0), e.link(i, b, f, h, l, p)
                    }

                    function _e(e, t, o) {
                        var a, n, i;
                        return o ? (i = "^`", (a = (n = t._.tag)._tgId) || (ne[a = ie++] = n, n._tgId = "" + a)) : (i = "_`", f[a = t._.id] = t), "#" + a + i + (e != r ? e : "") + "/" + a + i
                    }

                    function Te(e, t, o) {
                        var a, n, i, d, s, l = e.tag,
                            c = e.convertBack,
                            h = [],
                            p = e._bndId || "" + ie++,
                            u = e._hdl;
                        if (delete e._bndId, l && (h = l.depends || h, h = k(h) ? l.depends(l) : h, i = l.linkedElem), !e._depends || "" + e._depends != "" + h) {
                            for (e._depends && E._apply(!1, [t], e._depends, u, !0), n = (d = e.fn.deps.slice()).length; n--;)(s = d[n])._jsv && (d[n] = v({}, s));
                            (a = E._apply(!1, [t], d, h, u, e._ctxCb)).elem = o, a.linkCtx = e, a._tgId = p, o._jsvBnd = o._jsvBnd || "", o._jsvBnd += "&" + p, e._depends = h, e.view._.bnds[p] = p, ne[p] = a, i && (a.to = [
                                [], c
                            ]), (i || c !== r) && De(a, l && l.convertBack || c), l && (l.onAfterBind && l.onAfterBind(a), l.flow || l._.inline || (o.setAttribute(R, (o.getAttribute(R) || "") + "#" + p + "^/" + p + "^"), l._tgId = "" + p))
                        }
                        if (i && i[0])
                            for (l._.radio && (i = i.children("input[type=radio]")), n = i.length; n--;) i[n]._jsvBnd = i[n]._jsvBnd || o._jsvBnd + "+", i[n]._jsvLkEl = l
                    }

                    function Ee(e, t, r, o, a, n, i) {
                        return Ce(this, e, t, r, o, a, n, i)
                    }

                    function Ce(e, n, i, d, s, l, c, h) {
                        if ("object" != typeof d && (d = r), e && n) {
                            n = n.jquery ? n : t(n), o || (o = g.body, t(o).on(P, be).on("blur", "[contenteditable]", be));
                            for (var p, u, m, w, x, y, v, k, _ = _e, T = d && "replace" === d.target, E = n.length; E--;)
                                if (v = n[E], "" + e === e) Re(e, v, a(v), r, !0, i, d);
                                else {
                                    if (l = l || a(v), e.markup !== r) !1 === l.link && ((d = d || {}).link = _ = !1), T && (y = v.parentNode), m = e.render(i, d, s, l, r, _), y ? (c = v.previousSibling, h = v.nextSibling, t.cleanData([v], !0), y.removeChild(v), v = y) : (c = h = r, t(v).empty());
                                    else {
                                        if (!0 !== e || l !== b) break;
                                        k = {
                                            lnk: 1
                                        }
                                    }
                                    if (v._df && !h) {
                                        for (p = 0, u = (w = Le(v._df, !0, le)).length; p < u; p++) x = w[p], (x = f[x.id]) && x.data !== r && x.parent.removeViews(x._.key, r, !0);
                                        ge(v)
                                    }
                                    l.link(i, v, c, h, m, k, d)
                                }
                        }
                        return n
                    }

                    function Re(e, o, a, s, l, c, h) {
                        var p, u, m, b, f, g, w, y, v, k, _, T, E = [];
                        if (s) Se(v = (k = (k = ne[s]).linkCtx ? k.linkCtx.tag : k).linkCtx || {
                            data: a.data,
                            elem: k._elCnt ? k.parentElem : o,
                            view: a,
                            ctx: a.ctx,
                            attr: j,
                            fn: k._.bnd,
                            tag: k,
                            _bndId: s
                        }, v.fn);
                        else if (e && o) {
                            for (c = l ? c : a.data, p = a.tmpl, e = function(e, r) {
                                    return (e = t.trim(e).replace(J, "\\$&")).slice(-1) !== d ? e = i + ":" + e + (r ? ":" : "") + d : e
                                }(e, ve(o)), n.lastIndex = 0; u = n.exec(e);) E.push(u);
                            for (; u = E.shift();) {
                                for (_ = n.lastIndex, m = u[1], w = u[3]; E[0] && "else" === E[0][4];) w += "}{" + E.shift()[3], T = !0;
                                T && (w += "}{{/" + u[4] + "}"), f = u[10], b = r, v = {
                                    data: c,
                                    elem: o,
                                    view: a,
                                    ctx: h,
                                    attr: m,
                                    isLk: l,
                                    _initVal: !u[2]
                                }, u[6] && (!m && (b = /:([\w$]*)$/.exec(f)) && (b = b[1]) !== r && (g = -b.length - 1, w = w.slice(0, g - 1) + d), null === b && (b = r), v.convert = u[5] || ""), v.expr = m + w, (y = p.links[w]) || (p.links[w] = y = x.tmplFn(w, p, !0, b, T)), v.fn = y, m || b === r || (v.convertBack = b), Se(v, y), n.lastIndex = _
                            }
                        }
                    }

                    function Se(e, t) {
                        function o(r, o) {
                            fe.call(e, r, o, t)
                        }
                        o.noArray = !0, e.isLk && (e.view = new x.View(e.ctx, "link", b, e.data, b.tmpl, r, r, _e)), e._ctxCb = function(e) {
                            return function(t, r) {
                                var o, a, n = [r];
                                if (e && t) {
                                    if (t._jsv) return t._jsv.call(e.tmpl, r, e, w);
                                    if ("~" === t.charAt(0)) return "~tag" === t.slice(0, 4) && (a = e.ctx, "." === t.charAt(4) && (o = t.slice(5).split("."), a = a.tag), o) ? a ? [a, o.join("."), r] : [] : (t = t.slice(1).split("."), (r = e.hlp(t.shift())) && (t.length && n.unshift(t.join(".")), n.unshift(r)), r ? n : []);
                                    if ("#" === t.charAt(0)) return "#data" === t ? [] : [e, t.replace(de, ""), r]
                                }
                            }
                        }(e.view), e._hdl = o, o(!0)
                    }

                    function Ae(e, t) {
                        var r;
                        return e ? (r = e.indexOf(t)) + 1 ? e.slice(0, r) + e.slice(r + t.length) : e : ""
                    }

                    function Pe(e) {
                        return e && ("" + e === e ? e : e.tagName === F ? e.type.slice(3) : 1 === e.nodeType && e.getAttribute(R) || "")
                    }

                    function Le(e, t, r) {
                        var o, a, n = [];
                        if (a = t ? e : Pe(e)) return o = n.elCnt = e.tagName !== F, o = "@" === a.charAt(0) || o, n._tkns = a, a.replace(r || ue, function(e, t, r, a, i, d) {
                            n.push({
                                elCnt: o,
                                id: a,
                                ch: i,
                                open: t,
                                close: r,
                                path: d,
                                token: e
                            })
                        }), n
                    }

                    function Me(e, t) {
                        e && ("jsv" === e.type ? e.parentNode.removeChild(e) : t && "" === e.getAttribute(h) && e.removeAttribute(h))
                    }

                    function Be(e, t) {
                        for (var r = e; t && r && 1 !== r.nodeType;) r = r.previousSibling;
                        return r && (1 !== r.nodeType ? ((r = g.createElement(F)).type = "jsv", e.parentNode.insertBefore(r, e)) : Pe(r) || r.getAttribute(h) || r.setAttribute(h, "")), r
                    }

                    function Oe(e, o) {
                        var a, n, i, d, s, l, c, h, p, u, m = e.tagCtx,
                            b = m.view,
                            f = e.linkCtx = e.linkCtx || {
                                tag: e,
                                data: b.data,
                                view: b,
                                ctx: b.ctx
                            };
                        if (e.onAfterLink && e.onAfterLink(m, f, o), delete e._.unlinked, (n = (a = e.targetTag ? e.targetTag.linkedElem : e.linkedElem) && a[0]) && ((i = e._.radio) && (a = a.children("input[type=radio]")), i || !e._.chging)) {
                            if (d = x.cvt(e, e.convert)[0], i || n !== f.elem) {
                                for (c = a.length; c--;) {
                                    if (h = (n = a[c])._jsvLkEl, e._.inline && (!h || h !== e && h.targetTag !== e))
                                        for (n._jsvLkEl = e, s = f.elem ? f.elem._jsvBnd : e._prv._jsvBnd, n._jsvBnd = s + "+", l = (s = s.slice(1).split("&")).length; l--;) De(ne[s[l]], e.convertBack);
                                    i && (n[O] = d === n.value)
                                }
                                f._val = d
                            }
                            d !== r && (i || n.value === r ? n.contentEditable === H && (n.innerHTML = d) : n.type === I ? n[O] = d && "false" !== d : a.val(d))
                        }(n = n || ":" === e.tagName && f.elem) && (p = n._jsvTr) !== (u = m.props.trigger) && (n._jsvTr = u, Ne(a = a || t(n), p, "off"), Ne(a, u, "on"))
                    }

                    function Ie(e) {
                        setTimeout(function() {
                            be(e)
                        }, 0)
                    }

                    function Ne(e, t, r) {
                        t && e[r](!0 === t ? "keydown" : t, !0 === t ? Ie : be)
                    }

                    function De(e, t) {
                        var r, o, a, n, i = e.linkCtx,
                            d = i.data,
                            s = i.fn.paths;
                        if (e && s)
                            if (!(r = (s = s._jsvto || s[0]) && s.length) || i.tag && !i.tag.tagCtx.args.length) e.to = [
                                [], t
                            ];
                            else {
                                if ((a = s[r - 1])._jsv) {
                                    for (n = a; a.sb && a.sb._jsv;) o = a = a.sb;
                                    a = (o = a.sb || o && o.path) ? o.slice(1) : n.path
                                }
                                e.to = o ? [
                                    [n, a], t
                                ] : [i._ctxCb(o = a.split("^").join(".")) || [d, o], t]
                            }
                    }

                    function Fe(e, t, r) {
                        var o, a, n = e.tagCtx.view,
                            i = e.tagCtxs || [e.tagCtx],
                            d = i.length,
                            s = !t;
                        if (t = t || e._.bnd.call(n.tmpl, (e.linkCtx || n).data, n, w), r) i = e.tagCtxs = t, e.tagCtx = i[0];
                        else
                            for (; d--;) o = i[d], a = t[d], E(o.props).setProperty(a.props), v(o.ctx, a.ctx), o.args = a.args, s && (o.tmpl = a.tmpl);
                        return x._ths(e, i[0]), i
                    }

                    function He(e) {
                        for (var t, r, o, a = [], n = e.length, i = n; i--;) a.push(e[i]);
                        for (i = n; i--;)
                            if ((r = a[i]).parentNode) {
                                if (o = r._jsvBnd)
                                    for (o = o.slice(1).split("&"), r._jsvBnd = "", t = o.length; t--;) Ve(o[t], r._jsvLkEl, r);
                                je(Pe(r) + (r._df || ""))
                            }
                    }

                    function Ve(e, o, a) {
                        var n, i, d, s, l, c, h, p, u, m, b, f = ne[e];
                        if (o) a === o.linkedElem[0] && (delete a._jsvLkEl, delete o.linkedElem);
                        else if (f) {
                            for (n in delete ne[e], f.bnd) s = f.bnd[n], l = f.cbId, t.isArray(s) ? t([s]).off(A + l).off(S + l) : t(s).off(S + l), delete f.bnd[n];
                            if (i = f.linkCtx) {
                                if (d = i.tag) {
                                    if (c = d.tagCtxs)
                                        for (h = c.length; h--;)(p = c[h].map) && p.unmap();
                                    (b = (m = (u = d.linkedElem) && u[0] || i.elem) && m._jsvTr) && (Ne(u || t(m), b, "off"), m._jsvTr = r), d.onDispose && d.onDispose(), d._elCnt || (d._prv && d._prv.parentNode.removeChild(d._prv), d._nxt && d._nxt.parentNode.removeChild(d._nxt))
                                }
                                delete i.view._.bnds[e]
                            }
                            delete x._cbBnds[f.cbId]
                        }
                    }

                    function ze(e, n) {
                        return e === r ? (o && (t(o).off(P, be).off("blur", "[contenteditable]", be), o = r), e = !0, b.removeViews(), He(g.body.getElementsByTagName("*"))) : n && !0 === e && (n = n.jquery ? n : t(n)).each(function() {
                            for (var e;
                                (e = a(this, !0)) && e.parent;) e.parent.removeViews(e._.key, r, !0);
                            He(this.getElementsByTagName("*")), He([this])
                        }), n
                    }

                    function Ge(e, t) {
                        return ze(this, e)
                    }

                    function Ue(e, t, r, o, a, n) {
                        var i, d, s, l, c, h, p, u = 0,
                            m = e === t;
                        if (e) {
                            for (i = 0, d = (s = Le(e) || []).length; i < d; i++) {
                                if ((h = (l = s[i]).id) === o && l.ch === a) {
                                    if (!n) break;
                                    d = 0
                                }
                                m || (c = "_" === l.ch ? f[h] : ne[h].linkCtx.tag, l.open ? c._prv = t : l.close && (c._nxt = t)), u += h.length + 2
                            }
                            u && e.setAttribute(R, e.getAttribute(R).slice(u)), (d = (p = t ? t.getAttribute(R) : r._df).indexOf("/" + o + a) + 1) && (p = s._tkns.slice(0, u) + p.slice(d + (n ? -1 : o.length + 1))), p && (t ? t.setAttribute(R, p) : ge(r, p))
                        } else ge(r, Ae(r._df, "#" + o + a)), n || t || ge(r, Ae(r._df, "/" + o + a))
                    }

                    function je(e) {
                        var t, o, a, n;
                        if (n = Le(e, !0, ce))
                            for (t = 0, o = n.length; t < o; t++) "_" === (a = n[t]).ch ? (a = f[a.id]) && a.type && a.parent.removeViews(a._.key, r, !0) : Ve(a.id)
                    }
                    t.link || (p = {
                        contents: function(e, o) {
                            e !== !!e && (o = e, e = r);
                            var a, n = t(this.nodes());
                            return n[0] && (a = o ? n.filter(o) : n, n = e && o ? a.add(n.find(o)) : a), n
                        },
                        nodes: function(e, t, r) {
                            var o, a = this._elCnt,
                                n = !t && a,
                                i = [];
                            for (t = t || this._prv, r = r || this._nxt, o = n ? t === this._nxt ? this.parentElem.lastSibling : t : !1 === this._.inline ? t || this.linkCtx.elem.firstChild : t && t.nextSibling; o && (!r || o !== r);)(e || a || o.tagName !== F) && i.push(o), o = o.nextSibling;
                            return i
                        },
                        childTags: function(e, t) {
                            e !== !!e && (t = e, e = r);
                            var o = this.link ? this : this.tagCtx.view,
                                a = this._prv,
                                n = this._elCnt,
                                i = [];
                            return o.link(r, this.parentElem, n ? a && a.previousSibling : a, this._nxt, r, {
                                get: {
                                    tags: i,
                                    deep: e,
                                    name: t,
                                    id: this.link ? this._.id + "_" : this._tgId + "^"
                                }
                            }), i
                        },
                        refresh: function(e) {
                            var t, o = this,
                                a = o.linkCtx,
                                n = o.tagCtx.view;
                            return o.disposed && c("Removed tag"), e === r && (e = w._tag(o, n, n.tmpl, Fe(o), !0)), e + "" === e && (t = we(e, a, o._.inline ? j : a.attr || ve(o.parentElem, !0), o)), Oe(o), t || o
                        },
                        update: function(e) {
                            var t = this.linkedElem;
                            t && be({
                                target: t[0]
                            }, 0, e)
                        }
                    }, x.onStore.template = function(e, r) {
                        r.link = Ee, r.unlink = Ge, e && (t.link[e] = function() {
                            return Ee.apply(r, arguments)
                        }, t.unlink[e] = function() {
                            return Ge.apply(r, arguments)
                        })
                    }, v(v(x._tg.prototype, p), {
                        domChange: function() {
                            var e = this.parentElem,
                                r = t.hasData(e) && t._data(e).events;
                            r && r["jsv-domchange"] && t(e).triggerHandler("jsv-domchange", arguments)
                        }
                    }), x.viewInfos = Le, (y.delimiters = function() {
                        var e = K.apply(w, arguments);
                        return e[0], i = e[1], d = e[2], e[3], s = e[4], n = new RegExp("(?:^|\\s*)([\\w-]*)(\\" + s + ")?(\\" + i + x.rTag + "\\" + d + ")", "g"), this
                    })(), v(v(x.View.prototype, p), {
                        addViews: function(e, t, r) {
                            var o, a, n = t.length,
                                i = this.views;
                            if (!this._.useKey && n && (r = this.tmpl) && (a = i.length + n, !1 !== ke(this, e, r, i, t, this.ctx)))
                                for (o = e + n; o < a; o++) E(i[o]).setProperty("index", o);
                            return this
                        },
                        removeViews: function(e, o, a) {
                            function n(e) {
                                var o, n, i, d, s, l, h = c[e];
                                if (h && h.link) {
                                    if (o = h._.id, a || (l = h.nodes()), h.removeViews(r, r, !0), h.type = r, d = h._prv, s = h._nxt, i = h.parentElem, a || (h._elCnt && Ue(d, s, i, o, "_"), t(l).remove()), !h._elCnt) try {
                                        d.parentNode.removeChild(d), s.parentNode.removeChild(s)
                                    } catch (e) {}
                                    for (n in ye(h), h._.bnds) Ve(n);
                                    delete f[o]
                                }
                            }
                            var i, d, s, l = !this._.useKey,
                                c = this.views;
                            if (l && (s = c.length), e === r)
                                if (l) {
                                    for (i = s; i--;) n(i);
                                    this.views = []
                                } else {
                                    for (d in c) n(d);
                                    this.views = {}
                                } else if (o === r && (l ? o = 1 : (n(e), delete c[e])), l && o) {
                                for (i = e + o; i-- > e;) n(i);
                                if (c.splice(e, o), s = c.length)
                                    for (; e < s;) E(c[e]).setProperty("index", e++)
                            }
                            return this
                        },
                        refresh: function(e) {
                            var t = this.parent;
                            return t && (ke(this, this.index, this.tmpl, t.views, this.data, e, !0), ye(this)), this
                        },
                        link: function(e, o, n, i, d, s, p, b) {
                            function w(e, t) {
                                var a, n, i, d, s, l, c, h = [];
                                if (e) {
                                    for ("@" === e._tkns.charAt(0) && (t = L.previousSibling, L.parentNode.removeChild(L), L = r), A = e.length; A--;) {
                                        if (i = (O = e[A]).ch, a = O.path)
                                            for (S = a.length - 1; n = a.charAt(S--);) "+" === n ? "-" === a.charAt(S) ? (S--, t = t.previousSibling) : t = t.parentNode : t = t.lastChild;
                                        "^" === i ? (T = ne[s = O.id]) && (c = t && (!L || L.parentNode !== t), L && !c || (T.parentElem = t), O.elCnt && c && ge(t, (O.open ? "#" : "/") + s + i + (t._df || "")), h.push([c ? null : L, O])) : (M = f[s = O.id]) && (M.parentElem || (M.parentElem = t || L && L.parentNode || o, M._.onRender = _e, M._.onArrayChange = xe, ye(M)), d = M.parentElem, O.open ? (M._elCnt = O.elCnt, t && !L ? ge(t, "#" + s + i + (t._df || "")) : (M._prv || ge(d, Ae(d._df, "#" + s + i)), M._prv = L)) : (!t || L && L.parentNode === t ? L && (M._nxt || ge(d, Ae(d._df, "/" + s + i)), M._nxt = L) : (ge(t, "/" + s + i + (t._df || "")), M._nxt = r), _ = M.linkCtx, (l = M.ctx && M.ctx.onAfterCreate || Ue) && l.call(_, M)))
                                    }
                                    for (A = h.length; A--;) Ve.push(h[A])
                                }
                                return !e || e.elCnt
                            }

                            function x(e) {
                                var t, r, o;
                                if (e)
                                    for (A = e.length, S = 0; S < A; S++)
                                        if (O = e[S], r = T = ne[O.id].linkCtx.tag, o = T.tagName === q, !T.flow || o) {
                                            if (!W) {
                                                for (t = 1; r = r.parent;) t++;
                                                J = J || t
                                            }!W && t !== J || q && !o || Y.push(T)
                                        }
                            }

                            function v() {
                                var s, l, c = "",
                                    m = {},
                                    b = u + (De ? ",[" + G + "]" : "");
                                for (P = ee ? o.querySelectorAll(b) : t(b, o).get(), C = P.length, n && n.innerHTML && (N = ee ? n.querySelectorAll(b) : t(b, n).get(), n = N.length ? N[N.length - 1] : n), J = 0, E = 0; E < C; E++)
                                    if (L = P[E], n && !Ce) Ce = L === n;
                                    else {
                                        if (i && L === i) {
                                            De && (c += Pe(L));
                                            break
                                        }
                                        if (L.parentNode)
                                            if (De) {
                                                if (c += Pe(L), L._df) {
                                                    for (s = E + 1; s < C && L.contains(P[s]);) s++;
                                                    m[s - 1] = L._df
                                                }
                                                m[E] && (c += m[E] || "")
                                            } else Ne && (O = Le(L, r, he)) && (O = O[0]) && (Se = Se ? O.id !== Se && Se : O.open && O.id), !Se && je(Le(L)) && L.getAttribute(h) && Ve.push([L])
                                    }
                                if (De && ((l = (c += o._df || "").indexOf("#" + De.id) + 1) && (c = c.slice(l + De.id.length)), (l = c.indexOf("/" + De.id)) + 1 && (c = c.slice(0, l)), x(Le(c, r, pe))), d === r && o.getAttribute(h) && Ve.push([o]), Me(n, we), Me(i, we), De) Ie && Ie.resolve();
                                else {
                                    for (we && He + Te && (L = i, He && (i ? w(Le(He + "+", !0), i) : w(Le(He, !0), o)), w(Le(Te, !0), o), i && (c = i.getAttribute(R), (C = c.indexOf(Ee) + 1) && (c = c.slice(C + Ee.length - 1)), i.setAttribute(R, Te + c))), C = Ve.length, E = 0; E < C; E++) L = Ve[E], I = L[1], L = L[0], I ? (T = ne[I.id]) && ((_ = T.linkCtx) && ((T = _.tag).linkCtx = _), I.open ? (L && (T.parentElem = L.parentNode, T._prv = L), T._elCnt = I.elCnt, T.onBeforeLink && T.onBeforeLink(), M = T.tagCtx.view, Re(r, T._prv, M, I.id)) : (T._nxt = L, T._.unlinked && ($ = T.tagCtx, M = $.view, Oe(T)))) : Re(L.getAttribute(h), L, a(L), r, Ne, e, p);
                                    Ie && Ie.resolve()
                                }
                            }
                            var k, _, T, E, C, S, A, P, L, M, O, I, N, D, F, U, j, Y, W, q, $, K, J, ae, ie, de, le, ce, ue, me, be, fe, we, ve, ke, Te, Ee, Ce, Se, Ie, Ne, De, Fe = this._.id + "_",
                                He = "",
                                Ve = [],
                                ze = [],
                                Ge = [],
                                Ue = this.hlp(B),
                                je = w;
                            if (s && (Ie = s.lazyLink && t.Deferred(), s.tmpl ? F = "/" + s._.id + "_" : (Ne = s.lnk, s.tag && (Fe = s.tag + "^", s = !0), (De = s.get) && (je = x, Y = De.tags, W = De.deep, q = De.name)), s = !0 === s), o = o ? "" + o === o ? t(o)[0] : o.jquery ? o[0] : o : this.parentElem || g.body, K = !y.noValidate && o.contentEditable !== H, ce = o.tagName.toLowerCase(), we = !!te[ce], n = n && Be(n, we), i = i && Be(i, we) || null, d != r) {
                                if (me = be = g.createElement("div"), Ee = Te = "", ke = "http://www.w3.org/2000/svg" === o.namespaceURI ? "svg_ns" : (le = X.exec(d)) && le[1] || "", l && le && le[2] && c("Unsupported: " + le[2]), we) {
                                    for (j = i; j && !(U = Le(j));) j = j.nextSibling;
                                    (fe = U ? U._tkns : o._df) && (D = F || "", !s && F || (D += "#" + Fe), (S = fe.indexOf(D)) + 1 && (S += D.length, Ee = Te = fe.slice(0, S), fe = fe.slice(S), U ? j.setAttribute(R, fe) : ge(o, fe)))
                                }
                                if (ue = r, d = ("" + d).replace(se, function(e, t, o, a, n, i, s, l, h, p, u, m, b) {
                                        var f, g = "";
                                        return b ? (k = 0, e) : (T = l || h || "", a = a || p, o = o || m, ue && !o && (a || T || i) && (ue = r, ce = ze.shift()), (a = a || o) && (k = 0, ue = r, K && (o || m ? oe[ce] || /;svg;|;math;/.test(";" + ze.join(";") + ";") || (f = "'<" + ce + ".../") : oe[a] ? f = "'</" + a : ze.length && a === ce || (f = "Mismatch: '</" + a), f && Q(f + ">' in:\n" + d)), ve = we, ce = ze.shift(), we = te[ce], p = p ? "</" + p + ">" : "", ve && (He += Te, Te = "", we ? He += "-" : (g = p + z + "@" + He + V + (u || ""), He = Ge.shift()))), we ? (i ? Te += i : t = p || m || "", T && (t += T, Te && (t += " " + R + '="' + Te + '"', Te = ""))) : t = i ? t + g + n + z + i + V + s + T : g || e, k && i && Q("No {^{ tags within elem markup (" + k + ' ). Use data-link="..."'), T && (k = T, ze.unshift(ce), ce = T.slice(1), ze[0] && ze[0] === re[ce] && c("Parent of <tr> must be <tbody>"), ue = oe[ce], (we = te[ce]) && !ve && (Ge.unshift(He), He = ""), ve = we, He && we && (He += "+")), t)
                                    }), K && ze.length && Q("Mismatched '<" + ce + "...>' in:\n" + d), b) return;
                                for (Z.appendChild(be), ae = (ke = m[ke] || m.div)[0], me.innerHTML = ke[1] + d + ke[2]; ae--;) me = me.lastChild;
                                for (Z.removeChild(be), ie = g.createDocumentFragment(); de = me.firstChild;) ie.appendChild(de);
                                o.insertBefore(ie, i)
                            }
                            return Ie ? setTimeout(v, 0) : v(), Ie && Ie.promise()
                        }
                    }), f = {
                        0: b = new x.View
                    }, _.merge = function(e) {
                        var t, r = this.linkCtx._val || "",
                            o = this.tagCtx.props.toggle;
                        return o && (t = "(\\s(?=" + (t = o.replace(/[\\^$.|?*+()[{]/g, "\\$&")) + "$)|(\\s)|^)(" + t + "(\\s|$))", e = (r = r.replace(new RegExp(t), "$2")) + (e ? (r && " ") + o : "")), e
                    }, T("on", {
                        attr: D,
                        onAfterLink: function(e, o) {
                            for (var a, n, i = 0, d = e.args, s = d.length, l = e.props.data, c = e.view, h = e.props.context; i < s && !(n = k(a = d[i++])););
                            n && (n = d.slice(i), d = d.slice(0, i - 1), h || (h = (h = /^(.*)[\.^][\w$]+$/.exec(e.params.args.slice(-n.length - 1)[0])) && x.tmplFn("{:" + h[1] + "}", c.tmpl, !0)(o.data, c)), this._evs && this.onDispose(), t(o.elem).on(this._evs = d[0] || "click", this._sel = d[1], l == r ? null : l, this._hlr = function(e) {
                                return a.apply(h || o.data, [].concat(n, e, {
                                    change: e.type,
                                    view: c,
                                    linkCtx: o
                                }, n.slice.call(arguments, 1)))
                            }))
                        },
                        onDispose: function() {
                            t(this.parentElem).off(this._evs, this._sel, this._hlr)
                        },
                        flow: !0
                    }), v(T.for, {
                        onArrayChange: function(e, t, r, o) {
                            var a, n = e.target,
                                i = n.length,
                                d = t.change;
                            if (this._.noVws || this.tagCtxs[1] && ("insert" === d && i === t.items.length || "remove" === d && !i || "refresh" === d && !t.oldItems.length != !i)) this.refresh();
                            else
                                for (a in this._.arrVws)(a = this._.arrVws[a]).data === n && a._.onArrayChange.apply(a, arguments);
                            this.domChange(r, o, t), e.done = !0
                        },
                        onAfterLink: function(e, r) {
                            var o, a, n, i, d = this,
                                s = d._ars || {},
                                l = d.tagCtxs,
                                c = l.length,
                                h = d.selected || 0;
                            for (o = 0; o <= h; o++) i = (e = l[o]).map ? e.map.tgt : e.args.length ? e.args[0] : e.view.data, (n = s[o]) && i !== n[0] && (C(n[0], n[1], !0), delete s[o]), !s[o] && t.isArray(i) && (C(i, a = function(t, o) {
                                var a = e;
                                d.onArrayChange(t, o, a, r)
                            }), s[o] = [i, a]);
                            for (o = h + 1; o < c; o++)(n = s[o]) && (C(n[0], n[1], !0), delete s[o]);
                            d._ars = s
                        },
                        onDispose: function() {
                            var e;
                            for (e in this._ars) C(this._ars[e][0], this._ars[e][1], !0)
                        }
                    }), v(T.for, p), v(T.if, p), v(T.include, p), v(T.if, {
                        onUpdate: function(e, t, r) {
                            var o, a, n;
                            for (o = 0;
                                (a = this.tagCtxs[o]) && a.args.length; o++)
                                if (n = !(a = a.args[0]) != !r[o].args[0], !this.convert && a || n) return n;
                            return !1
                        },
                        onAfterLink: function(e, t, r) {
                            r && this.domChange(e, t, r)
                        }
                    }), T("props", {
                        baseTag: "for",
                        dataMap: w.map({
                            getTgt: T.props.dataMap.getTgt,
                            obsSrc: function(e, t, r) {
                                if ("set" === r.change) {
                                    for (var o = e.tgt, a = o.length; a-- && o[a].key !== r.path;); - 1 === a ? r.path && E(o).insert({
                                        key: r.path,
                                        prop: r.value
                                    }) : r.remove ? E(o).remove(a) : E(o[a]).setProperty("prop", r.value)
                                }
                            },
                            obsTgt: function(e, t, r) {
                                var o, a = e.src,
                                    n = r.change;
                                "set" === n ? "prop" === r.path ? E(a).setProperty(t.target.key, r.value) : (E(a).setProperty(r.oldValue, null), delete a[r.oldValue], E(a).setProperty(r.value, t.target.prop)) : "remove" === n ? (o = r.items[0], E(a).removeProperty(o.key), delete a[o.key]) : "insert" === n && (o = r.items[0]).key && E(a).setProperty(o.key, o.prop)
                            },
                            tgtFlt: function(e) {
                                return e.indexOf(".") < 0
                            }
                        })
                    }), v(t, {
                        view: w.view = a = function(e, o, a) {
                            function n(e, t) {
                                if (e)
                                    for (d = Le(e, t, le), l = 0, c = d.length; l < c && (!(i = f[d[l].id]) || !(i = i && a ? i.get(!0, a) : i)); l++);
                            }
                            o !== !!o && (a = o, o = r);
                            var i, d, s, l, c, h, p, u = 0,
                                m = g.body;
                            if (e && e !== m && b._.useKey > 1 && (e = "" + e === e ? t(e)[0] : e.jquery ? e[0] : e)) {
                                if (o) {
                                    if (n(e._df, !0), !i)
                                        for (h = (p = ee ? e.querySelectorAll(U) : t(U, e).get()).length, s = 0; !i && s < h; s++) n(p[s]);
                                    return i
                                }
                                for (; e;) {
                                    if (d = Le(e, r, he))
                                        for (h = d.length; h--;)
                                            if ((i = d[h]).open) {
                                                if (u < 1) return (i = f[i.id]) && a ? i.get(a) : i || b;
                                                u--
                                            } else u++;
                                    e = e.previousSibling || e.parentNode
                                }
                            }
                            return b
                        },
                        link: w.link = Ce,
                        unlink: w.unlink = ze,
                        cleanData: function(e) {
                            e.length && q && He(e), $.apply(t, arguments)
                        }
                    }), w.utility = {
                        validate: function(e) {
                            try {
                                b.link(r, g.createElement("div"), r, r, e, r, r, 1)
                            } catch (e) {
                                return e.message
                            }
                        }
                    }, v(t.fn, {
                        link: function(e, t, r, o, a, n, i) {
                            return Ce(e, this, t, r, o, a, n, i)
                        },
                        unlink: function(e) {
                            return ze(e, this)
                        },
                        view: function(e, t) {
                            return a(this[0], e, t)
                        }
                    }), t.each([j, "replaceWith", "empty", "remove"], function(e, r) {
                        var o = t.fn[r];
                        t.fn[r] = function() {
                            var e;
                            q = 1;
                            try {
                                e = o.apply(this, arguments)
                            } finally {
                                q = 0
                            }
                            return e
                        }
                    }), v(b, {
                        tmpl: {
                            links: {},
                            tags: {}
                        }
                    }), b._.onRender = _e, y({
                        wrapMap: m = {
                            option: [1, "<select multiple='multiple'>", "</select>"],
                            legend: [1, "<fieldset>", "</fieldset>"],
                            area: [1, "<map>", "</map>"],
                            param: [1, "<object>", "</object>"],
                            thead: [1, "<table>", "</table>"],
                            tr: [2, "<table><tbody>", "</tbody></table>"],
                            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                            svg_ns: [1, "<svg>", "</svg>"],
                            div: jQuery.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
                        },
                        linkAttr: h = "data-link",
                        merge: {
                            input: {
                                from: function(e) {
                                    return e.type === I ? e[O] : e.value
                                },
                                to: "value"
                            },
                            textarea: W,
                            select: W,
                            optgroup: {
                                to: "label"
                            }
                        },
                        jsrDbgMode: y.debugMode,
                        debugMode: function(t) {
                            y.jsrDbgMode(t), t ? e._jsv = {
                                views: f,
                                bindings: ne
                            } : delete e._jsv
                        },
                        jsv: function() {
                            y.debugMode(y._dbgMode), h = y.linkAttr, c = w._err, u = U + ",[" + h + "]", l = y.noDomLevel0, m.optgroup = m.option, m.tbody = m.tfoot = m.colgroup = m.caption = m.thead, m.th = m.td
                        }
                    }))
                }(this, this.jQuery)
            }).call(window)
        },
        iHhp: function(e, t) {
            ! function(e, t, r, o) {
                o.shottracker.StrackaRenderer = o.shottracker.StrackaRenderer || o.shottracker.AbstractRenderer.extend({
                    constructor: function(e, t, r) {
                        this.base(e, t, r)
                    },
                    getPlot: function(e, t) {
                        var r = new o.shottracker.math.Vector3(parseFloat(e.x), parseFloat(e.y), parseFloat(e.z));
                        return o.shottracker.Plotter.plot(r, t)
                    },
                    renderStracka: function(e, r, a) {
                        this.course = r, this.options = e, this.image = a, this.layoutCanvas();
                        var n = this.course.getHole(e.hole);
                        this.round = n.getRound(e.round), this.plotterOptions = n.greenPlotterOptions, this.shotFlag = null;
                        var i = this.getPlayerHoles(e);
                        if (this.round.cup.lengthSquared()) {
                            var d = e.markerImageUrl + "hole-flag.png";
                            o.ImagePreloader.preLoad(d, this.onLoadFlagComplete, this)
                        }
                        t.each(i, this.proxy(this.renderStrackaPlayer))
                    },
                    renderStrackaPlayer: function(e, t) {
                        if (t) {
                            var o = this.options.strackaData,
                                a = t.player_id,
                                n = r.getRGB(this.options.lineColors[e].value).hex,
                                i = this.options.lineThickness;
                            o && o[a] && o[a].XYZPath && this.renderStrackaPlayerPath(o[a].XYZPath, this.plotterOptions, n, i)
                        }
                    },
                    renderStrackaPlayerPath: function(e, t, r, a) {
                        var n = this.getPlot(e[0], t);
                        this.paper.circle(n.x, n.y, 4).attr({
                            fill: r,
                            stroke: "none"
                        });
                        for (var i = o.format("M{x},{y}", this.getPlot(e[0], t)), d = 1; d < e.length - 1; d++) i += o.format("L{x},{y}", this.getPlot(e[d], t));
                        this.paper.path().attr({
                            path: i,
                            stroke: r,
                            "stroke-width": a,
                            "stroke-dasharray": ["-"]
                        })
                    }
                })
            }(window, jQuery, Raphael, pgatour)
        },
        im5B: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.StatsTab = o.StatsTab || o.AbstractTab.extend({
                    STATS_TEMPLATE: "#lbnStatsTemplate",
                    STATS_CONTAINER: ".swiper-container",
                    STATS_PAGINATION: ".swiper-pagination",
                    MOBILE_SLIDER: ".stats-slider",
                    fullStatsLink: null,
                    statsTemplate: null,
                    fullStatsLinkTemplate: null,
                    constructor: function(e, t, r, o, a, n) {
                        this.base(e, t, r, o, "stats", a, n)
                    },
                    render: function() {
                        this.statsTemplate = this.context.config.getOrCreate(this.STATS_TEMPLATE), this.fullStatsLinkTemplate = this.context.config.getOrCreate(this.FULL_STATS_LINK_TEMPLATE), this.base(), this.container.html(this.statsTemplate.tmpl({
                            player: this.player,
                            statsURL: r.format(this.context.config.statsURL, {
                                id: this.pid,
                                name: this.player.player_bio.url_name
                            }),
                            pid: this.pid,
                            hideFullStatsButton: !!this.context.config.hideFullStatsButton
                        }))
                    },
                    show: function() {
                        this.base(), this.fullStatsLink && this.fullStatsLink.show(), this._initSliders()
                    },
                    hide: function() {
                        this.base(), this.fullStatsLink && this.fullStatsLink.hide()
                    },
                    update: function(e) {
                        this.base(e), this.container.html(this.statsTemplate.tmpl({
                            player: e,
                            statsURL: r.format(this.context.config.statsURL, {
                                id: this.pid,
                                name: this.player.player_bio.url_name
                            }),
                            pid: this.pid,
                            hideFullStatsButton: !!this.context.config.hideFullStatsButton
                        })), this._initSliders()
                    },
                    _initSliders: function() {
                        this.statsContainer = this.container.find(this.MOBILE_SLIDER), this.isSmallScreenTab ? (this.statsSlider && this.statsSlider.destroySlider && this.statsSlider.destroySlider(), this.statsContainer.addClass("mobileContainer"), this.statsSlider = this.container.find(this.MOBILE_SLIDER).bxSlider({
                            controls: !1,
                            responsive: !0,
                            infiniteLoop: !1
                        })) : this.statsContainer.addClass("largeContainer")
                    }
                })
            }(jQuery, window, pgatour)
        },
        lTSo: function(e, t) {
            ! function(e, t, r, o) {
                o.setModulePath("shottracker", "math"), o.setModulePath("shottracker", "model"), r.fn.getBBox = function(e) {
                    if (!e && this.canvas.getBBox) return this.canvas.getBBox();
                    var t = {
                        x: NaN,
                        y: NaN,
                        x2: NaN,
                        y2: NaN
                    };
                    return this.forEach(function(e) {
                        var r = e.getBBox();
                        t.x = isNaN(t.x) ? r.x : Math.min(t.x, r.x), t.y = isNaN(t.y) ? r.y : Math.min(t.y, r.y), t.x2 = isNaN(t.x2) ? r.x2 : Math.max(t.x2, r.x2), t.y2 = isNaN(t.y2) ? r.y2 : Math.max(t.y2, r.y2)
                    }), t.width = t.x2 - t.x, t.height = t.y2 - t.y, t
                }, r.fn.getViewBox = function() {
                    if (this._viewBox) {
                        var e = {
                            x: this._viewBox[0],
                            y: this._viewBox[1],
                            width: this._viewBox[2],
                            height: this._viewBox[3]
                        };
                        return e.x2 = e.x + e.width, e.y2 = e.y + e.height, e
                    }
                    var t = this.getSize();
                    return {
                        x: 0,
                        y: 0,
                        x2: t.width,
                        y2: t.height,
                        width: t.width,
                        height: t.height
                    }
                }, o.ShotTracker = o.ShotTracker || o.BaseModule.extend({
                    defaults: {
                        fieldMode: "hole",
                        playerMode: "group",
                        baseImageUrl: e.pgatour.TrustedHosts.PGATOUR + "/content/dam/pgatour/livescoring/images",
                        courseImageUrl: "{baseUrl}/courses/{year}/{courseId:3}/{courseId:3}_{hole:2}_{type}",
                        courseImageTypeFull: "h.png",
                        courseImageTypeGreen: "g.jpg",
                        courseImageTypeStracka: "g.jpg",
                        markerImageUrl: "img/",
                        fieldWidth: 736,
                        fieldHeight: 334,
                        lineColors: [{
                            name: "yellow",
                            value: "#ffff00"
                        }, {
                            name: "red",
                            value: "#ff0000"
                        }, {
                            name: "green",
                            value: "#00ff00"
                        }, {
                            name: "blue",
                            value: "#0eebde"
                        }],
                        lineThickness: 2,
                        plotColor: "white",
                        plotRadius: 3,
                        markerFontSize: 12,
                        markerRatio: .65
                    },
                    options: null,
                    course: null,
                    templates: {
                        canvas: '<div id="{0}" class="canvas"></div>'
                    },
                    paper: null,
                    canvas: null,
                    image: null,
                    toolTip: null,
                    renderCourseImageId: 0,
                    constructor: function(e, r, o, a) {
                        t.isPlainObject(e) && (a = o, o = r, r = e, e = null), this.options = t.extend({}, this.defaults, r), this.base(e, o, a)
                    },
                    init: function() {
                        this.base();
                        var e = o.generateId("shottracker");
                        this.canvas = t(o.format(this.templates.canvas, [e])).appendTo(this.container), this.paper = new r(e, "100%", "100%"), this.paper.ca.cursor = function(e) {
                            return this.node.style.cursor = e, {}
                        }, this.toolTip = t('<div class="marker-tool-tip"></div>').hide().appendTo(this.container), this.render()
                    },
                    update: function(e) {
                        this.options = t.extend(this.options, e), this.render()
                    },
                    toggleFieldMode: function(e) {
                        var t = this.options;
                        void 0 === e && (e = "hole" === t.fieldMode ? "green" : "hole"), t.fieldMode !== e && (t.fieldMode = e, this.render())
                    },
                    getFieldMode: function() {
                        return this.options.fieldMode
                    },
                    togglePlayerMode: function(e, t) {
                        var r = this.options;
                        void 0 === e && (e = "group" === r.playerMode ? "single" : "group"), r.playerMode !== e && (r.playerMode = e, this.render(t))
                    },
                    getPlayerMode: function() {
                        return this.options.playerMode
                    },
                    render: function(e) {
                        this.course = new o.shottracker.model.CourseModel(this.options.course), this.paper.clear(), this.options.hole && this.options.round && this.renderCourseImage(e)
                    },
                    renderCourseImage: function(e) {
                        var t = this.options,
                            r = this.currentCourseImageUrl = o.format(t.courseImageUrl, {
                                baseUrl: t.baseImageUrl,
                                year: t.year,
                                tour: t.tour,
                                tourId: t.tourId,
                                courseId: this.course.id,
                                hole: t.hole,
                                type: this.getCourseImageType()
                            }),
                            a = ++this.renderCourseImageId;
                        o.ImagePreloader.preLoad(r, function(t) {
                            this.onRenderCourseImage(t, a, r, e)
                        }, this)
                    },
                    renderShots: function() {
                        this.renderer || (this.renderer = new o.shottracker.ShotRenderer(this.container, this.paper, this.canvas, this.options, this.toolTip)), this.course.isHost ? this.renderer.renderShots(this.options, this.course, this.image) : (this.renderMessage("Shot trails are not available\non this course"), this.renderer.layoutCanvas(null, this.course))
                    },
                    renderMessage: function(e) {
                        var t = this.getFieldSize();
                        this.message = this.paper.text(0, 0, e), this.message.attr({
                            "font-family": "Arial",
                            "font-size": 18,
                            fill: "#FFFFFF",
                            x: t.width / 2,
                            y: t.height / 2
                        }).toFront()
                    },
                    renderStracka: function() {
                        this.renderer || (this.renderer = new o.shottracker.StrackaRenderer(this.container, this.paper, this.canvas)), this.renderer.renderStracka(this.options, this.course, this.image)
                    },
                    destroy: function() {
                        this.container.empty()
                    },
                    getFieldSize: function() {
                        var e = this.options;
                        return {
                            width: this.course && this.course.width || e.fieldWidth,
                            height: this.course && this.course.height || e.fieldHeight
                        }
                    },
                    resize: function() {
                        this.renderer && !this.options.disableResize && this.renderer.resize()
                    },
                    getCourseImageType: function() {
                        var e = this.options;
                        switch (e.fieldMode) {
                            case "hole":
                                return e.courseImageTypeFull;
                            case "stracka":
                                return e.courseImageTypeStracka
                        }
                        return e.courseImageTypeGreen
                    },
                    onRenderCourseImage: function(e, t, r, a) {
                        if (t === this.renderCourseImageId)
                            if (e) {
                                if (r !== this.currentCourseImageUrl) return;
                                this.course.width = e.width, this.course.height = e.height, this.image = this.paper.image(e.url, 0, 0, e.width, e.height), "stracka" === this.options.fieldMode ? this.renderStracka() : (this.renderShots(), this.renderer.layoutShots()), this.renderer.fixPaperViewBox(), "function" == typeof this.options.onRenderCourseImage && this.options.onRenderCourseImage(this.image), "function" == typeof a && a()
                            } else o.log("Can not load course image: " + this.currentCourseImageUrl, "error"), this.container.trigger("no-course-image"), "function" == typeof this.options.onRenderCourseImage && this.options.onRenderCourseImage()
                    }
                })
            }(window, jQuery, Raphael, pgatour)
        },
        mO0Q: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.MediaContent = o.MediaContent || r.Base.extend({
                    context: null,
                    mediaContent: null,
                    constructor: function(e) {
                        this.base(), this.context = e
                    },
                    _initPlayersList: function() {
                        this.mediaContent = {};
                        var e = this.context.leaderboardModel.players;
                        for (var t in e) e.hasOwnProperty(t) && (this.mediaContent[t] = {
                            id: t,
                            videos: !1,
                            photos: !1,
                            articles: !1
                        })
                    },
                    processData: function(t) {
                        this.mediaContent || this._initPlayersList();
                        var r = this.context.leaderboardModel.tourCode + this.context.leaderboardModel.tournamentId;
                        if (t && (t.tId === r || this.context.config.debugMode))
                            for (var o in this.mediaContent) this.mediaContent.hasOwnProperty(o) && (this.mediaContent[o].videos = e.inArray(o, t.videos) > -1, this.mediaContent[o].photos = e.inArray(o, t.photos) > -1, this.mediaContent[o].articles = e.inArray(o, t.articles) > -1, this.mediaContent[o].nsarticles = e.inArray(o, t.nsarticles) > -1, this.context.presenter.playerRows.hasOwnProperty(o) && this.context.presenter.playerRows[o].updateIcons(), this.context.favouritePresenter.playerRows.hasOwnProperty(o) && this.context.favouritePresenter.playerRows[o].updateIcons())
                    },
                    hasVideos: function(e) {
                        return this.mediaContent && this.mediaContent.hasOwnProperty(e) && this.mediaContent[e].videos
                    },
                    hasPhotos: function(e) {
                        return this.mediaContent && this.mediaContent.hasOwnProperty(e) && this.mediaContent[e].photos
                    },
                    hasArticles: function(e) {
                        return this.mediaContent && this.mediaContent.hasOwnProperty(e) && (this.mediaContent[e].articles || this.mediaContent[e].nsarticles)
                    },
                    hasMedia: function(e) {
                        return this.hasVideos(e) || this.hasPhotos(e) || this.hasArticles(e)
                    },
                    hasMediaByType: function(e, t) {
                        return this.mediaContent && this.mediaContent.hasOwnProperty(e) && this.mediaContent[e][t]
                    }
                })
            }(jQuery, window, pgatour)
        },
        mcjo: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.DrawersQueue = o.DrawersQueue || r.BaseModule.extend({
                    context: null,
                    smallQueue: null,
                    mediumQueue: null,
                    largeQueue: null,
                    smallFavouriteQueue: null,
                    mediumFavouriteQueue: null,
                    largeFavouriteQueue: null,
                    constructor: function(e) {
                        this.context = e, this.base(this.context.container)
                    },
                    init: function() {
                        this.base(), this.smallQueue = [], this.mediumQueue = [], this.largeQueue = [], this.smallFavouriteQueue = [], this.mediumFavouriteQueue = [], this.largeFavouriteQueue = []
                    },
                    _addRow: function(e, t, r, o, a) {
                        if (o && -1 === r.indexOf(e)) {
                            for (; r.length > 0 && r.length >= o;) {
                                var n = r.shift();
                                a && n && this.context.controller.closeDrawer(n, t)
                            }
                            r.push(e)
                        }
                    },
                    _removeRow: function(e, t) {
                        var r = t.indexOf(e); - 1 !== r && t.splice(r, 1)
                    },
                    expand: function(e, t) {
                        if (t) {
                            var r = this.context.config.smallFavouriteExpandedQueueSize,
                                o = this.context.config.mediumFavouriteExpandedQueueSize,
                                a = this.context.config.largeFavouriteExpandedQueueSize;
                            this._addRow(e, t, this.smallFavouriteQueue, r, this.isSmallScreen()), this._addRow(e, t, this.mediumFavouriteQueue, o, this.isMediumScreen()), this._addRow(e, t, this.largeFavouriteQueue, a, this.isLargeScreen())
                        } else {
                            var n = this.context.config.smallExpandedQueueSize,
                                i = this.context.config.mediumExpandedQueueSize,
                                d = this.context.config.largeExpandedQueueSize;
                            this._addRow(e, t, this.smallQueue, n, this.isSmallScreen()), this._addRow(e, t, this.mediumQueue, i, this.isMediumScreen()), this._addRow(e, t, this.largeQueue, d, this.isLargeScreen())
                        }
                    },
                    close: function(e, t) {
                        t ? (this._removeRow(e, this.smallFavouriteQueue), this._removeRow(e, this.mediumFavouriteQueue), this._removeRow(e, this.largeFavouriteQueue)) : (this._removeRow(e, this.smallQueue), this._removeRow(e, this.mediumQueue), this._removeRow(e, this.largeQueue))
                    }
                })
            }(jQuery, window, pgatour)
        },
        oMHi: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.LeaderboardController = o.LeaderboardController || r.Base.extend({
                    context: null,
                    constructor: function(e) {
                        this.base(), this.context = e
                    },
                    initializeGigya: function() {
                        this.gigyaInitialized || (r.GigyaSocialize.isCallbackReceived() && this.onUserStatusChecked(), e(t).on("userStatusChecked", this.proxy(this.onUserStatusChecked)), e(t).on("getGigyaUserInfo", this.proxy(this.onUserStatusChecked)), r.GigyaSocialize.bindFavoritesPlayerChanged(this.proxy(this.onFavoritesChanged)), this.gigyaInitialized = !0)
                    },
                    sortLeaderboard: function(e) {
                        var t = !(e === this.context.userModel.sortPreference) || !this.context.userModel.sortAscending;
                        if (e !== this.context.userModel.sortPreference || t !== this.context.userModel.sortAscending) {
                            var r = new o.LeaderboardPlayerComparator(this.context, {
                                preference: e,
                                ascending: t
                            });
                            this.context.userModel.setSortPreference(e, t), this.context.presenter.updateSortHeaders(e, t), this.context.presenter.renderPlayers(r), this.context.favouritePresenter.renderPlayers(r)
                        }
                    },
                    pbpToggle: function() {
                        this.context.userModel.setPlayByPlayOn(!this.context.userModel.playByPlayOn), this.context.presenter.checkPlayByPlay()
                    },
                    addToFavourite: function(e) {
                        this.context.userModel.addFavouritePlayer(e), this.context.presenter.playerRows[e].updatePlayerPin(), this.context.favouritePresenter.renderPlayers();
                        var t = this.context.leaderboardModel.tourCode;
                        if (r.GigyaSocialize.getUser()) {
                            var o = this.context.leaderboardModel.getPlayer(e),
                                a = o.player_bio.first_name + " " + o.player_bio.last_name;
                            this.isRealPlayer(o) && r.GigyaSocialize.updateUserFavouritePlayers([{
                                playerId: e,
                                name: a,
                                tourCode: t
                            }], "add")
                        } else this.context.config.useGigya && (this.deferedPlayer = e, r.GigyaSocialize.showPromptWindow())
                    },
                    removeFromFavourite: function(e) {
                        this.context.userModel.removeFavouritePlayer(e), this.context.presenter.playerRows[e].updatePlayerPin(), this.context.favouritePresenter.removePlayer(e);
                        var t = this.context.leaderboardModel.tourCode;
                        this.context.config.useGigya && r.GigyaSocialize.updateUserFavouritePlayers([{
                            playerId: e,
                            tourCode: t
                        }], "remove")
                    },
                    highlightPlayer: function(e, t) {
                        this.context.userModel.setColoredPlayer(e, t), this.context.presenter.playerRows[e].highlightPlayer(t)
                    },
                    openDrawer: function(e, t, r) {
                        this.context.customEventTracker.saveDrawerOpenTime(), this.context._timings = {
                            OPEN_DRAWER_START: Date.now()
                        };
                        var o = this.getRow(e, t),
                            a = this.context.leaderboardModel.players[e];
                        if (o && a) {
                            var n = "videos" === r ? null : r;
                            this.context.userModel.addExpandedPlayer(e, t, n, r), this.context.drawersQueue.expand(e, t), o.showExpansion(r)
                        }
                    },
                    closeDrawer: function(e, t) {
                        this.context._timings.tabs = {};
                        var r = this.getRow(e, t);
                        r && (r.updateAdvertisement = !0, this.context.userModel.removeExpandedPlayer(e, t), this.context.drawersQueue.close(e, t), t ? this.context.favouritePresenter.playerRows[e].hideExpansion() : this.context.presenter.playerRows[e].hideExpansion())
                    },
                    drawerToggle: function(e, t, r) {
                        return this.context.userModel.isExpandedPlayer(e, t) ? (this.closeDrawer(e, t), !1) : (this.openDrawer(e, t, r), !0)
                    },
                    holeSelect: function(e, t, r) {
                        var o = this.getRow(e, t);
                        o && o.expansion && o.expansion.changeSelectedHole(r)
                    },
                    playerModeSelect: function(e, t, r) {
                        var o = ["shottracker", "stracka"],
                            a = this.getRow(e, t),
                            n = a && a.expansion && a.expansion.tabs;
                        if (r && n)
                            for (var i in n)
                                if (n.hasOwnProperty(i) && -1 !== o.indexOf(i))
                                    for (var d = 0; d < n[i].length; d++) n[i][d].setCurrentPlayerMode(r)
                    },
                    tabSelect: function(e, t, r) {
                        this.saveTabOpenStartTime(r);
                        var o = this.getRow(e, t);
                        if (o && o.expansion) {
                            var a = "videos" === r ? null : r;
                            this.context.userModel.addExpandedPlayer(e, t, a, r), o.expansion.showTabs()
                        }
                    },
                    playHoleVideo: function(e, t, r) {
                        var o = this.getRow(e, t),
                            a = o && o.expansion && o.expansion.tabs && o.expansion.tabs.videos;
                        if (r && a)
                            for (var n = 0; n < a.length; n++) a[n] && a[n].playVideo && a[n].playVideo(r)
                    },
                    isRealPlayer: function(e) {
                        return parseInt(e.player_id, 10) < 95e3
                    },
                    clearFavourites: function() {
                        for (var e, t = this.context.userModel.favouritePlayers, r = 0; r < t.length; r++) {
                            var o = t[r];
                            this.context.userModel.removeFavouritePlayer(o), (e = this.context.presenter.playerRows[o]) && e.updatePlayerPin(), this.context.favouritePresenter.removePlayer(o)
                        }
                    },
                    addGigyaPlayerToFavourites: function(e) {
                        this.context.userModel.favouritePlayers.push(e.playerId);
                        var t = this.context.presenter.playerRows[e.playerId];
                        t && t.updatePlayerPin()
                    },
                    renderGigyaFavouritePlayers: function(e) {
                        this.clearFavourites();
                        var t = this.context.leaderboardModel.tourCode;
                        if (e && e.length) {
                            for (var r, o = 0; o < e.length; o++)(r = e[o]).tourCode === t && this.addGigyaPlayerToFavourites(r);
                            this.context.favouritePresenter.renderPlayers()
                        }
                        this.deferedPlayer && -1 === this.context.userModel.favouritePlayers.indexOf(this.deferedPlayer) && (this.addToFavourite(this.deferedPlayer), this.deferedPlayer = null)
                    },
                    isPlayerInList: function(e, t) {
                        for (var r = 0; r < t.length; r++)
                            if (t[r].playerId === e) return !0;
                        return !1
                    },
                    getRow: function(e, t) {
                        return t ? this.context.favouritePresenter.playerRows[e] : this.context.presenter.playerRows[e]
                    },
                    getSavedVideoId: function(e, t, r) {
                        var o = JSON.parse(localStorage.getItem("videoHighlights") || "{}")[e + "-" + t];
                        return o && o[r]
                    },
                    saveVideoId: function(e, t, r, o) {
                        var a;
                        e && ((a = JSON.parse(localStorage.getItem("videoHighlights") || "{}"))[t + "-" + r] = a[t + "-" + r] || {}, a[t + "-" + r][o || "all"] = e, localStorage.setItem("videoHighlights", JSON.stringify(a)))
                    },
                    saveTabOpenStartTime: function(e) {
                        this.context._timings.tabs || (this.context._timings.tabs = {}), this.context._timings.tabs[e] || (this.context._timings.tabs[e] = {}), this.context._timings.tabs[e].startTime = Date.now()
                    },
                    onUserStatusChecked: function() {
                        if (r.GigyaSocialize.getUser()) {
                            var e = r.GigyaSocialize.getUserFavouritePlayers();
                            this.renderGigyaFavouritePlayers(e)
                        } else this.context.favouritePresenter.renderPlayers();
                        this.context.presenter.updateSuspendedAds()
                    },
                    onFavoritesChanged: function(e, t) {
                        for (var r, o, a = this.context.userModel.favouritePlayers, n = this.context.leaderboardModel.tourCode, i = t.filter(function(e) {
                                return e.tourCode === n
                            }), d = a.length - 1; d >= 0; d--) r = a[d], !this.isPlayerInList(r, i) && this.context.presenter.playerRows[r] && (this.context.userModel.removeFavouritePlayer(r), this.context.presenter.playerRows[r].updatePlayerPin(), this.context.favouritePresenter.removePlayer(r));
                        for (var s = 0; s < i.length; s++) o = i[s], !this.context.userModel.isFavouritePlayer(o.playerId) && this.context.presenter.playerRows[o.playerId] && (this.context.userModel.addFavouritePlayer(o.playerId), this.context.presenter.playerRows[o.playerId].updatePlayerPin());
                        this.context.favouritePresenter.renderPlayers()
                    }
                })
            }(jQuery, window, pgatour)
        },
        oPZr: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.LeaderboardPlayerComparator = o.LeaderboardPlayerComparator || r.Base.extend({
                    ascending: !0,
                    preference: "position",
                    func: "",
                    mapping: {},
                    context: null,
                    constructor: function(t, r) {
                        this.base(), this.context = t, e.extend(this, r), this.mapping = {
                            position: this.comparePosition,
                            movement: this.compareMovement,
                            country: this.compareCountry,
                            total: this.compareTotal,
                            thru: this.compareThru,
                            today: this.compareToday,
                            strokes: this.compareStrokes,
                            "projected-rank": this.compareProjectedRank,
                            "official-rank": this.compareOfficialRank,
                            "rank-movement": this.compareRankMovement,
                            round1: this.compareRound,
                            round2: this.compareRound,
                            round3: this.compareRound,
                            round4: this.compareRound,
                            round5: this.compareRound,
                            round6: this.compareRound,
                            "first-name": this.compareFirstName,
                            "last-name": this.compareLastName
                        }, this.func = this.mapping[this.preference]
                    },
                    isDefaultSort: function() {
                        return "position" === this.preference && this.ascending
                    },
                    _safeIntCompare: function(e, t) {
                        return isNaN(e) || null === e ? isNaN(t) || null === t ? 0 : 1 : isNaN(t) || null === t ? -1 : this._simplePropertyCompare(parseInt(e, 10), parseInt(t, 10))
                    },
                    _simplePropertyCompare: function(e, t) {
                        return e < t ? -1 : e > t ? 1 : 0
                    },
                    _safeIntDiff: function(e, t) {
                        return isNaN(e) || isNaN(t) ? 0 : e - t
                    },
                    _compareTeeTime: function(e, t) {
                        return this.context.utils.isTeedOff(e, this.context.leaderboardModel.currentRound) ? this.context.utils.isTeedOff(t, this.context.leaderboardModel.currentRound) ? null : -1 : this.context.utils.isTeedOff(t, this.context.leaderboardModel.currentRound) ? 1 : this._compareTeeTimeNoneTeedOff(e, t)
                    },
                    _compareTeeTimeNoneTeedOff: function(e, t) {
                        var r = e.rounds.length < this.context.leaderboardModel.currentRound,
                            o = t.rounds.length < this.context.leaderboardModel.currentRound;
                        if (r || o) return 0;
                        var a = e.rounds[this.context.leaderboardModel.currentRound - 1].tee_time,
                            n = t.rounds[this.context.leaderboardModel.currentRound - 1].tee_time;
                        return this._simplePropertyCompare(a, n)
                    },
                    compare: function(e, t) {
                        var r = null;
                        return !e && t ? r = 1 : !t && e ? r = -1 : (e || t) && this.func ? (0 === (r = this.func(e, t)) && (r = e.sortOrder - t.sortOrder), r = this.ascending ? r : -r) : r = 0, r
                    },
                    comparePosition: function(e, t) {
                        return e.sortOrder - t.sortOrder
                    },
                    compareMovement: function(e, t) {
                        var r = this._safeIntDiff(e.start_position.replace("T", ""), e.current_position.replace("T", "")),
                            o = this._safeIntDiff(t.start_position.replace("T", ""), t.current_position.replace("T", ""));
                        return -this._simplePropertyCompare(r, o)
                    },
                    compareCountry: function(e, t) {
                        return this._simplePropertyCompare(e.player_bio.country, t.player_bio.country)
                    },
                    compareTotal: function(e, t) {
                        if (1 === this.context.leaderboardModel.currentRound) {
                            var r = this._compareTeeTime(e, t);
                            if (null !== r) return r
                        }
                        return this._safeIntCompare(e.total, t.total)
                    },
                    compareThru: function(e, t) {
                        var r = this._compareTeeTime(e, t);
                        return null !== r ? r : e.thru ? t.thru ? t.thru - e.thru : -1 : t.thru ? 1 : 0
                    },
                    compareToday: function(e, t) {
                        var r = this._compareTeeTime(e, t);
                        return null !== r ? r : this._safeIntCompare(e.today, t.today)
                    },
                    compareStrokes: function(e, t) {
                        return this._safeIntCompare(e.total_strokes, t.total_strokes)
                    },
                    compareProjectedRank: function(e, t) {
                        var r = this.context.leaderboardModel.tourCode;
                        return "s" === r && !this.context.config.championsPlayoff || "h" === r && !this.context.config.isFinals || "c" === r ? this.compareProjectedRankH(e, t) : "s" === r ? this.compareProjectedRankS(e, t) : "h" === r ? this.compareProjectedRankHFinals(e, t) : this.compareProjectedRankR(e, t)
                    },
                    compareOfficialRank: function(e, t) {
                        var r = this.context.leaderboardModel.tourCode;
                        return "s" === r && !this.context.config.championsPlayoff || "h" === r && !this.context.config.isFinals || "c" === r ? this.compareOfficialRankH(e, t) : "s" === r ? this.compareOfficialRankS(e, t) : "h" === r ? this.compareOfficialRankHFinals(e, t) : this.compareOfficialRankR(e, t)
                    },
                    compareRankMovement: function(e, t) {
                        var r = this.context.leaderboardModel.tourCode;
                        return "s" === r && !this.context.config.championsPlayoff || "h" === r && !this.context.config.isFinals || "c" === r ? this.compareRankMovementH(e, t) : "s" === r ? this.compareRankMovementS(e, t) : "h" === r && this.context.config.isFinals ? this.compareRankMovementHFinals(e, t) : this.compareRankMovementR(e, t)
                    },
                    compareRankMovementCommon: function(e, t, r, o) {
                        return e && t ? r && o ? this._compareRankMovementCommonWhenBothHaveStart(e, t, r, o) : -1 : r && o ? 1 : 0
                    },
                    _compareRankMovementCommonWhenBothHaveStart: function(e, t, r, o) {
                        var a = t.replace("T", ""),
                            n = o.replace("T", ""),
                            i = e.replace("T", ""),
                            d = r.replace("T", ""),
                            s = this._safeIntDiff(a, i),
                            l = this._safeIntDiff(n, d);
                        return -this._simplePropertyCompare(s, l)
                    },
                    compareProjectedRankR: function(e, t) {
                        if (!e.rankings.projected_cup_rank) return t.rankings.projected_cup_rank ? 1 : 0;
                        if (!t.rankings.projected_cup_rank) return -1;
                        var r = e.rankings.projected_cup_rank.replace("T", ""),
                            o = t.rankings.projected_cup_rank.replace("T", "");
                        return this._safeIntCompare(r, o)
                    },
                    compareOfficialRankR: function(e, t) {
                        if (!e.rankings.cup_rank) return t.rankings.cup_rank ? 1 : 0;
                        if (!t.rankings.cup_rank) return -1;
                        var r = e.rankings.cup_rank.replace("T", ""),
                            o = t.rankings.cup_rank.replace("T", "");
                        return this._safeIntCompare(r, o)
                    },
                    compareRankMovementR: function(e, t) {
                        return this.compareRankMovementCommon(e.rankings.projected_cup_rank, e.rankings.cup_rank, t.rankings.projected_cup_rank, t.rankings.cup_rank)
                    },
                    compareProjectedRankS: function(e, t) {
                        if (!e.rankings.schwab_proj_rank) return t.rankings.schwab_proj_rank ? 1 : 0;
                        if (!t.rankings.schwab_proj_rank) return -1;
                        var r = e.rankings.schwab_proj_rank.replace("T", ""),
                            o = t.rankings.schwab_proj_rank.replace("T", "");
                        return this._safeIntCompare(r, o)
                    },
                    compareOfficialRankS: function(e, t) {
                        if (!e.rankings.schwab_start_rank) return t.rankings.schwab_start_rank ? 1 : 0;
                        if (!t.rankings.schwab_start_rank) return -1;
                        var r = e.rankings.schwab_start_rank.replace("T", ""),
                            o = t.rankings.schwab_start_rank.replace("T", "");
                        return this._safeIntCompare(r, o)
                    },
                    compareRankMovementS: function(e, t) {
                        return this.compareRankMovementCommon(e.rankings.schwab_proj_rank, e.rankings.schwab_start_rank, t.rankings.schwab_proj_rank, t.rankings.schwab_start_rank)
                    },
                    compareProjectedRankH: function(e, t) {
                        if (!e.rankings.money_proj_rank) return t.rankings.money_proj_rank ? 1 : 0;
                        if (!t.rankings.money_proj_rank) return -1;
                        var r = e.rankings.money_proj_rank.replace("T", ""),
                            o = t.rankings.money_proj_rank.replace("T", "");
                        return this._safeIntCompare(r, o)
                    },
                    compareOfficialRankH: function(e, t) {
                        if (!e.rankings.money_start_rank) return t.rankings.money_start_rank ? 1 : 0;
                        if (!t.rankings.money_start_rank) return -1;
                        var r = e.rankings.money_start_rank.replace("T", ""),
                            o = t.rankings.money_start_rank.replace("T", "");
                        return this._safeIntCompare(r, o)
                    },
                    compareRankMovementH: function(e, t) {
                        return this.compareRankMovementCommon(e.rankings.money_proj_rank, e.rankings.money_start_rank, t.rankings.money_proj_rank, t.rankings.money_start_rank)
                    },
                    compareProjectedRankHFinals: function(e, t) {
                        if (!e.rankings.proj_rank) return t.rankings.proj_rank ? 1 : 0;
                        if (!t.rankings.proj_rank) return -1;
                        var r = this._safeIntCompare(e.rankings.proj_rank.replace("T", ""), t.rankings.proj_rank.replace("T", ""));
                        return 0 !== r ? r : this._safeIntCompare(e.rankings.priority_seed, t.rankings.priority_seed)
                    },
                    compareOfficialRankHFinals: function(e, t) {
                        if (!e.rankings.start_rank) return t.rankings.start_rank ? 1 : 0;
                        if (!t.rankings.start_rank) return -1;
                        var r = e.rankings.start_rank.replace("T", ""),
                            o = t.rankings.start_rank.replace("T", "");
                        return this._safeIntCompare(r, o)
                    },
                    compareRankMovementHFinals: function(e, t) {
                        return this.compareRankMovementCommon(e.rankings.priority_proj_rank, e.rankings.priority_start_rank, t.rankings.priority_proj_rank, t.rankings.priority_start_rank)
                    },
                    compareRound: function(e, t) {
                        var r = this.preference.replace("round", "");
                        return isNaN(r) ? 0 : e.rounds.length < r ? t.rounds.length < r ? 0 : 1 : t.rounds.length < r ? -1 : this._safeIntCompare(e.rounds[r - 1].strokes, t.rounds[r - 1].strokes)
                    },
                    compareFirstName: function(e, t) {
                        var r = e.player_bio.first_name.toLowerCase(),
                            o = t.player_bio.first_name.toLowerCase(),
                            a = this._simplePropertyCompare(r, o);
                        if (0 === a) {
                            var n = e.player_bio.last_name.toLowerCase(),
                                i = t.player_bio.last_name.toLowerCase();
                            return this._simplePropertyCompare(n, i)
                        }
                        return a
                    },
                    compareLastName: function(e, t) {
                        var r = e.player_bio.last_name.toLowerCase(),
                            o = t.player_bio.last_name.toLowerCase(),
                            a = this._simplePropertyCompare(r, o);
                        if (0 === a) {
                            var n = e.player_bio.first_name.toLowerCase(),
                                i = t.player_bio.first_name.toLowerCase();
                            return this._simplePropertyCompare(n, i)
                        }
                        return a
                    }
                })
            }(jQuery, window, pgatour)
        },
        p2ab: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.LeaderboardModel = o.LeaderboardModel || r.Base.extend({
                    debugInfo: null,
                    tournamentName: null,
                    tournamentId: null,
                    tourCode: null,
                    lastUpdatedDate: null,
                    players: {},
                    playerRoundData: {},
                    roundCourseHoleData: {},
                    playerStatsByRound: {},
                    playerNameTranslator: {},
                    playerInfo: {},
                    groups: {},
                    rounds: [],
                    currentRound: 0,
                    scoringType: 0,
                    cutLine: null,
                    courses: {},
                    year: "",
                    statsToShow: {
                        "02564": "Strokes Gained - Putting",
                        101: "Driving Distance",
                        102: "Driving Accuracy Percentage",
                        103: "Greens in Regulation Percentage"
                    },
                    statsToShowAlternate: {
                        104: "Putting Average",
                        101: "Driving Distance",
                        102: "Driving Accuracy Percentage",
                        103: "Greens in Regulation Percentage"
                    },
                    context: null,
                    constructor: function(e) {
                        this.base(), this.context = e, this.applyLocalization(this.context.config.localization)
                    },
                    applyLocalization: function(e) {
                        e && e.statistics && (this.applyLocalizationObject(this.statsToShow, e.statistics.regular), this.applyLocalizationObject(this.statsToShowAlternate, e.statistics.alternative))
                    },
                    applyLocalizationObject: function(e, t) {
                        if (e && t)
                            for (var r in e) e.hasOwnProperty(r) && t[r] && (e[r] = t[r])
                    },
                    populateLbData: function(t) {
                        if (!t) return !1;
                        if (this.lastUpdatedDate && this.lastUpdatedDate === t.last_updated && !this.context.config.debugMode) return !1;
                        t.debug && (this.debugInfo = t.debug.msg_id, this.year = t.debug.setup_year);
                        var r = this._getHostCourse(t);
                        this.tournamentName = t.leaderboard.tournament_name, this.tournamentId = t.leaderboard.tournament_id, this.tourCode = t.leaderboard.tour_code, this.lastUpdatedDate = r.holes && t.last_updated, this.currentRound = t.leaderboard.current_round, this.scoringType = parseInt(t.leaderboard.scoring_type, 10), this.cutLine = t.leaderboard.cut_line, this.format = t.leaderboard.tournament_format, this.isPlayOff = t.leaderboard.in_playoff, this.isFinished = t.leaderboard.is_finished, this.isHighlightsVisible = this.getHighlightsVisibility(t), e(window).trigger("video-highlights-visible", this.isHighlightsVisible), this.rounds = [];
                        for (var o = 0; o < t.leaderboard.total_rounds; o++) this.rounds.push(o + 1);
                        return this.groups = {}, this.populatePlayersAndGroup(t, r), this.needToHighlightMovements() && this.highlightMovements(t.leaderboard.players), !0
                    },
                    populatePlayersAndGroup: function(e, t) {
                        for (var r, o = 0; o < e.leaderboard.players.length; o++) r = this.populatePlayer(e.leaderboard.players[o], o, t, !1 !== e.leaderboard.shortname), this.players[e.leaderboard.players[o].player_id] = r, this.groups.hasOwnProperty(r.group_id) || (this.groups[r.group_id] = []), this.groups[r.group_id].push(r)
                    },
                    _getHostCourse: function(e) {
                        for (var t = null, r = 0; r < e.leaderboard.courses.length; r++) this.courses[e.leaderboard.courses[r].course_id] = e.leaderboard.courses[r], e.leaderboard.courses[r].is_host && (t = e.leaderboard.courses[r]);
                        return t
                    },
                    populatePlayer: function(e, t, r, o) {
                        var a = this.players[e.player_id];
                        return this._setPlayerMisc(e, t, r), this._setPlayerNames(e, o), this._setPlayerTotalStrokes(e), this._populatePlayerStats(e), this._sortHoles(e), this._setPlayerCurrentRound(e), this._populatePlayerWithPreviousRounds(e, a), this.updatePlayerParPerformance(e), e
                    },
                    _setPlayerMisc: function(e, t, r) {
                        e.sortOrder = t, e.statsToShow = [], e.course = this.courses[e.course_id], e.course || (e.course = r, e.course_id = r.course_id), e.ocqs = !1, e.sponsors = [], e.movement = this.context.utils.safeMovement(e.start_position, e.current_position, !1), e.wasUpdated = !this.objectEquals(this.players[e.player_id], e)
                    },
                    _setPlayerNames: function(e, t) {
                        var o = e.player_id,
                            a = e.player_bio,
                            n = this.context.config.lbPlayerNameTranslator,
                            i = r.PlayerNameTranslations,
                            d = a.display_name || a.first_name + " " + a.last_name;
                        a.url_name = r.convertNameToUrl(d), a.first_name = i.getFirstName(n, o, a.first_name), e.player_bio.short_name = t ? i.getShortName(n, o, a.short_name) + "." : a.first_name, e.player_bio.last_name = i.getLastName(n, o, a.last_name), e.player_bio.display_name = i.getDisplayName(n, o, null)
                    },
                    _setPlayerTotalStrokes: function(e) {
                        e.totalStrokes = 0;
                        for (var t = 0; t < e.rounds.length; t++) e.totalStrokes += e.rounds[t].strokes || 0
                    },
                    _populatePlayerStats: function(e) {
                        var t = 2 === this.scoringType ? this.statsToShowAlternate : this.statsToShow;
                        if (e.tournament_stats)
                            for (var r = 0; r < e.tournament_stats.length; r++) {
                                var o = e.tournament_stats[r].stat_id;
                                t.hasOwnProperty(o) && (e.tournament_stats[r].stat_name = t[o], e.statsToShow.push(e.tournament_stats[r]))
                            }
                    },
                    _setPlayerCurrentRound: function(e) {
                        if (!e.current_round && "active" !== e.status && e.rounds && e.rounds.length) {
                            for (var t = 0; t < e.rounds.length; t++) e.rounds[t].strokes && (e.current_round = e.rounds[t].round_number);
                            e.current_round && (e.isCutWithPreviousRounds = !0)
                        }
                    },
                    _populatePlayerWithPreviousRounds: function(e, t) {
                        t && t.previousRounds && (e.previousRounds = t.previousRounds, t.currentRoundData.holes = e.holes, e.currentRoundData = t.currentRoundData, e.current_round !== t.selectedRoundId && (e.selectedRoundId = t.selectedRoundId, e.holes = t.holes, e.course_hole = t.course_hole))
                    },
                    updatePlayerParPerformance: function(e) {
                        if (this._initParPerformance(e), this._initStrokesInOut(e), e.holes)
                            for (var t = 0; t < e.holes.length; t++) e.holes[t].strokes ? (e.parPerformance.total++, this._updatePlayerStrokesInOut(e, t), this._updatePlayerParPerformanceSpecials(e, t)) : this._updatePlayerStrokesInOutNull(e, t);
                        this._computeParPerformancePercents(e.parPerformance)
                    },
                    _initParPerformance: function(e) {
                        e.parPerformance = {}, e.parPerformance.moreBogey = 0, e.parPerformance.doubleBogey = 0, e.parPerformance.bogey = 0, e.parPerformance.par = 0, e.parPerformance.birdie = 0, e.parPerformance.eagle = 0, e.parPerformance.doubleEagle = 0, e.parPerformance.total = 0
                    },
                    _initStrokesInOut: function(e) {
                        e.strokesOut = 0, e.strokesIn = 0
                    },
                    _computeParPerformancePercents: function(e) {
                        e.moreBogeyPercent = Math.floor(e.moreBogey / e.total * 100), e.doubleBogeyPercent = Math.floor(e.doubleBogey / e.total * 100), e.bogeyPercent = Math.floor(e.bogey / e.total * 100), e.birdiePercent = Math.floor(e.birdie / e.total * 100), e.eaglePercent = Math.floor(e.eagle / e.total * 100), e.doubleEaglePercent = Math.floor(e.doubleEagle / e.total * 100), e.parPercent = 100 - e.moreBogeyPercent - e.doubleBogeyPercent - e.bogeyPercent - e.birdiePercent - e.eaglePercent - e.doubleEaglePercent
                    },
                    _updatePlayerStrokesInOut: function(e, t) {
                        t < 9 ? e.strokesOut += e.holes[t].strokes : e.strokesIn += e.holes[t].strokes
                    },
                    _updatePlayerStrokesInOutNull: function(e, t) {
                        t < 9 ? e.strokesOut = 0 : e.strokesIn = 0
                    },
                    _updatePlayerParPerformanceSpecials: function(e, t) {
                        var r = e.holes[t].strokes - e.holes[t].par;
                        switch (r) {
                            case -2:
                                e.parPerformance.eagle++;
                                break;
                            case -1:
                                e.parPerformance.birdie++;
                                break;
                            case 0:
                                e.parPerformance.par++;
                                break;
                            case 1:
                                e.parPerformance.bogey++;
                                break;
                            case 2:
                                e.parPerformance.doubleBogey++;
                                break;
                            default:
                                r > 0 ? e.parPerformance.moreBogey++ : e.parPerformance.doubleEagle++
                        }
                    },
                    _sortHoles: function(e) {
                        e.holes && e.holes.sort(function(e, t) {
                            return e.course_hole_id - t.course_hole_id
                        })
                    },
                    populatePlayerPreviousRounds: function(e, t) {
                        if (t && t.p && t.p.rnds) {
                            var r = e.player_id;
                            this.playerInfo[r] = {};
                            for (var o = 0; o < t.p.rnds.length; o++)
                                if (t.p.rnds[o]) {
                                    var a = t.p.rnds[o];
                                    this.playerInfo[r][a.n] = this._parsePlayerRoundHoles(a.holes)
                                }
                        }
                    },
                    _parsePlayerRoundHoles: function(e) {
                        var t, r = {
                                holes: [],
                                strokes: 0,
                                today: 0
                            },
                            o = {};
                        if (e && e.length) {
                            for (var a = 0; a < e.length; a++) o = e[a], t = parseInt(o.cNum, 10), r.holes.push({
                                course_hole_id: t,
                                points_event: this._parseStringToInt(o.pTot),
                                points_round: this._parseStringToInt(o.pDay),
                                shots: this._parseHoleShots(o.shots),
                                strokes: this._parseStringToInt(o.sc)
                            }), r.strokes += !o.sc || isNaN(o.sc) ? 0 : parseInt(o.sc, 10);
                            r.today = isNaN(o.pDay) ? 0 : parseInt(o.pDay, 10)
                        }
                        return this._sortHoles(r), r
                    },
                    _parseStringToInt: function(e) {
                        return isNaN(parseInt(e, 10)) ? null : parseInt(e, 10)
                    },
                    _parseHoleShots: function(e) {
                        var t = [];
                        if (e && e.length)
                            for (var r = 0; r < e.length; r++) {
                                var o = e[r];
                                t.push({
                                    cup: "y" === o.cup,
                                    distance: parseInt(o.dist, 10),
                                    from: o.from,
                                    left: parseInt(o.left, 10),
                                    putt: "" === o.putt ? null : parseInt(o.putt, 10),
                                    shot_id: parseInt(o.n, 10),
                                    shottext: o.shotText,
                                    time: o.time,
                                    to: o.to,
                                    x: o.x,
                                    y: o.y,
                                    z: o.z
                                })
                            }
                        return t
                    },
                    populateOtherPlayers: function(e, t, o) {
                        if (o)
                            for (var a, n = 0; n < o.p.rnds.length; n++)
                                if (o.p.rnds[n]) {
                                    var i = o.p.rnds[n];
                                    if (i.n === t.toString()) {
                                        a = this._parsePlayerRoundHoles(i.holes), e.strokes = a.strokes, e.holes = a.holes, e.playerBio.firstName = r.PlayerNameTranslations.getFirstName(this.context.config.lbPlayerNameTranslator, e.playerId, e.playerBio.firstName), e.playerBio.lastName = r.PlayerNameTranslations.getLastName(this.context.config.lbPlayerNameTranslator, e.playerId, e.playerBio.lastName), e.playerBio.displayName = r.PlayerNameTranslations.getDisplayName(this.context.config.lbPlayerNameTranslator, e.playerId, null);
                                        break
                                    }
                                }
                    },
                    populateTournamentSetup: function(e) {
                        if (e) {
                            var t, r, o;
                            for (this.roundCourseHoleData = {}, t = 0; t < e.trn.rnds.length; t++) r = e.trn.rnds[t], this.roundCourseHoleData[r.num] = this._buildRoundCourseHoleData(r);
                            for (var a = 0; a < e.trn.field.length; a++) o = e.trn.field[a], this.playerRoundData[o.id] || (this.playerRoundData[o.id] = {}), this._buildPlayerRoundsData(this.playerRoundData[o.id], o.id, e)
                        }
                    },
                    _buildRoundCourseHoleData: function(e) {
                        for (var t, r = {}, o = 0; o < e.courses.length; o++) r[(t = e.courses[o]).id] = {
                            holes: this._buildCourseHoleData(t)
                        };
                        return r
                    },
                    _buildCourseHoleData: function(e) {
                        for (var t, r = [], o = 0; o < e.holes.length; o++) t = e.holes[o], r.push({
                            holeId: t.num,
                            par: t.par
                        });
                        return r
                    },
                    _buildPlayerRoundsData: function(e, t, r) {
                        for (var o, a = 0; a < r.trn.rnds.length; a++) "401" !== (o = r.trn.rnds[a]).num && "301" !== o.num && (e[o.num] || (e[o.num] = {
                            courseId: null,
                            startHole: 1,
                            otherPlayers: []
                        }), this._buildPlayerRoundData(e[o.num], o, t, r))
                    },
                    _buildPlayerRoundData: function(e, t, r, o) {
                        var a = JSPath.apply(".courses{.teetimes.groups{.players == $playerId}}[0]", t, {
                            playerId: r
                        });
                        if (a) {
                            e.courseId = a.id;
                            var n = JSPath.apply(".teetimes{.groups{.players === $playerId}}[0]", a, {
                                playerId: r
                            });
                            if (n) {
                                e.startHole = n.startTee;
                                var i = JSPath.apply(".groups{.players === $playerId}[0]", n, {
                                    playerId: r
                                });
                                i && !e.otherPlayers.length && (e.otherPlayers = this._buildOtherPlayers(r, i, o))
                            }
                        }
                    },
                    _buildOtherPlayers: function(e, t, r) {
                        for (var o = [], a = 0; a < t.players.length; a++) t.players[a] !== e && o.push({
                            playerId: t.players[a],
                            playerBio: this._buildOtherPlayerBio(t.players[a], r)
                        });
                        return o
                    },
                    _buildOtherPlayerBio: function(e, t) {
                        var r = JSPath.apply(".trn.field{.id === $playerId}[0]", t, {
                            playerId: e
                        });
                        return r ? {
                            firstName: r.name.first,
                            lastName: r.name.last
                        } : null
                    },
                    objectEquals: function(e, t) {
                        var r;
                        return e === t ? r = !0 : e && t ? (r = this._checkObjectPropertiesForEquality(e, t)) && this._haveDifferentProperties(e, t) && (r = !1) : r = !1, r
                    },
                    _checkObjectPropertiesForEquality: function(e, t) {
                        for (var r in e) {
                            if (e.hasOwnProperty(r))
                                if ("object" == typeof e[r] && !this.objectEquals(e[r], t[r]) || "object" != typeof e[r] && e[r] !== t[r]) return !1
                        }
                        return !0
                    },
                    _haveDifferentProperties: function(e, t) {
                        for (var r in t)
                            if (t.hasOwnProperty(r) && void 0 === e[r]) return !0;
                        return !1
                    },
                    populateSponsors: function(e) {
                        var t = e && e.digitalSponsors;
                        if (t && t[0] && t[0].plrs && (!e.leaderboard || e.leaderboard.enable))
                            for (var r = 0; r < e.digitalSponsors[0].plrs.length; r++) {
                                var o = e.digitalSponsors[0].plrs[r];
                                this.players[o.pid] && (this.players[o.pid].sponsors = o.sponsors)
                            }
                    },
                    populateOCQS: function(e) {
                        if (e && e.exemptPlayersFor && e.players)
                            for (var t = 0; t < e.players.length; t++) {
                                var r = e.players[t];
                                this.players[r.id] && (this.players[r.id].ocqs = !0)
                            }
                    },
                    getPlayer: function(e) {
                        var t = this.getPlayers(null, [e]);
                        return t && t.length ? t[0] : null
                    },
                    getPlayers: function(t, r) {
                        var o = e.map(this.players, function(t, o) {
                            return r && -1 === e.inArray(o, r) ? null : t
                        });
                        return t && o.sort(function(e, r) {
                            return t.compare(e, r)
                        }), o
                    },
                    getCutLinePosition: function() {
                        return this.cutLine.show_cut_line ? this.cutLine.cut_count : this.cutLine.show_projected ? this.cutLine.projected_count : 0
                    },
                    isMultiCourse: function() {
                        var e = 0;
                        for (var t in this.courses) this.courses.hasOwnProperty(t) && e++;
                        return e > 1
                    },
                    getHighlightsVisibility: function(e) {
                        var t = e.leaderboard.current_round === e.leaderboard.total_rounds;
                        t = t && "Official" === e.leaderboard.round_state;
                        var r = moment(e.last_updated).add(2, "d"),
                            o = moment() > r;
                        return !(t && o)
                    },
                    populatePlayerStats: function(e) {
                        if (e) {
                            var t;
                            this.playerStatsByRound = {};
                            for (var r = 0; r < e.tournament.players.length; r++) t = e.tournament.players[r], this.playerStatsByRound[t.pid] = this._buildStatsByRound(t)
                        }
                    },
                    _buildStatsByRound: function(e) {
                        var t = {};
                        if (e.stats)
                            for (var r = 0; r < this.rounds.length; r++) t[this.rounds[r].toString()] = this._buildPlayerStats(e, r);
                        return t
                    },
                    _buildPlayerStats: function(e, t) {
                        for (var r, o = 2 === this.scoringType ? this.statsToShowAlternate : this.statsToShow, a = {
                                statsToShow: []
                            }, n = 0; n < e.stats.length; n++) {
                            var i = e.stats[n].statId;
                            o.hasOwnProperty(i) && (r = e.stats[n], a.statsToShow.push({
                                stat_id: i,
                                stat_name: o[i],
                                round_value: this._getValue(r, "cValue", t),
                                round_rank: "",
                                event_value: this._getValue(r, "rValue", t),
                                event_rank: "",
                                event_average: this._getValue(r, "tValue"),
                                round_average: "0.000"
                            }))
                        }
                        return a
                    },
                    _getValue: function(e, t, r) {
                        var o = isNaN(r) ? e : e.rounds[r];
                        return o ? o[t] : ""
                    },
                    needToHighlightMovements: function() {
                        var e = "r" === this.tourCode && "stroke" === this.format,
                            t = this.context.config,
                            r = !1,
                            o = Boolean(t.movementHighlightsColor);
                        if (t.movementHighLightsRounds && t.movementHighLightsRounds.length) {
                            var a = this.convertPlayoffRound(this.currentRound);
                            r = -1 !== t.movementHighLightsRounds.indexOf(a)
                        }
                        var n = t.movementHighLightsLiveTime || 0,
                            i = !this.isFinished || moment().diff(this.lastUpdatedDate, "hours") < n;
                        return e && o && r && i
                    },
                    convertPlayoffRound: function(e) {
                        var t;
                        return e && (t = parseInt(e.toString().replace("01", ""), 10)), t
                    },
                    getTopPlayerMovers: function(e, t) {
                        var r, o, a = [];
                        for (r = 0; r < e.length; r++)(o = e[r]).movement > 0 && a.push(o.movement);
                        return a.sort(function(e, t) {
                            return t - e
                        }), a.slice(0, t)
                    },
                    highlightMovements: function(e) {
                        var t, r, o = this.getTopPlayerMovers(e, 10);
                        for (t = 0; t < e.length; t++) r = e[t], -1 !== o.indexOf(r.movement) && (r.highlight = this.context.config.movementHighlightsColor)
                    }
                })
            }(jQuery, window, pgatour)
        },
        pysR: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.DrawerModel = o.DrawerModel || r.Base.extend({
                    playerModel: null,
                    _buildInitialModel: function(e, t) {
                        this.playerModel = {
                            autoAdvance: !0,
                            currentHole: "",
                            currentRound: "",
                            playerBio: e.player_bio,
                            playerId: e.player_id,
                            rounds: {},
                            selectedRound: "",
                            selectedHole: "",
                            status: ""
                        };
                        for (var r = 0; r < t; r++) this.playerModel.rounds[(r + 1).toString()] = {
                            courseId: "",
                            startHole: "0",
                            otherPlayers: [],
                            course: null,
                            holes: [],
                            parPerformance: {},
                            statsToShow: [],
                            strokes: "",
                            today: "",
                            thru: 18
                        }
                    },
                    _getHostCourse: function(e) {
                        return JSPath.apply(".courses {.is_host }[0]", e)
                    },
                    loadFromLeaderBoard: function(e, t) {
                        this.playerModel || this._buildInitialModel(e, t.rounds.length), this.playerModel.currentRound = e.current_round, this.playerModel.courseHole = e.course_hole || e.start_hole, this.playerModel.autoAdvance && (this.playerModel.selectedRound = this.playerModel.currentRound, this.playerModel.selectedHole = this.playerModel.courseHole), this.playerModel.isCutWithPreviousRounds = e.isCutWithPreviousRounds, this.playerModel.leaderboardStats = e.statsToShow, e.isCutWithPreviousRounds || (this.playerModel.rounds[e.current_round] = this._buildRoundFromLeaderBoard(e, t))
                    },
                    _buildRoundFromLeaderBoard: function(e, t) {
                        var r = "--",
                            o = e.current_round;
                        if (o) {
                            var a = "stableford" === t.format,
                                n = e.rounds[o - 1];
                            r = a ? e.strokesIn + e.strokesOut : n.strokes
                        }
                        var i = {
                            course: t.courses[e.course_id],
                            courseId: e.course_id,
                            groupId: e.group_id,
                            holes: e.holes,
                            otherPlayers: this._getOtherPlayersFromLeaderBoard(e, t),
                            parPerformance: e.parPerformance,
                            statsToShow: e.statsToShow,
                            startHole: e.start_hole,
                            strokes: r,
                            today: e.today,
                            thru: e.thru
                        };
                        return i.course || (i.course = this._getHostCourse(t.courses), i.courseId = i.course.course_id), i
                    },
                    _getOtherPlayersFromLeaderBoard: function(e, t) {
                        var r = [],
                            o = e.group_id;
                        if (o)
                            for (var a = t.groups[o], n = 0; n < a.length; n++) e.player_id !== a[n].player_id && r.push({
                                holes: a[n].holes,
                                playerBio: {
                                    firstName: a[n].player_bio.first_name,
                                    lastName: a[n].player_bio.last_name,
                                    displayName: a[n].player_bio.display_name
                                },
                                playerId: a[n].player_id
                            });
                        return r
                    },
                    loadFromPlayerRoundData: function(e, t) {
                        var r;
                        if (this.playerModel.currentRound)
                            for (var o in e) e.hasOwnProperty(o) && (r = e[o], (o !== this.playerModel.currentRound.toString() || this.playerModel.isCutWithPreviousRounds) && this._updateFromPlayerRound(o, r, t))
                    },
                    _updateFromPlayerRound: function(e, t, r) {
                        var o = this.playerModel.rounds[e];
                        t.courseId && (o.courseId = t.courseId, o.course = r[t.courseId]), t.startHole && (o.startHole = t.startHole), t.otherPlayers.length && (o.otherPlayers = t.otherPlayers)
                    },
                    loadFromPlayerInfo: function(e) {
                        var t;
                        if (this.playerModel.currentRound && e)
                            for (var r in e) e.hasOwnProperty(r) && (t = e[r], (r !== this.playerModel.currentRound.toString() || this.playerModel.isCutWithPreviousRounds) && this._updateFromPlayerInfo(r, t))
                    },
                    _updateFromPlayerInfo: function(e, t) {
                        this.playerModel.rounds[e] || (this.playerModel.rounds[e] = {});
                        var r = this.playerModel.rounds[e];
                        r.holes = t.holes, r.strokes = t.strokes, r.today = t.today
                    },
                    loadFromRoundCourseHoleData: function(e) {
                        var t;
                        if (this.playerModel.currentRound)
                            for (var r in e) e.hasOwnProperty(r) && r <= this.playerModel.currentRound && (t = e[r]) && this._updateFromCourseHoleData(r, t)
                    },
                    _updateFromCourseHoleData: function(e, t) {
                        var r = this.playerModel.rounds[e],
                            o = t[r.courseId];
                        if (o && o.holes)
                            for (var a = 0; a < o.holes.length; a++) r.holes || (r.holes = []), r.holes[a] ? r.holes[a].par = o.holes[a].par : r.holes.push({
                                par: o.holes[a].par
                            })
                    },
                    loadFromPlayerStats: function(e) {
                        var t;
                        if (this.playerModel.currentRound)
                            for (var r in e) e.hasOwnProperty(r) && (t = e[r], r !== this.playerModel.currentRound.toString() && this._updateFromStatsByRound(r, t))
                    },
                    _updateFromStatsByRound: function(e, t) {
                        this.playerModel.rounds[e].statsToShow = t.statsToShow
                    },
                    getPlayerModel: function(e) {
                        var t = this.playerModel.rounds[this.playerModel.selectedRound],
                            r = t.statsToShow;
                        this.playerModel.isCutWithPreviousRounds && this.playerModel.selectedRound === this.playerModel.currentRound && (r = this.playerModel.leaderboardStats);
                        var o = {
                            autoAdvance: this.playerModel.autoAdvance,
                            course: t.course,
                            course_hole: this.playerModel.courseHole,
                            course_id: t.courseId,
                            current_round: this.playerModel.currentRound,
                            group_id: t.groupId,
                            holes: t.holes,
                            isCutWithPreviousRounds: this.playerModel.isCutWithPreviousRounds,
                            otherPlayers: t.otherPlayers,
                            player_id: this.playerModel.playerId,
                            player_bio: this.playerModel.playerBio,
                            rounds: this._getPlayerRounds(e.currentRound),
                            selectedRoundId: this.playerModel.selectedRound,
                            selectedHole: this.playerModel.selectedHole,
                            statsToShow: r,
                            start_hole: t.startHole,
                            status: this.playerModel.status,
                            strokes: t.strokes,
                            today: t.today,
                            thru: t.thru
                        };
                        return e.updatePlayerParPerformance(o), o.course_hole || (o.course_hole = this._getMaxHole(null, this.playerModel.rounds[o.current_round]), o.autoAdvance && (o.selectedHole = o.course_hole)), o
                    },
                    _getPlayerRounds: function(e) {
                        var t = [],
                            r = this.playerModel.currentRound || e;
                        for (var o in this.playerModel.rounds) this.playerModel.rounds.hasOwnProperty(o) && o <= r.toString() && t.push({
                            roundId: parseInt(o, 10)
                        });
                        return t
                    },
                    updateSelectedHole: function(e) {
                        this.playerModel.selectedHole = parseInt(e, 10), this.playerModel.autoAdvance = this.playerModel.selectedRound === this.playerModel.currentRound && this.playerModel.selectedHole === this.playerModel.courseHole
                    },
                    updateSelectedRound: function(e) {
                        this.playerModel.selectedRound = e, this.playerModel.selectedHole = this._getMaxHole(e, this.playerModel.rounds[e]), this.playerModel.autoAdvance = this.playerModel.selectedRound === this.playerModel.currentRound && this.playerModel.selectedHole === this.playerModel.courseHole
                    },
                    _getMaxHole: function(e, t) {
                        if (e === this.playerModel.currentRound) return this.playerModel.courseHole;
                        for (var r, o, a, n = 0; n < t.holes.length; n++) o = (parseInt(t.startHole, 10) + n - 1) % 18, (a = t.holes[o]) && (a.strokes || a.shots && a.shots.length) && (r = a.course_hole_id);
                        return r
                    }
                })
            }(jQuery, window, pgatour)
        },
        qDS3: function(e, t, r) {
            (e.exports = r("I1BE")()).push([e.i, '.clearfix:after,.clearfix:before{display:table;content:"";line-height:0}.headerWrapper,.moduleHeader{border-bottom:1px solid #ccc}@font-face{font-family:NanumGothicBold;src:url(' + r("ILh9") + ");src:url(" + r("ILh9") + "?#iefix) format('embedded-opentype'),url(" + r("6WOd") + ") format('woff2'),url(" + r("inoD") + ") format('woff'),url(" + r("g4f6") + ") format('truetype'),url(" + r("TaUw") + "#NanumGothicBold) format('svg')}@font-face{font-family:NanumGothicRegular;src:url(" + r("7go+") + ");src:url(" + r("7go+") + "?#iefix) format('embedded-opentype'),url(" + r("7kdD") + ") format('woff2'),url(" + r("OISa") + ") format('woff'),url(" + r("a9T5") + ") format('truetype'),url(" + r("Tit0") + "#NanumGothicRegular) format('svg')}.clearfix:after{clear:both}.headerWrapper{padding:14px 0 18px 20px}.box-sizing{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.moduleBottom{padding:3px 0 0;height:45px}.moduleBottom .module-bottom-social{float:left;padding-left:15px}.moduleBottom .module-bottom-more{float:right;text-align:right;margin-top:4px}.moduleBottom .module-bottom-more a{color:#000;text-transform:uppercase;font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:18px;line-height:28px;padding-right:15px}.locale-ko .moduleBottom .module-bottom-more a{font-family:'NanumGothicRegular ',sans-serif}.moduleBottom .module-bottom-more a:before{content:'\\203A';font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:26px;line-height:28px;margin-right:3px}.locale-ko .moduleBottom .module-bottom-more a:before{font-family:'NanumGothicBold ',sans-serif}.moduleBottom .module-bottom-more a strong{font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .moduleBottom .module-bottom-more a strong{font-family:'NanumGothicBold ',sans-serif}.moduleHeader{padding:16px 15px;height:50px;position:relative}.moduleHeader.with-sponsor .header-info{margin-right:170px}.moduleHeader .title{font-size:28px;line-height:28px;font-family:'Roboto Condensed',sans-serif;font-weight:400;margin-bottom:2px}.locale-ko .moduleHeader .title{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .title .live{margin-left:3px;color:#FFF;background:#FB0000;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:16px;line-height:18px;padding:2px 5px;text-transform:uppercase;vertical-align:middle}.locale-ko .moduleHeader .title .live{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .subtitle{font-size:18px;line-height:20px;font-family:'Roboto Condensed',sans-serif;font-weight:400}.locale-ko .moduleHeader .subtitle{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .sponsor{position:absolute;right:15px;bottom:15px}.moduleHeader .control{position:absolute;right:15px;top:15px;display:none;width:70px}.moduleHeader .control .btn{border:2px solid #00284B;border-radius:5px;display:block;cursor:pointer;color:#00284B;font-size:16px;line-height:26px;font-family:'Roboto Condensed',sans-serif;font-weight:700;text-align:center;text-transform:uppercase}.locale-ko .moduleHeader .control .btn{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .control .btn.full{width:100%}.moduleHeader .control .btn.half{width:40%;float:right}.moduleHeader .control .btn.half:first-child{float:left}@media (min-width:768px) and (max-width:979px){.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .control{display:block}}@media (max-width:767px){.moduleBottom{height:auto}.moduleBottom .module-bottom-social{float:none;text-align:center;padding:10px}.moduleBottom .module-bottom-more{float:none;padding:10px}.moduleHeader{padding:16px 10px}.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .title{font-size:24px}.moduleHeader .title .live{font-size:12px;line-height:14px}.moduleHeader .control{display:block}}.stracka-modal{display:none}.stracka-modal .ad-new{margin-bottom:10px}.stracka-modal .details-map-legend{position:absolute;bottom:5px;left:0;right:0;width:100%;height:20px;z-index:20;text-align:center}.stracka-modal .details-map-legend .player{position:relative;display:inline-block;margin:0 5px;font-size:14px;padding-left:13px;line-height:14px;white-space:nowrap;color:#fff;text-shadow:1px 1px 1px #000;font-weight:700}.stracka-modal .details-map-legend .player:before{content:'';position:absolute;width:10px;height:10px;left:0;top:2px;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%}.stracka-modal .details-map-legend .player.player-1:before{background:#ff0}.stracka-modal .details-map-legend .player.player-2:before{background:red}.stracka-modal .details-map-legend .player.player-3:before{background:#0f0}.stracka-modal .details-map-legend .player.player-4:before{background:#0eebde}.stracka-modal .shot-tracker .canvas{position:relative;width:100%;left:0!important;top:0!important;height:0!important;padding:0 0 45%}.stracka-modal .shot-tracker .canvas svg{position:absolute!important;left:0;top:0;right:0}.stracka-modal .overlay{position:fixed;top:0;bottom:0;left:0;right:0;background:#DDD;opacity:.95;z-index:6}.stracka-modal .window{width:87%;margin:170px auto -2000px;z-index:7;position:relative;max-width:1100px;display:table}.stracka-modal .window .close-icon{background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/modules/stracka-modal/img/sprite.png\") right top no-repeat;height:36px;width:36px;top:-30px;position:absolute;right:-40px;z-index:7;cursor:pointer}.stracka-modal .window h1{color:#00182E;font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:28px;line-height:28px;margin:5px 0}.stracka-modal .window .stracka-container:after,.stracka-modal .window .stracka-container:before{display:table;content:\"\";line-height:0}.locale-ko .stracka-modal .window h1{font-family:'NanumGothicRegular ',sans-serif}.stracka-modal .window h2{color:#00182E;font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:16px;margin-top:0}.locale-ko .stracka-modal .window h2{font-family:'NanumGothicRegular ',sans-serif}.stracka-modal .window h3{text-transform:uppercase;color:#CBCBCB;font-size:12px;font-family:'Roboto Condensed',sans-serif;font-weight:700;margin:0}.locale-ko .stracka-modal .window h3{font-family:'NanumGothicBold ',sans-serif}.stracka-modal .window h3 span{color:#00182E}.stracka-modal .window .title{padding:30px 20px 0;border-bottom:1px solid #E6E6E6;position:relative}.stracka-modal .window .title .left{overflow:hidden}.stracka-modal .window .title .right{width:300px;float:right}.stracka-modal .window .stracka-container{background:#FFF;position:relative;border-bottom:1px solid #E6E6E6;min-height:305px;padding-bottom:20px}.stracka-modal .window .stracka-container:after{clear:both}.stracka-modal .window .stracka-container .left{display:inline-block;vertical-align:top;width:70%;width:calc(100% - 320px);padding:20px 13px 0 20px;box-sizing:border-box}.stracka-modal .window .stracka-container .left .video-player .innerWrapper{z-index:1!important}.stracka-modal .window .stracka-container .right{display:inline-block;vertical-align:top;width:300px;height:0;padding:20px 20px 0 0;position:relative;box-sizing:border-box}.stracka-modal .window .stracka-container .right .media{padding-top:20px}.stracka-modal .window .stracka-container .right .media .sharing{margin:0 15px 0 0;float:left}.stracka-modal .window .stracka-container .right .media .sharing .icon{top:0;left:0}.stracka-modal .window .stracka-container .right .media .sharing .text{padding-left:38px;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:14px;color:#00284B;line-height:35px}.locale-ko .stracka-modal .window .stracka-container .right .media .sharing .text{font-family:'NanumGothicBold ',sans-serif}.stracka-modal .window .stracka-container .right .stracka-modal-hole-info p{text-transform:uppercase;margin-bottom:0;display:block;font-weight:400}.stracka-modal .window .stracka-container .right .right-bottom-text{text-transform:none;font-size:15px;text-align:center;white-space:nowrap}.stracka-modal .window .stracka-container .right .right-bottom-text a{font-weight:400}.stracka-modal .window .stracka-container .bottom{width:70%;width:calc(100% - 320px);padding:0 20px;box-sizing:border-box}.stracka-modal .window .stracka-container .bottom .extra-stats{position:relative;left:-1px}.stracka-modal .window .stracka-container .bottom .player-extra-stats{width:100%;border-collapse:collapse;display:table}.stracka-modal .window .stracka-container .bottom .player-extra-stats th{background:#00284B;color:#FFF;font-size:15px;padding:15px 0;text-transform:uppercase;font-family:'Roboto Condensed',sans-serif;font-weight:700;border-top:solid 1px #415e78;border-right:solid 1px #415e78}.locale-ko .stracka-modal .window .stracka-container .bottom .player-extra-stats th{font-family:'NanumGothicBold ',sans-serif}.stracka-modal .window .stracka-container .bottom .player-extra-stats th:last-child{border-right:solid 1px #00284B}.stracka-modal .window .stracka-container .bottom .player-extra-stats tr:nth-child(even) td{background:#FFF}.stracka-modal .window .stracka-container .bottom .player-extra-stats td{padding:15px 0;text-align:center;border-bottom:solid 1px #e5e5e5;border-right:solid 1px #e5e5e5;background:#F7F7F7}.stracka-modal .window .stracka-container .bottom .player-extra-stats td.player-name{border-left:solid 1px #e5e5e5}.stracka-modal .window .stracka-container .bottom .player-extra-stats .player-name,.stracka-modal .window .stracka-container .bottom .player-extra-stats .recommendation{text-align:left;padding-left:20px}.stracka-modal .window .related-videos{padding:10px 13px;background:#F4F4F4;overflow:hidden}.stracka-modal .window .related-videos h3{color:#333;padding-left:7px}.stracka-modal .window .related-videos h1{text-transform:uppercase;padding-left:7px}.stracka-modal .window .related-videos .slider{padding-top:15px;position:relative}.stracka-modal .window .related-videos .bx-wrapper .bx-controls{position:absolute;top:-45px;right:0}.stracka-modal .window .related-videos .bx-wrapper .bx-controls .bx-pager{position:relative;padding:15px 50px 0}.stracka-modal .window .related-videos .bx-wrapper .bx-controls .bx-pager .bx-pager-item{display:block;float:left}.stracka-modal .window .related-videos .thumb{width:25%;height:220px;float:left}.stracka-modal .window .related-videos .thumb .thumb-img{top:0;left:7px;right:7px;bottom:80px;background:0 0}.stracka-modal .window .related-videos .thumb .thumb-video{cursor:pointer}.stracka-modal .window .related-videos .thumb .thumb-info{height:70px;padding:0 7px;z-index:2}.stracka-modal .window .related-videos .thumb .thumb-info .franchise{text-transform:uppercase;color:#CBCBCB;font-size:12px}.stracka-modal .window .related-videos .thumb .thumb-info .title{display:block;color:#00284B;font-size:19px;padding:0;border:none;line-height:23px}#videoOverlay{position:fixed;top:0;right:0;bottom:0;left:0;z-index:10;background:#000;display:none}#videoOverlay .close-button{width:35px;height:35px;position:fixed;z-index:100000;top:20px;right:20px;border-radius:17px;background:#fff;font-size:40px;text-align:center;opacity:.3}#videoOverlay .close-button span{vertical-align:middle}@media (min-width:980px) and (max-width:1150px){.stracka-modal .window .stracka-container{min-height:0}.stracka-modal .window .stracka-container .right p{display:inline-block;margin-right:10px}.stracka-modal .window .stracka-container .right .right-bottom-text{position:static}}@media (min-width:768px) and (max-width:979px){.stracka-modal .stracka-modal-hole-info{float:left}.stracka-modal .canvas{width:100%!important;padding-bottom:46%!important}.stracka-modal .window{min-width:748px;display:block}.stracka-modal .window .close-icon{top:-50px;right:0}.stracka-modal .window .stracka-container{display:block;padding-bottom:12px}.stracka-modal .window .stracka-container .left{display:block;margin-right:0;float:none;width:100%;padding:12px}.stracka-modal .window .stracka-container .right{display:block;position:relative;float:none;width:auto;margin:0;padding:0 12px 10px;height:auto;overflow:hidden;text-align:center}.stracka-modal .window .stracka-container .right .right-bottom-text{position:static;float:right;margin:0}.stracka-modal .window .stracka-container .right .stracka-modal-hole-info{float:none;text-align:left}.stracka-modal .window .stracka-container .right .stracka-modal-hole-info p{display:inline-block}.stracka-modal .window .stracka-container .right .media{padding-bottom:30px;margin-left:87%}.stracka-modal .window .stracka-container .bottom{width:100%;padding:0 12px}.stracka-modal .window .stracka-container .bottom .extra-stats{position:static}}@media (max-width:767px){.stracka-modal .window{width:100%;display:block}.stracka-modal .window .close-icon{top:-50px;right:0}.stracka-modal .window .stracka-container{display:block;padding:0;min-height:0;background:0 0;border:none}.stracka-modal .window .stracka-container .left{display:block;margin-right:0;margin-bottom:0;float:none;width:100%}.stracka-modal .window .stracka-container .right{display:none}}", ""])
        },
        qPtc: function(e, t) {
            ! function(e, t) {
                t.shottracker.math.Matrix3 = t.Base.extend({
                    n00: 1,
                    n01: 0,
                    n02: 0,
                    n10: 0,
                    n11: 1,
                    n12: 0,
                    n20: 0,
                    n21: 0,
                    n22: 1,
                    constructor: function() {
                        this.init()
                    },
                    init: function() {
                        this.n00 = 1, this.n01 = 0, this.n02 = 0, this.n10 = 0, this.n11 = 1, this.n12 = 0, this.n20 = 0, this.n21 = 0, this.n22 = 1
                    },
                    clone: function() {
                        var e = new t.shottracker.math.Matrix3;
                        return e.n00 = this.n00, e.n01 = this.n01, e.n02 = this.n02, e.n10 = this.n10, e.n11 = this.n11, e.n12 = this.n12, e.n20 = this.n20, e.n21 = this.n21, e.n22 = this.n22, e
                    },
                    plus: function(e) {
                        this.n00 += e.n00, this.n01 += e.n01, this.n02 += e.n02, this.n10 += e.n10, this.n11 += e.n11, this.n12 += e.n12, this.n20 += e.n20, this.n21 += e.n21, this.n22 += e.n22
                    },
                    minus: function(e) {
                        this.n00 -= e.n00, this.n01 -= e.n01, this.n02 -= e.n02, this.n10 -= e.n10, this.n11 -= e.n11, this.n12 -= e.n12, this.n20 -= e.n20, this.n21 -= e.n21, this.n22 -= e.n22
                    },
                    times: function(e) {
                        var r = new t.shottracker.math.Matrix3;
                        return r.n00 = this.n00 * e.n00 + this.n01 * e.n10 + this.n02 * e.n20, r.n01 = this.n00 * e.n01 + this.n01 * e.n11 + this.n02 * e.n21, r.n02 = this.n00 * e.n02 + this.n01 * e.n12 + this.n02 * e.n22, r.n10 = this.n10 * e.n00 + this.n11 * e.n10 + this.n12 * e.n20, r.n11 = this.n10 * e.n01 + this.n11 * e.n11 + this.n12 * e.n21, r.n12 = this.n10 * e.n02 + this.n11 * e.n12 + this.n12 * e.n22, r.n20 = this.n20 * e.n00 + this.n21 * e.n10 + this.n22 * e.n20, r.n21 = this.n20 * e.n01 + this.n21 * e.n11 + this.n22 * e.n21, r.n22 = this.n20 * e.n02 + this.n21 * e.n12 + this.n22 * e.n22, r
                    },
                    inverse: function() {
                        var e = new t.shottracker.math.Matrix3;
                        return e.n00 = this.n00, e.n01 = this.n10, e.n02 = this.n20, e.n10 = this.n01, e.n11 = this.n11, e.n12 = this.n21, e.n20 = this.n02, e.n21 = this.n12, e.n22 = this.n22, e
                    },
                    det: function() {
                        return this.n00 * (this.n11 * this.n22 - this.n21 * this.n12) - this.n01 * (this.n10 * this.n22 - this.n20 * this.n12) + this.n02 * (this.n10 * this.n21 - this.n20 * this.n11)
                    }
                })
            }(window, pgatour)
        },
        qRtV: function(e, t, r) {
            (e.exports = r("I1BE")()).push([e.i, '.clearfix:after,.clearfix:before{display:table;content:"";line-height:0}.headerWrapper,.moduleHeader{border-bottom:1px solid #ccc}@font-face{font-family:NanumGothicBold;src:url(' + r("ILh9") + ");src:url(" + r("ILh9") + "?#iefix) format('embedded-opentype'),url(" + r("6WOd") + ") format('woff2'),url(" + r("inoD") + ") format('woff'),url(" + r("g4f6") + ") format('truetype'),url(" + r("TaUw") + "#NanumGothicBold) format('svg')}@font-face{font-family:NanumGothicRegular;src:url(" + r("7go+") + ");src:url(" + r("7go+") + "?#iefix) format('embedded-opentype'),url(" + r("7kdD") + ") format('woff2'),url(" + r("OISa") + ") format('woff'),url(" + r("a9T5") + ") format('truetype'),url(" + r("Tit0") + "#NanumGothicRegular) format('svg')}.clearfix:after{clear:both}.headerWrapper{padding:14px 0 18px 20px}.box-sizing{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.moduleBottom{padding:3px 0 0;height:45px}.moduleBottom .module-bottom-social{float:left;padding-left:15px}.moduleBottom .module-bottom-more{float:right;text-align:right;margin-top:4px}.moduleBottom .module-bottom-more a{color:#000;text-transform:uppercase;font-family:'Roboto Condensed',sans-serif;font-weight:400;font-size:18px;line-height:28px;padding-right:15px}.locale-ko .moduleBottom .module-bottom-more a{font-family:'NanumGothicRegular ',sans-serif}.moduleBottom .module-bottom-more a:before{content:'\\203A';font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:26px;line-height:28px;margin-right:3px}.locale-ko .moduleBottom .module-bottom-more a:before{font-family:'NanumGothicBold ',sans-serif}.moduleBottom .module-bottom-more a strong{font-family:'Roboto Condensed',sans-serif;font-weight:700}.locale-ko .moduleBottom .module-bottom-more a strong{font-family:'NanumGothicBold ',sans-serif}.moduleHeader{padding:16px 15px;height:50px;position:relative}.moduleHeader.with-sponsor .header-info{margin-right:170px}.moduleHeader .title{font-size:28px;line-height:28px;font-family:'Roboto Condensed',sans-serif;font-weight:400;margin-bottom:2px}.locale-ko .moduleHeader .title{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .title .live{margin-left:3px;color:#FFF;background:#FB0000;font-family:'Roboto Condensed',sans-serif;font-weight:700;font-size:16px;line-height:18px;padding:2px 5px;text-transform:uppercase;vertical-align:middle}.locale-ko .moduleHeader .title .live{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .subtitle{font-size:18px;line-height:20px;font-family:'Roboto Condensed',sans-serif;font-weight:400}.locale-ko .moduleHeader .subtitle{font-family:'NanumGothicRegular ',sans-serif}.moduleHeader .sponsor{position:absolute;right:15px;bottom:15px}.moduleHeader .control{position:absolute;right:15px;top:15px;display:none;width:70px}.moduleHeader .control .btn{border:2px solid #00284B;border-radius:5px;display:block;cursor:pointer;color:#00284B;font-size:16px;line-height:26px;font-family:'Roboto Condensed',sans-serif;font-weight:700;text-align:center;text-transform:uppercase}.locale-ko .moduleHeader .control .btn{font-family:'NanumGothicBold ',sans-serif}.moduleHeader .control .btn.full{width:100%}.moduleHeader .control .btn.half{width:40%;float:right}.moduleHeader .control .btn.half:first-child{float:left}@media (min-width:768px) and (max-width:979px){.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .control{display:block}}@media (max-width:767px){.moduleBottom{height:auto}.moduleBottom .module-bottom-social{float:none;text-align:center;padding:10px}.moduleBottom .module-bottom-more{float:none;padding:10px}.moduleHeader{padding:16px 10px}.moduleHeader .header-info,.moduleHeader.with-sponsor .header-info{margin-right:90px}.moduleHeader .title{font-size:24px}.moduleHeader .title .live{font-size:12px;line-height:14px}.moduleHeader .control{display:block}}.bx-wrapper{position:relative;margin:0 auto;padding:0;z-index:3}.bx-wrapper .bx-viewport ul{margin:0}.bx-wrapper img{max-width:100%;display:block}.bx-wrapper .bx-controls-auto,.bx-wrapper .bx-pager{position:absolute;bottom:10px;bottom:5px\\9;width:100%}@media screen and (min--moz-device-pixel-ratio:0){.bx-wrapper .bx-controls-auto,.bx-wrapper .bx-pager{bottom:5px}}.bx-wrapper .bx-loading{min-height:50px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/img/bx-loader.gif\") center center no-repeat #fff;height:100%;width:100%;position:absolute;top:0;left:0;z-index:2000}.bx-wrapper .bx-pager{text-align:center;font-size:.85em;font-family:Arial;font-weight:700;color:#666;padding-top:20px}.bx-wrapper .bx-controls-auto .bx-controls-auto-item,.bx-wrapper .bx-pager .bx-pager-item{display:inline-block}.bx-wrapper .bx-pager.bx-default-pager a{background:rgba(160,160,160,.4);text-indent:-9999px;display:block;width:8px;height:8px;margin:0 6px;outline:0;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px}.bx-wrapper .bx-pager.bx-default-pager a.active,.bx-wrapper .bx-pager.bx-default-pager a:hover{background:#013d7c;width:10px;height:10px;margin:0 5px}.bx-wrapper .bx-prev{left:10px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/img/sprite.png\") 0 -730px no-repeat}.bx-wrapper .bx-next{right:10px;background:url(\"/etc/designs/pgatour-libs/frontend/pgatour/img/sprite.png\") -42px -730px no-repeat}.bx-wrapper .bx-prev:hover{background-position:0 -772px}.bx-wrapper .bx-next:hover{background-position:-42px -772px}.bx-wrapper .bx-controls-direction a{position:absolute;top:50%;margin-top:-21px;outline:0;width:42px;height:42px;text-indent:-9999px;z-index:9999}.bx-wrapper .bx-controls-direction a.disabled{display:none}.bx-wrapper .bx-controls.bx-has-controls-auto.bx-has-pager .bx-pager{text-align:left;width:80%}.bx-wrapper .bx-controls.bx-has-controls-auto.bx-has-pager .bx-controls-auto{right:0;width:35px}.bx-wrapper .bx-caption{position:absolute;bottom:0;left:0;background:#666\\9;background:rgba(80,80,80,.75);width:100%}.bx-wrapper .bx-caption span{color:#fff;font-family:Arial;display:block;font-size:.85em;padding:10px}", ""])
        },
        s8i1: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.Analytics = o.Analytics || r.Base.extend({
                    context: null,
                    omnitureConfig: {
                        openDrawer: "Leaderboard Player Drawer Expand",
                        closeDrawer: "Leaderboard Player Drawer Closed",
                        openDrawerVideo: "Drawer Closed Video – {playerName}",
                        closeDrawerVideo: "Drawer Open Video – {playerName}",
                        openDrawerArticles: "Drawer Closed Article – {playerName}",
                        closeDrawerArticles: "Drawer Open Article – {playerName}",
                        pbpEnabled: "Leaderboard - Global Play by Play Enabled",
                        pbpDisabled: "Leaderboard - Global Play by Play Disabled",
                        stGroupView: "View Group – {playerName}",
                        stPlayerView: "View Player – {playerName}",
                        stGreenView: "View Green – {playerName}",
                        stHoleView: "View Entire Hole – {playerName}",
                        pinPlayer: "Leaderboard - Player Pinned on Leaderboard",
                        unpinPlayer: "Leaderboard - Player Removed on Leaderboard",
                        selectPlayer: "Leaderboard - Select Player Dropdown Clicked",
                        pbpTab: "View Play-By-Play – {playerName}",
                        statsTab: "View Statistics – {playerName}",
                        shotTrackerTab: "View Shot Tracker – {playerName}",
                        strackaTab: "View Strackaline - {playerName}",
                        playerProfile: "View Player Profile – {playerName}",
                        fullScorecards: "View Player Scorecard – {playerName}",
                        videosTab: "Leaderboard Drawer - {breakpoint} - Video Tab Tapped",
                        videoThumbTapped: "Leaderboard Drawer - {breakpoint} - Video tab - Video Thumbnail Tapped",
                        videoRowTapped: "Leaderboard Drawer - {breakpoint} - Video Thumbnail Tapped",
                        playVideoButton: "Leaderboard Drawer - Shot Tracker - Play Video Button Tapped",
                        playVideo: "View Video – {playerName}",
                        articlesTab: "View Articles – {playerName}",
                        openArticle: "View Article – {playerName}",
                        modalButton: "Leaderboard Shot Tracker modal button",
                        modalGreenView: "Leaderboard Shot Tracker green view button",
                        modalHoleView: "Leaderboard Shot Tracker hole view button",
                        modalGroupView: "Leaderboard Shot Tracker modal group view button",
                        modalPlayerView: "Leaderboard Shot Tracker modal player view button",
                        highlightPlayerColor: "Leaderboard - Row Color Selected"
                    },
                    constructor: function(e) {
                        this.base(), this.context = e
                    },
                    _omniture: function(t, o, a, n) {
                        if (this.context.config.omnitureEnabled && o) {
                            var i = o;
                            if (t) {
                                var d = this._getPlayerName(t);
                                if (!d) return;
                                i = i.replace("{playerName}", d)
                            }
                            var s = "Desktop";
                            r.isMediumScreen() ? s = "Tablet" : r.isSmallScreen() && (s = "Mobile"), i = i.replace("{breakpoint}", s), r.Omniture.trackLink(i, n || {}, a ? e(a) : null)
                        }
                    },
                    _getPlayerName: function(e) {
                        var t = this.context.leaderboardModel.getPlayer(e);
                        return t ? t.player_bio.first_name + " " + t.player_bio.last_name : null
                    },
                    toggleDrawer: function(e, t, r, o) {
                        var a = this.omnitureConfig;
                        if (r) switch (r) {
                            case "videos":
                                this._omniture(e, t ? a.openDrawerVideo : a.closeDrawerVideo, o);
                                break;
                            case "photos":
                                break;
                            case "articles":
                                this._omniture(e, t ? a.openDrawerArticles : a.closeDrawerArticles, o)
                        } else {
                            var n = this._getPlayerName(e),
                                i = {
                                    events: t ? "event59" : "",
                                    prop74: n
                                };
                            this._omniture(null, t ? a.openDrawer : a.closeDrawer, o, i)
                        }
                    },
                    pinPlayer: function(e, t) {
                        var r = this.context.config.omnitureEnabled;
                        this.context.config.omnitureEnabled = !0;
                        var o = {
                            events: "event55",
                            prop70: this._getPlayerName(e)
                        };
                        this._omniture(null, this.omnitureConfig.pinPlayer, t, o), this.context.config.omnitureEnabled = r
                    },
                    unpinPlayer: function(e, t) {
                        var r = this.context.config.omnitureEnabled;
                        this.context.config.omnitureEnabled = !0;
                        var o = {
                            events: "event56",
                            prop70: this._getPlayerName(e)
                        };
                        this._omniture(null, this.omnitureConfig.unpinPlayer, t, o), this.context.config.omnitureEnabled = r
                    },
                    selectPlayer: function(e) {
                        this.pinPlayer(e, null), this._omniture(null, this.omnitureConfig.selectPlayer, null, {
                            events: "event57"
                        })
                    },
                    inactivePlayerLink: function() {},
                    stGroupView: function(e, t, r) {
                        var o, a = this.omnitureConfig.stGroupView;
                        r && (o = {
                            events: "event53",
                            eVar12: "Shot Tracker Modal"
                        }, a = this.omnitureConfig.modalGroupView), this._omniture(e, a, t, o)
                    },
                    stPlayerView: function(e, t, r) {
                        var o, a = this.omnitureConfig.stPlayerView;
                        r && (o = {
                            events: "event53",
                            eVar12: "Shot Tracker Modal"
                        }, a = this.omnitureConfig.modalPlayerView), this._omniture(e, a, t, o)
                    },
                    stHoleView: function(e, t, r) {
                        var o, a = this.omnitureConfig.stHoleView;
                        r && (o = {
                            events: "event49",
                            eVar12: "Shot Tracker Modal"
                        }, a = this.omnitureConfig.modalHoleView), this._omniture(e, a, t, o)
                    },
                    stGreenView: function(e, t, r) {
                        var o, a = this.omnitureConfig.stGreenView;
                        r && (o = {
                            events: "event49",
                            eVar12: "Shot Tracker Modal"
                        }, a = this.omnitureConfig.modalGreenView), this._omniture(e, a, t, o)
                    },
                    clickModalView: function(e, t) {
                        this._omniture(e, this.omnitureConfig.modalButton, t, {
                            events: "event45",
                            eVar12: "Shot Tracker Modal"
                        })
                    },
                    trackOrientationChange: function(e, t) {
                        var r = "event46";
                        "portrait" === t && (r = "event47");
                        var o = {
                            events: r,
                            eVar12: "Shot Tracker Modal"
                        };
                        this._omniture(e, o.eVar12, null, o)
                    },
                    drawerTabSelect: function(e, t, r) {
                        if (t) switch (t) {
                            case "videos":
                                this._omniture(e, this.omnitureConfig.videosTab, r);
                                break;
                            case "playbyplay":
                                this._omniture(e, this.omnitureConfig.pbpTab, r);
                                break;
                            case "stats":
                                this._omniture(e, this.omnitureConfig.statsTab, r);
                                break;
                            case "articles":
                                this._omniture(e, this.omnitureConfig.articlesTab, r);
                                break;
                            case "shottracker":
                                this._omniture(e, this.omnitureConfig.shotTrackerTab, r);
                                break;
                            case "stracka":
                                var o = this.context.config.omnitureEnabled;
                                this.context.config.omnitureEnabled = !0, this._omniture(e, this.omnitureConfig.strackaTab, r), this.context.config.omnitureEnabled = o
                        }
                    },
                    drawerPlayerProfile: function(e, t) {
                        this._omniture(e, this.omnitureConfig.playerProfile, t)
                    },
                    drawerFullScorecards: function(e, t) {
                        this._omniture(e, this.omnitureConfig.fullScorecards, t)
                    },
                    drawerThumbnailTapped: function(e, t) {
                        this._omniture(e, this.omnitureConfig.videoThumbTapped, t)
                    },
                    drawerVideoRowThumbnailTapped: function(e, t) {
                        this._omniture(e, this.omnitureConfig.videoRowTapped, t)
                    },
                    drawerPlayVideoButton: function(e, t) {
                        this._omniture(e, this.omnitureConfig.playVideoButton, t)
                    },
                    drawerPlayVideo: function(e, t) {
                        this._omniture(e, this.omnitureConfig.playVideo, t)
                    },
                    drawerOpenArticle: function(e, t) {
                        this._omniture(e, this.omnitureConfig.openArticle, t)
                    },
                    drawerFullStats: function() {},
                    toggleGlobalPbp: function(e) {
                        this._omniture(null, e ? this.omnitureConfig.pbpEnabled : this.omnitureConfig.pbpDisabled, null)
                    },
                    highlightPlayer: function(e, t, r) {
                        var o = this.omnitureConfig;
                        this._omniture(e, o.highlightPlayerColor, r, {
                            events: "event58"
                        })
                    }
                })
            }(jQuery, window, pgatour)
        },
        t54z: function(e, t, r) {
            var o = r("QKvj");
            "string" == typeof o && (o = [
                [e.i, o, ""]
            ]);
            var a = {
                hmr: !0,
                transform: void 0,
                insertInto: void 0
            };
            r("aET+")(o, a);
            o.locals && (e.exports = o.locals)
        },
        tl1q: function(e, t) {
            (function() {
                (function() {
                    ! function(e) {
                        e(jQuery)
                    }(function(e) {
                        "use strict";
                        var t = "tinyscrollbar",
                            r = {
                                axis: "y",
                                wheel: !0,
                                wheelSpeed: 40,
                                wheelLock: !0,
                                touchLock: !0,
                                trackSize: !1,
                                thumbSize: !1,
                                thumbSizeMin: 20
                            };

                        function o(o, a) {
                            this.options = e.extend({}, r, a), this._defaults = r, this._name = t;
                            var n = this,
                                i = o.find(".viewport"),
                                d = o.find(".overview"),
                                s = o.find(".scrollbar"),
                                l = s.find(".track"),
                                c = s.find(".thumb"),
                                h = "ontouchstart" in document.documentElement,
                                p = "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll",
                                u = "x" === this.options.axis,
                                m = u ? "width" : "height",
                                b = u ? "left" : "top",
                                f = 0;

                            function g() {
                                return n.contentPosition > 0
                            }

                            function w() {
                                return n.contentPosition <= n.contentSize - n.viewportSize - 5
                            }

                            function x(r, o) {
                                n.hasContentToSroll && (e("body").addClass("noSelect"), f = o ? c.offset()[b] : u ? r.pageX : r.pageY, h && (document.ontouchmove = function(e) {
                                    (n.options.touchLock || g() && w()) && e.preventDefault(), e.touches[0][t + "Touch"] = 1, v(e.touches[0])
                                }, document.ontouchend = k), e(document).bind("mousemove", v), e(document).bind("mouseup", k), c.bind("mouseup", k), l.bind("mouseup", k), v(r))
                            }

                            function y(t) {
                                if (n.hasContentToSroll) {
                                    var r = t || window.event,
                                        a = -(r.deltaY || r.detail || -1 / 3 * r.wheelDelta) / 40,
                                        i = 1 === r.deltaMode ? n.options.wheelSpeed : 1;
                                    n.contentPosition -= a * i * n.options.wheelSpeed, n.contentPosition = Math.min(n.contentSize - n.viewportSize, Math.max(0, n.contentPosition)), n.thumbPosition = n.contentPosition / n.trackRatio, o.trigger("move"), c.css(b, n.thumbPosition), d.css(b, -n.contentPosition), (n.options.wheelLock || g() && w()) && (r = e.event.fix(r)).preventDefault()
                                }
                                t.stopPropagation()
                            }

                            function v(e) {
                                if (n.hasContentToSroll) {
                                    var r = u ? e.pageX : e.pageY,
                                        a = e[t + "Touch"] ? f - r : r - f,
                                        i = Math.min(n.trackSize - n.thumbSize, Math.max(0, n.thumbPosition + a));
                                    n.contentPosition = i * n.trackRatio, o.trigger("move"), c.css(b, i), d.css(b, -n.contentPosition)
                                }
                            }

                            function k() {
                                n.thumbPosition = parseInt(c.css(b), 10) || 0, e("body").removeClass("noSelect"), e(document).unbind("mousemove", v), e(document).unbind("mouseup", k), c.unbind("mouseup", k), l.unbind("mouseup", k), document.ontouchmove = document.ontouchend = null
                            }
                            return this.contentPosition = 0, this.viewportSize = 0, this.contentSize = 0, this.contentRatio = 0, this.trackSize = 0, this.trackRatio = 0, this.thumbSize = 0, this.thumbPosition = 0, this.hasContentToSroll = !1, this.update = function(e) {
                                var t = m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();
                                switch (this.viewportSize = i[0]["offset" + t], this.contentSize = d[0]["scroll" + t], this.contentRatio = this.viewportSize / this.contentSize, this.trackSize = this.options.trackSize || this.viewportSize, this.thumbSize = Math.min(this.trackSize, Math.max(this.options.thumbSizeMin, this.options.thumbSize || this.trackSize * this.contentRatio)), this.trackRatio = (this.contentSize - this.viewportSize) / (this.trackSize - this.thumbSize), this.hasContentToSroll = this.contentRatio < 1, s.toggleClass("disable", !this.hasContentToSroll), e) {
                                    case "bottom":
                                        this.contentPosition = Math.max(this.contentSize - this.viewportSize, 0);
                                        break;
                                    case "relative":
                                        this.contentPosition = Math.min(Math.max(this.contentSize - this.viewportSize, 0), Math.max(0, this.contentPosition));
                                        break;
                                    default:
                                        this.contentPosition = parseInt(e, 10) || 0
                                }
                                return this.thumbPosition = this.contentPosition / this.trackRatio, c.css(b, n.thumbPosition), d.css(b, -n.contentPosition), s.css(m, n.trackSize), l.css(m, n.trackSize), c.css(m, n.thumbSize), n
                            }, n.update(), h && (i[0].ontouchstart = function(e) {
                                1 === e.touches.length && (e.stopPropagation(), x(e.touches[0]))
                            }), c.bind("mousedown", function(e) {
                                e.stopPropagation(), x(e)
                            }), l.bind("mousedown", function(e) {
                                x(e, !0)
                            }), e(window).resize(function() {
                                n.update("relative")
                            }), n.options.wheel && window.addEventListener ? o[0].addEventListener(p, y, !1) : n.options.wheel && (o[0].onmousewheel = y), n
                        }
                        e.fn[t] = function(r) {
                            return this.each(function() {
                                e.data(this, "plugin_" + t) || e.data(this, "plugin_" + t, new o(e(this), r))
                            })
                        }
                    })
                }).call(window)
            }).call(window)
        },
        vUOX: function(e, t, r) {
            "use strict";
            r("tl1q"), r("As/H"), r("h3Hl"), r("zMq4"), r("Somt"), r("KVBZ"), r("erBK"), r("s8i1"), r("Ln9E"), r("fupk"), r("dYg+"), r("oMHi"), r("RWWH"), r("pysR"), r("30eI"), r("mcjo"), r("xkCN"), r("p2ab"), r("131C"), r("mO0Q"), r("gQ2p"), r("JN8H"), r("c7mE"), r("/3NR"), r("H2BB"), r("oPZr"), r("UINd"), r("9yk6"), r("6MDn"), r("y+cW"), r("yidn"), r("QV8X"), r("DP1d"), r("ShO3"), r("im5B"), r("RQ1K"), r("N2i9"), r("s0Wi"), r("57wg"), r("lTSo"), r("7ARz"), r("Q6xB"), r("qPtc"), r("NLE6"), r("P56D"), r("NYSJ"), r("Xl6b"), r("gZ5a"), r("+t7s"), r("ZaZC"), r("6YZn"), r("iHhp"), r("SJy7"), r("7pA7"), r("NiTS"), r("fuq9"), r("YJ3e"), r("ZGkk"), r("yaGs"), r("xrhZ"), r("t54z")
        },
        xkCN: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.FavouriteLeaderboardPresenter = o.FavouriteLeaderboardPresenter || r.BaseModule.extend({
                    ADD_PLAYER_TEMPLATE: "#lbnPlayerDropDownTemplate",
                    ADD_PLAYER_CONTAINER: "#lbnAddPlayerSelector",
                    MY_LB_CONTAINER: "#lbnMyLeaderboardContainer",
                    MAIN_LB_TITLE: ".leaderboard-main-head",
                    MY_LB_TITLE: ".leaderboard-favorite-head p",
                    MY_LB_AD: "#lbnMyLbAd",
                    context: null,
                    selectorRendered: !1,
                    playerRows: {},
                    $addPlayerTemplate: null,
                    $addPlayerContainer: null,
                    $myLbContainer: null,
                    $mainLbTitle: null,
                    $myLbTitle: null,
                    $myLbAdBlock: null,
                    $myLbAd: null,
                    constructor: function(t) {
                        this.context = t, this.base(this.context.container), this.$addPlayerTemplate = e(this.ADD_PLAYER_TEMPLATE), this.$addPlayerContainer = e(this.ADD_PLAYER_CONTAINER), this.$myLbContainer = e(this.MY_LB_CONTAINER), this.$mainLbTitle = e(this.MAIN_LB_TITLE), this.$myLbTitle = e(this.MY_LB_TITLE), this.$myLbAdBlock = e(this.MY_LB_AD), this.$myLbAd = this.$myLbAdBlock.find(".js-ad").data("ad-api")
                    },
                    renderDropDown: function(e) {
                        e = e || new o.LeaderboardPlayerComparator(this.context, {
                            preference: "last-name",
                            ascending: !0
                        });
                        var t = this.context.leaderboardModel.getPlayers(e, null);
                        if (this.$addPlayerContainer.children().length !== t.length + 1) {
                            this.$addPlayerContainer.empty(), this.$addPlayerContainer.append(this.$addPlayerTemplate.tmpl({}));
                            for (var r = 0; r < t.length; r++) this.$addPlayerContainer.append(this.$addPlayerTemplate.tmpl({
                                player: t[r]
                            }));
                            this.selectorRendered || (this.$addPlayerContainer.width(240).customSelect(), this.selectorRendered = !0), this.$addPlayerContainer.change(this.proxy(this.onClickSelectPlayer))
                        }
                    },
                    onClickSelectPlayer: function(t) {
                        var r = e(t.currentTarget);
                        this.context.analytics.selectPlayer(r.val()), this.context.controller.addToFavourite(r.val()), r.val(0)
                    },
                    renderPlayers: function() {
                        var t = new o.LeaderboardPlayerComparator(this.context, {
                                preference: this.context.userModel.sortPreference,
                                ascending: this.context.userModel.sortAscending
                            }),
                            r = this.context.leaderboardModel.getPlayers(t, this.context.userModel.favouritePlayers);
                        if (r && r.length) {
                            this.$myLbAdBlock.show(), this.$myLbAd && e.isEmptyObject(this.playerRows) && r.length && this.$myLbAd.resume();
                            for (var a = null, n = 0; n < r.length; n++) {
                                var i = r[n].player_id;
                                this.updatePlayerRows(i, a, n), this.playerRows[i].render(n), a = this.playerRows[i].playerRow
                            }
                            this.$mainLbTitle.show(), this.$myLbTitle.show()
                        }
                    },
                    updatePlayerRows: function(e, t, r) {
                        this.playerRows.hasOwnProperty(e) && this.playerRows[e] ? this.playerRows[e].playerRow.attr(o.PlayerRow.INDEX_ATTRIBUTE) !== r.toString() && (t ? t.after(this.playerRows[e].playerRow) : this.$myLbContainer.prepend(this.playerRows[e].playerRow), this.playerRows[e].updateAdvertisement = !0) : this.playerRows[e] = new o.PlayerRow(this.$myLbContainer, e, !0, this.context)
                    },
                    removePlayer: function(t) {
                        var r = this.playerRows[t];
                        r && (r.playerRow.remove(), this.playerRows[t] = null, delete this.playerRows[t], e.isEmptyObject(this.playerRows) && (this.$mainLbTitle.hide(), this.$myLbTitle.hide(), this.$myLbAdBlock.hide(), this.$myLbAd && this.$myLbAd.suspend()))
                    }
                })
            }(jQuery, window, pgatour)
        },
        xrhZ: function(e, t, r) {
            var o = r("d4Xb");
            "string" == typeof o && (o = [
                [e.i, o, ""]
            ]);
            var a = {
                hmr: !0,
                transform: void 0,
                insertInto: void 0
            };
            r("aET+")(o, a);
            o.locals && (e.exports = o.locals)
        },
        "y+cW": function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.AbstractScorecardsTab = o.AbstractScorecardsTab || o.AbstractTab.extend({
                    TEMPLATE: "#lbnScorecardsTemplate",
                    TABLES: ".scorecards-box li",
                    NEXT: ".scorecards-box table .scorecards-next, .scorecards-box table .scorecards-prev",
                    SELECTABLE_HOLES: ".scorecards-box .hole-selectable",
                    CURRENT_HOLE_CLASS: "active",
                    HOLE_PICKER: ".scorecards-box a.hole-picker",
                    SCORECARDS_CONTAINER: ".scorecards-box",
                    SCORECARDS_TEMPLATE: "#lbnScorecardsEntriesTemplate",
                    scorecardsContainer: null,
                    context: null,
                    pid: null,
                    currentHole: null,
                    currentPlayerMode: null,
                    selectableHoles: null,
                    holePicker: null,
                    tables: null,
                    nextTableButton: null,
                    template: null,
                    constructor: function(e, t, r, o, a, n, i) {
                        this.base(e, t, r, o, a, n, i), this.currentHole = this.player.course_hole || this.player.start_hole || 1, this.currentRound = this.player.current_round || 1
                    },
                    render: function() {
                        var e = this.context.config.getOrCreate(this.TEMPLATE);
                        this.template = this.context.config.getOrCreate(this.SCORECARDS_TEMPLATE), this.base(), this.container.append(e.tmpl({
                            scoringType: this.context.leaderboardModel.scoringType,
                            player: this.player,
                            hasMedia: this.context.media.hasMedia(this.pid),
                            holeToShow: this.currentHole,
                            utils: this.context.utils
                        })), this._setElements(), this.nextTableButton.click(this.proxy(this.onNextTableButtonClick)), this._initHoleSelector(), this.getRow(this.player.player_id).initHoleVideos(this.type), this.context.leaderboardModal.updateShotTracker(this.player.player_id, this.isMyLb)
                    },
                    renderMediaContent: function(e) {
                        this.contentContainer || (this.contentContainer = this.container.find(this.CONTENT_SELECTOR)), this.contentContainer.empty();
                        for (var t = 0; t < e.items.length; t++) {
                            var r = e.items[t]; - 1 !== this.contentType.indexOf(r.type) && (this.context.config.getOrCreate(this.TAB_ENTRY_TEMPLATE).tmpl({
                                item: r,
                                pid: this.pid,
                                utils: this.context.utils
                            }).appendTo(this.contentContainer), "video" === r.type && this.videos.push(r))
                        }
                    },
                    _setElements: function() {
                        this.scorecardsContainer = this.container.find(this.SCORECARDS_CONTAINER), this.selectableHoles = this.container.find(this.SELECTABLE_HOLES), this.holePicker = this.container.find(this.HOLE_PICKER), this.nextTableButton = this.container.find(this.NEXT), this.tables = this.container.find(this.TABLES)
                    },
                    getPlayerHoles: function(e) {
                        for (var t, r = [e.holes[this.currentHole - 1]], o = 0; o < e.otherPlayers.length; o++)(t = e.otherPlayers[o]).holes && r.push(t.holes[e.selectedHole - 1]);
                        return r
                    },
                    getPlayerNames: function(e) {
                        for (var t, r = [{
                                firstName: e.player_bio.first_name,
                                lastName: e.player_bio.last_name,
                                displayName: e.player_bio.display_name
                            }], o = 0; o < e.otherPlayers.length; o++)(t = e.otherPlayers[o]).playerBio && r.push({
                            firstName: t.playerBio.firstName,
                            lastName: t.playerBio.lastName,
                            displayName: t.playerBio.displayName
                        });
                        return r
                    },
                    buildShotTrailsOptions: function(e) {
                        return {
                            allowLegendEvents: !1,
                            course: e.course,
                            hole: e.selectedHole,
                            lineColors: [{
                                name: "yellow",
                                value: "#ffff00"
                            }, {
                                name: "red",
                                value: "#ff0000"
                            }, {
                                name: "green",
                                value: "#00ff00"
                            }, {
                                name: "blue",
                                value: "#0eebde"
                            }],
                            markerImageUrl: this.context.config.shotTrackerResourcesUrl,
                            playerHoles: this.getPlayerHoles(e),
                            playerMode: this.currentPlayerMode,
                            playerNames: this.getPlayerNames(e),
                            round: e.selectedRoundId,
                            scoringType: this.context.leaderboardModel.scoringType,
                            showHoleDetails: !0,
                            showHoleRank: !0,
                            showLegend: !0,
                            showToolTips: -1 === this.context.userModel.toolTipsWasShownOnTabs.indexOf(this.type),
                            tour: this.context.leaderboardModel.tourCode,
                            tourId: this.context.leaderboardModel.tournamentId,
                            year: this.context.leaderboardModel.year
                        }
                    },
                    _initHoleSelector: function() {
                        this.holePicker.click(this.proxy(this.onHolePickerClick))
                    },
                    initHoleVideo: function(e, t) {
                        if (this.currentRound === e) {
                            var r = this.tables.find('td[data-hole-number="' + t + '"] .has-video');
                            r && r.length && r.show()
                        }
                    },
                    setCurrentHole: function(e, t) {
                        this.currentHole = parseInt(e, 10) || 1, this.currentRound = parseInt(t, 10) || 1, this.selectableHoles.removeClass(this.CURRENT_HOLE_CLASS);
                        var r = "[" + o.AbstractScorecardsTab.HOLE_NUMBER_ATTRIBUTE_KEY + "=" + this.currentHole + "]";
                        this.selectableHoles.filter(r).addClass(this.CURRENT_HOLE_CLASS), this.setCurrentTableView()
                    },
                    setCurrentPlayerMode: function(e) {
                        this.currentPlayerMode = e
                    },
                    setCurrentTableView: function() {
                        if (!this.isSmallScreenTab) {
                            this.tables.hide();
                            var e = "[" + o.AbstractScorecardsTab.HOLE_NUMBER_ATTRIBUTE_KEY + "=" + this.currentHole + "]";
                            this.selectableHoles.filter(e).parents(this.TABLES).show()
                        }
                    },
                    show: function(e) {
                        this.base(e), this.setCurrentTableView()
                    },
                    update: function(e) {
                        this.base(e), this.holePicker.unbind("click"), this.scorecardsContainer.html(this.template.tmpl({
                            scoringType: this.context.leaderboardModel.scoringType,
                            player: e,
                            hasMedia: this.context.media.hasMedia(this.pid),
                            holeToShow: this.currentHole,
                            utils: this.context.utils
                        })), this._setElementsUpdate(), this.nextTableButton.unbind("click"), this.nextTableButton.click(this.proxy(this.onNextTableButtonClick)), this._initHoleSelector(), this.getRow(e.player_id).initHoleVideos(this.type)
                    },
                    _setElementsUpdate: function() {
                        this.selectableHoles = this.container.find(this.SELECTABLE_HOLES), this.holePicker = this.container.find(this.HOLE_PICKER), this.nextTableButton = this.container.find(this.NEXT), this.tables = this.container.find(this.TABLES)
                    },
                    getRow: function(e) {
                        return this.isMyLb ? this.context.favouritePresenter.playerRows[e] : this.context.presenter.playerRows[e]
                    },
                    onHolePickerClick: function(t) {
                        var r = e(t.currentTarget).attr(o.AbstractScorecardsTab.HOLE_NUMBER_ATTRIBUTE_KEY);
                        this.context.controller.holeSelect(this.pid, this.isMyLb, r)
                    },
                    onLinkClick: function(t) {
                        var r = e(t.currentTarget).attr(o.AbstractScorecardsTab.VIDEO_ID_ATTRIBUTE_KEY);
                        this.context.analytics.drawerPlayVideoButton(this.pid, t.currentTarget), this.context.controller.playHoleVideo(this.pid, this.isMyLb, r)
                    },
                    onNextTableButtonClick: function() {
                        this.tables.toggle(), this.context.leaderboardModal.updateShotTracker(this.player.player_id, this.isMyLb)
                    }
                }), o.AbstractScorecardsTab.HOLE_NUMBER_ATTRIBUTE_KEY = "data-hole-number", o.AbstractScorecardsTab.VIDEO_ID_ATTRIBUTE_KEY = "data-video-id"
            }(jQuery, window, pgatour)
        },
        yaGs: function(e, t, r) {
            var o = r("Dg37");
            "string" == typeof o && (o = [
                [e.i, o, ""]
            ]);
            var a = {
                hmr: !0,
                transform: void 0,
                insertInto: void 0
            };
            r("aET+")(o, a);
            o.locals && (e.exports = o.locals)
        },
        yidn: function(e, t) {
            ! function(e, t, r) {
                var o = r.setModulePath("leaderboard2", "newlb");
                o.ArticlesTab = o.ArticlesTab || o.AbstractMediaTab.extend({
                    TAB_TEMPLATE: "#lbnArticlesTemplate",
                    SCROLLER_SELECTOR: ".scroller",
                    scroller: null,
                    scrollerSelector: null,
                    tabTemplate: null,
                    constructor: function(e, t, r, o, a, n) {
                        this.base({
                            context: e,
                            player: n,
                            isMyLb: t,
                            container: r,
                            selectorContainer: o,
                            type: "articles",
                            tabSize: a,
                            contentTemplate: "#lbnArticleEntryTemplate",
                            contentContainer: ".overview",
                            contentType: ["article", "nsarticle"]
                        })
                    },
                    render: function() {
                        this.tabTemplate = this.context.config.getOrCreate(this.TAB_TEMPLATE), this.base(), this.container.html(this.tabTemplate.tmpl({
                            player: this.context.leaderboardModel.players[this.pid],
                            tags: this.mediaTags
                        })), this.scrollerSelector = this.container.find(this.SCROLLER_SELECTOR), this.context.dataLoader.loadArticles(this.pid)
                    },
                    show: function() {
                        this.base(), this.updateScroller()
                    }
                })
            }(jQuery, window, pgatour)
        },
        zMq4: function(e, t) {
            ! function(e, t, r) {
                r.DrawerModalShottrackerTab = r.DrawerModalShottrackerTab || r.BaseModule.extend({
                    SHOT_TRACKER_CONTAINER: ".shot-tracker-container",
                    ROW_SCORECARDS_TABLE: ".container-shottracker .scorecards-box",
                    SCORECARDS_TABLE: ".scorecards-table",
                    SCORECARDS_HOLE_PICKER: ".hole-picker",
                    SCORECARDS_NEXT_PREV: ".scorecards-next, .scorecards-prev",
                    SCORECARDS_VIDEO_THUMB: ".has-video",
                    PLAY_VIDEO_SELECTOR: ".play-video-button",
                    ROW_NEXT_PREV: ".container-shottracker .scorecards-next",
                    DETAILS_MAP_INFO: ".container-shottracker .details-map-info",
                    DETAILS_MAP_INFO_CONTAINER: ".details-map-info-container",
                    GREEN_VIEW_TOGGLE: ".zoom-in",
                    GREEN_VIEW_ENABLED_CLASS: "green-view-enabled",
                    ROW_GREEN_VIEW_TOGGLE: ".container-shottracker .zoom-in",
                    HOLE_VIEW_TOGGLE: ".zoom-out",
                    ROW_HOLE_VIEW_TOGGLE: ".container-shottracker .zoom-out",
                    GROUP_SINGLE_SWITCHER: ".group-single-switcher",
                    GROUP_VIEW_TOGGLE: ".view-group",
                    ROW_GROUP_VIEW_TOGGLE: ".container-shottracker .view-group",
                    SINGLE_VIEW_TOGGLE: ".view-single",
                    ROW_SINGLE_VIEW_TOGGLE: ".container-shottracker .view-single",
                    ROUND_SELECTOR_CONTAINER: ".round-selector-container",
                    ROW_ROUND_SELECTOR: ".round-selector-container",
                    LEGEND: ".container-shottracker .details-map-legend",
                    LEGEND_CONTAINER: ".shot-tracker-legend-container.legend",
                    PLAYER_NAME_MOBILE: ".shot-tracker-legend-container.mobile",
                    SMALL_SCREEN_HOLE_SWITCHER: ".small-screen-hole-switcher",
                    CURRENT_HOLE: ".hole-selectable.active",
                    NEXT_HOLE_BUTTON: ".next-hole",
                    PREV_HOLE_BUTTON: ".prev-hole",
                    SHOTTRACKER_IMAGE_WIDTH: 720,
                    SHOTTRACKER_IMAGE_BACKGROUND: "424141",
                    constructor: function(e, t) {
                        this.config = t, this.base(e)
                    },
                    init: function() {
                        this.$shotTrackerContainer = this.container.find(this.SHOT_TRACKER_CONTAINER), this.$legendContainer = this.container.find(this.LEGEND_CONTAINER), this.$playerNameMobile = this.container.find(this.PLAYER_NAME_MOBILE), this.$detailsMapInfoContainer = this.container.find(this.DETAILS_MAP_INFO_CONTAINER), this.$greenViewButton = this.container.find(this.GREEN_VIEW_TOGGLE), this.$holeViewButton = this.container.find(this.HOLE_VIEW_TOGGLE), this.$groupSingleSwitcher = this.container.find(this.GROUP_SINGLE_SWITCHER), this.$groupViewButton = this.container.find(this.GROUP_VIEW_TOGGLE), this.$singleViewButton = this.container.find(this.SINGLE_VIEW_TOGGLE), this.$scorecardsTable = this.container.find(this.SCORECARDS_TABLE), this.$roundSelectorContainer = this.container.closest(".window").find(this.ROUND_SELECTOR_CONTAINER), this.$smallScreenHoleSwitcher = this.container.find(this.SMALL_SCREEN_HOLE_SWITCHER), this.$nextHoleButton = this.$smallScreenHoleSwitcher.find(this.NEXT_HOLE_BUTTON), this.$prevHoleButton = this.$smallScreenHoleSwitcher.find(this.PREV_HOLE_BUTTON), this.$playButton = this.container.find(this.PLAY_VIDEO_SELECTOR), this.$playButton.on("click", this.proxy(this.onPlayClick)), this.$greenViewButton.on("click", this.proxy(this.toggleGreenView, !0)), this.$holeViewButton.on("click", this.proxy(this.toggleGreenView, !1)), this.$groupViewButton.on("click", this.proxy(this.toggleGroupView, !0)), this.$singleViewButton.on("click", this.proxy(this.toggleGroupView, !1)), this.container.on("click", this.SCORECARDS_HOLE_PICKER, this.proxy(this.onScorecardsHolePickerClick)), this.container.on("click", this.SCORECARDS_NEXT_PREV, this.proxy(this.onScorecardsNextClick)), this.$nextHoleButton.on("click", this.proxy(this.selectNextHole)), this.$prevHoleButton.on("click", this.proxy(this.selectPrevHole)), this.base()
                    },
                    open: function(e, t) {
                        this.row = e, this.$row = t, this.resetState();
                        var r = this.row && this.row.expansion && this.row.expansion.tabs,
                            o = r && r.shottracker;
                        return o && this.update(), !!o
                    },
                    resetState: function() {
                        this.$roundSelectorContainer.empty(), this.shotTracker = null
                    },
                    getShotTracker: function() {
                        var e = this.row && this.row.expansion && this.row.expansion.tabs,
                            t = null;
                        if (e && e.shottracker)
                            for (var r = 0; r < e.shottracker.length; r++) {
                                var o = e.shottracker[r];
                                if (o.shotTrackerTab && o.shotTrackerTab.options) {
                                    t = o;
                                    break
                                }
                            }
                        return t
                    },
                    getShotTrackerOptions: function() {
                        var t = this.getShotTracker(),
                            r = t && t.shotTrackerTab && t.shotTrackerTab.options;
                        return r ? e.extend(!0, {}, r) : null
                    },
                    update: function() {
                        if (this.$row) {
                            this.$rowScorecardsTable = this.$row.find(this.ROW_SCORECARDS_TABLE).first();
                            var e = this.$row.find(this.ROW_SCORECARDS_TABLE).first().html();
                            this.$scorecardsTable.html(e), this.updateScorecardLegend(), this.updateScorecardMap(), this.updateRoundSelector(), this.updatePlayButton();
                            var t = this.getShotTrackerOptions();
                            t && this.renderShotTracker(t), this.$groupSingleSwitcher.toggle(t && t.showGroupSingle)
                        }
                    },
                    updateScorecardLegend: function() {
                        var e = this.$row.find(this.LEGEND).first(),
                            t = "";
                        e.length && (t = e[0].outerHTML, t = this.removeScriptsFromHtml(t)), this.$legendContainer.html(t), t || this.$playerNameMobile.addClass("show")
                    },
                    updateScorecardMap: function() {
                        var e = this.$row.find(this.DETAILS_MAP_INFO);
                        if (e.length) {
                            var t = e[0].outerHTML;
                            t = this.removeScriptsFromHtml(t), this.$detailsMapInfoContainer.html(t)
                        }
                    },
                    updateRoundSelector: function() {
                        if (this.$rowRoundSelector = this.$row.find(this.ROUND_SELECTOR_CONTAINER).first(), this.$rowRoundSelector.length) {
                            var e = this.$rowRoundSelector.html();
                            this.$roundSelectorContainer.html(e), this.$roundSelectorContainer.find(".round").on("click", this.proxy(this.onRoundSelectorChange))
                        }
                    },
                    updatePlayButton: function() {
                        if (!r.isSmallScreen()) {
                            var e = "none" !== this.$row.find(this.PLAY_VIDEO_SELECTOR).css("display");
                            this.$playButton.toggle(e)
                        }
                    },
                    getUpdatedShotTrackerOptions: function(e) {
                        this.toggleGreenView("green" === e.fieldMode), this.toggleGroupView("group" === e.playerMode);
                        var t = ",w_" + this.SHOTTRACKER_IMAGE_WIDTH + ",b_rgb:" + this.SHOTTRACKER_IMAGE_BACKGROUND;
                        return e.baseImageUrl = e.baseImageUrl.replace(",h_120", t), e.courseImageUrl = e.courseImageUrl.replace(/\.png$/, ".jpeg"), e.disableResize = !1, e.manualMarkerRatio = .6, e.lineThickness = this.isSmallScreen() ? 3 : 4, e.positionTooltipInsideContainer = !0, e.disableCanvasPositioning = !0, e.onRenderCourseImage = this.config && this.config.onRenderCourseImage, e
                    },
                    renderShotTracker: function(e) {
                        this.$shotTrackerContainer.empty(), this.shotTracker = new r.ShotTracker(this.$shotTrackerContainer, this.getUpdatedShotTrackerOptions(e))
                    },
                    toggleGreenView: function(e) {
                        this.$rowGreenViewButton = this.$row.find(this.ROW_GREEN_VIEW_TOGGLE).first(), this.$rowHoleViewButton = this.$row.find(this.ROW_HOLE_VIEW_TOGGLE).first(), this.shotTracker && (e ? (this.shotTracker.toggleFieldMode("green"), this.$rowGreenViewButton.trigger("click", !0)) : (this.shotTracker.toggleFieldMode("hole"), this.$rowHoleViewButton.trigger("click", !0))), this.$greenViewButton.toggle(!e), this.$holeViewButton.toggle(e), this.container.toggleClass(this.GREEN_VIEW_ENABLED_CLASS, e)
                    },
                    toggleGroupView: function(e) {
                        this.$rowGroupViewButton = this.$row.find(this.ROW_GROUP_VIEW_TOGGLE).first(), this.$rowSingleViewButton = this.$row.find(this.ROW_SINGLE_VIEW_TOGGLE).first(), this.shotTracker && (e ? (this.shotTracker.togglePlayerMode("group"), this.$rowGroupViewButton.trigger("click", !0)) : (this.shotTracker.togglePlayerMode("single"), this.$rowSingleViewButton.trigger("click", !0))), this.$groupViewButton.toggle(!e), this.$singleViewButton.toggle(e), this.$legendContainer.toggle(e), this.$playerNameMobile.toggleClass("show", !e)
                    },
                    getCurrentHoleId: function() {
                        var e = this.$rowScorecardsTable.find(this.CURRENT_HOLE).data("hole-number");
                        return parseInt(e, 10)
                    },
                    selectHole: function(e) {
                        var t = this.$rowScorecardsTable.find('[data-hole-number="' + e + '"]');
                        t.length > 0 && t.trigger("click")
                    },
                    selectPrevHole: function() {
                        var e = this.getCurrentHoleId() - 1;
                        this.selectHole(e)
                    },
                    selectNextHole: function() {
                        var e = this.getCurrentHoleId() + 1;
                        this.selectHole(e)
                    },
                    removeScriptsFromHtml: function(e) {
                        return e.replace(/(<script([^<]+)<\/script>)/gi, "")
                    },
                    filterVideos: function(e, t) {
                        return t.videoId === e
                    },
                    onScorecardsHolePickerClick: function(t) {
                        var r = e(t.target).attr("data-hole-number");
                        this.$row.find('.container-shottracker .hole-picker[data-hole-number="' + r + '"]').trigger("click")
                    },
                    onScorecardsNextClick: function() {
                        this.$row.find(this.ROW_NEXT_PREV).first().trigger("click")
                    },
                    onPlayClick: function() {
                        var e = this.$row.find(this.PLAY_VIDEO_SELECTOR).attr("data-video-id"),
                            t = this.config.drawerModal.videos.filter(this.filterVideos.bind(this, e));
                        t.length && this.config.drawerModal.playModalVideo(t[0])
                    },
                    onRoundSelectorChange: function(t) {
                        var r = e(t.target).attr("data-round");
                        this.$rowRoundSelector.find("[data-round=" + r + "]").trigger("click")
                    }
                })
            }(jQuery, window, pgatour)
        }
    }
]);