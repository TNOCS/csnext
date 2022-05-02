<template>
  <div class="full-height" v-if="source">
    <v-layout class="ma-4" v-if="!options.hideHeader">
      <div v-if="featureType" class="data-grid-title">
        <v-btn icon @click="toggleSettings()" v-if="featureType.icon" class="mr-4"
          ><v-icon>{{ featureType.icon }}</v-icon></v-btn
        >{{ $cs.Translate(options.title) }}<span v-if="filterTitle"> : {{ filterTitle }}</span>
      </div>

      <v-menu offset-y v-if="options.canAdd && classTypes.length > 1">
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed v-bind="attrs" class="ml-2 primary" elevation="0" v-on="on" @keydown.native.alt.78="addEntity(classTypes[0])">
            <v-icon>mdi-plus</v-icon>
            {{ $cs.Translate('CREATE_ITEM') }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in classTypes" :key="index" @click="addEntity(item)">
            <v-list-item-icon
              ><v-icon>{{ item.icon }}</v-icon></v-list-item-icon
            >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        @keydown.native.alt.78="addEntity(classTypes[0])"
        @click="addEntity(classTypes[0])"
        v-else-if="options.canAdd"
        depressed
        class="ml-2"
        elevation="0"
      >
        <v-icon>mdi-plus</v-icon>
        {{ $cs.Translate('CREATE_ITEM') }}
      </v-btn>

      <v-btn v-if="options.linkOptions" @click="linkElement()" depressed class="ml-2 primary" elevation="0">
        <v-icon>mdi-link</v-icon>
        <!-- {{ $cs.Translate('_ITEM') }} -->
      </v-btn>
      <template v-if="options.defaultView == 'table'">
        <v-btn v-if="selectedElements && selectedElements.length > 0" depressed class="ml-4" elevation="0" @click="deleteSelection()">
          <v-icon>mdi-delete</v-icon>
          {{ selectedElements.length }}
        </v-btn>

        <v-btn v-if="selectedElements && selectedElements.length > 0" depressed class="ml-4" elevation="0" @click="unselectAll()">
          <v-icon>mdi-select</v-icon>
          {{ selectedElements.length }}
        </v-btn>

        <v-btn v-if="selectedElements && selectedElements.length < items.length" depressed class="ml-4" elevation="0" @click="selectAll()">
          <v-icon>mdi-check-all</v-icon>
        </v-btn>
      </template>
      <template v-if="options.defaultView == 'kanban' && options.kanBanOptions && options.kanbanOptions.columnPropertySelection">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed v-bind="attrs" class="ml-2" elevation="0" v-on="on">
              <v-icon>mdi-blur</v-icon>
              {{ options.kanbanOptions.columnProperty }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(prop, index) in options.kanbanOptions.columnPropertySelection" :key="index" @click="selectKanbanProperty(prop)">
              <v-list-item-title>{{ prop }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-if="options.canFilter">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed v-bind="attrs" class="ml-2" elevation="0" v-on="on">
              <v-icon>mdi-filter-check</v-icon>
              <span v-if="filterProperty">{{ filterProperty.label }}</span>
              <span v-else><v-icon>mdi-plus</v-icon></span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="setFilterProperty(undefined)"><v-list-item-title>[all]</v-list-item-title></v-list-item>
            <v-list-item v-for="(prop, pi) in filterProperties" :key="pi" @click="setFilterProperty(prop.key)"
              ><v-list-item-title>{{ prop.label }}</v-list-item-title></v-list-item
            >
            <!-- <v-list-item v-for="(prop, index) in options.kanbanOptions.columnPropertySelection" :key="index" @click="selectKanbanProperty(prop)">
            <v-list-item-title>{{ prop }}</v-list-item-title>
          </v-list-item> -->
          </v-list>
        </v-menu>
        <v-menu offset-y v-if="filterProperty">
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed v-bind="attrs" class="ml-2" elevation="0" v-on="on">
              <span v-if="filterTitle">{{ filterTitle }}</span>
              <span v-else>[select]</span>
            </v-btn>
          </template>
          <v-list v-if="filterValues">
            <v-list-item @click="setFilterValue(undefined)"><v-list-item-title>[all]</v-list-item-title></v-list-item>
            <v-list-item v-for="(value, key) in Object.keys(filterValues)" :key="key" @click="setFilterValue(value)"
              ><v-list-item-title>{{ filterValues[value] }}</v-list-item-title></v-list-item
            >
            <!-- <v-list-item v-for="(prop, index) in options.kanbanOptions.columnPropertySelection" :key="index" @click="selectKanbanProperty(prop)">
            <v-list-item-title>{{ prop }}</v-list-item-title>
          </v-list-item> -->
          </v-list>
        </v-menu>
      </template>

      <v-btn v-if="options.defaultView == 'tree' && options.relationToggle" class="ml-2" @click="linkAll()" elevation="0">
        <v-icon>mdi-checkbox-multiple-marked-circle-outline</v-icon>
        <!-- {{ $cs.Translate('LINK_ALL') }} -->
      </v-btn>
      <v-btn v-if="options.defaultView == 'tree' && options.relationToggle" class="ml-2" @click="unLinkAll()" elevation="0">
        <v-icon>mdi-checkbox-multiple-blank-circle-outline</v-icon>
        <!-- {{ $cs.Translate('UNLINK_ALL') }} -->
      </v-btn>
      <v-btn v-if="options.defaultView == 'tree'" class="ml-2" @click="expandTree()" elevation="0">
        <v-icon>mdi-chevron-down</v-icon>
        <!-- {{ $cs.Translate('EXPAND_ALL') }} -->
      </v-btn>
      <v-btn v-if="options.defaultView == 'tree'" class="ml-2" @click="collapseTree()" elevation="0">
        <v-icon>mdi-chevron-up</v-icon>
        <!-- {{ $cs.Translate('COLLAPSE_ALL') }} -->
      </v-btn>

      <v-spacer></v-spacer>
      <template v-if="searchEnabled">
        <v-text-field
          label="search"
          dense
          filled
          focus
          rounded
          hide-details="auto"
          ref="searchInput"
          class="full-search"
          single-line
          @click:append="closeSearch()"
          append-icon="mdi-close"
          @input="updateSearchFilter()"
          v-model="options.searchFilter"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </template>
      <div class="grid-action-buttons">
        <v-btn v-if="options.canSearch && !searchEnabled" @click="openSearch()" tile icon class="grid-action-button">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn
          v-if="options.grouping && options.grouping.enabled && options.defaultView === 'cards'"
          @click="toggleGrouping()"
          tile
          icon
          class="grid-action-button"
        >
          <v-icon>mdi-format-list-group</v-icon>
        </v-btn>

        <v-menu v-if="options.defaultView === 'cards'" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" class="grid-action-button" v-on="on">
              <v-icon v-if="options.cardOptions.cardSize === 'large'">mdi-size-l</v-icon>
              <v-icon v-else-if="options.cardOptions.cardSize === 'small'">mdi-size-s</v-icon>
              <v-icon v-else-if="options.cardOptions.cardSize === 'medium'">mdi-size-m</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="setCardSize('small')">
              <v-list-item-title>Small</v-list-item-title>
            </v-list-item>
            <v-list-item @click="setCardSize('medium')">
              <v-list-item-title>Medium</v-list-item-title>
            </v-list-item>
            <v-list-item @click="setCardSize('large')">
              <v-list-item-title>Large</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn @click="toggleSettings()" tile icon class="grid-action-button">
          <v-icon>mdi-tune</v-icon>
        </v-btn>
      </div>

      <v-btn-toggle borderless tile group v-model="options.defaultView" mandatory v-if="!options.hideViewSwitch">
        <v-btn value="list" class="default-view-button">
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>

        <v-btn value="table" v-if="options.tableOptions" class="default-view-button">
          <v-icon>mdi-table</v-icon>
        </v-btn>

        <v-btn value="cards" class="default-view-button">
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>

        <v-btn v-if="options.gridOptions" value="grid" class="default-view-button">
          <v-icon>mdi-view-grid</v-icon>
        </v-btn>

        <v-btn v-if="options.calendarOptions" value="calendar" class="default-view-button">
          <v-icon>mdi-calendar</v-icon>
        </v-btn>

        <!-- <v-btn v-if="options.timelineOptions" value="timeline" class="default-view-button">
          <v-icon>mdi-chart-gantt</v-icon>
        </v-btn> -->

        <v-btn v-if="options.treeOptions" value="tree" class="default-view-button">
          <v-icon>mdi-file-tree</v-icon>
        </v-btn>

        <v-btn v-if="options.newsOptions" value="news" class="default-view-button">
          <v-icon>mdi-newspaper-variant</v-icon>
        </v-btn>

        <v-btn v-if="options.kanbanOptions" value="kanban" class="default-view-button">
          <v-icon>mdi-format-columns</v-icon>
        </v-btn>

        <template v-for="(view, vi) in source.gridPlugins">
        <v-btn v-if="options.hasOwnProperty(view.optionsId)" :key="vi" :value="view.id" class="default-view-button">
          <v-icon>{{view.icon}}</v-icon>
        </v-btn>
        </template>

      </v-btn-toggle>

      <v-btn class="ml-2 search-button" elevation="0" depressed v-if="options.canSort && sortOptions">
        <v-autocomplete
          class="mt-4 search-autocomplete"
          dark
          flat
          single-line
          dense
          label="Sort"
          clearable
          prepend-icon="mdi-sort"
          @change="updateSort()"
          v-model="sort"
          :items="sortOptions"
          return-object
          item-text="label"
        >
          <template v-slot:prepend>
            <v-icon @click="toggleSort()" v-if="inverseSort === true">mdi-sort-ascending</v-icon>
            <v-icon @click="toggleSort()" v-else>mdi-sort-descending</v-icon>
          </template>
        </v-autocomplete>
      </v-btn>

      <!-- <v-menu offset-y v-if="options.defaultView === 0">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" class="ma-2" v-on="on">
            <v-icon>sort</v-icon>
            group
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in groupOptions"
            :key="index"
            @click="setGroup(item)"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->

      <!-- <v-btn icon @click="updateEntities(true)"><v-icon>refresh</v-icon></v-btn> -->
      <!-- <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" class="ma-2" v-on="on">
          <v-icon class="mr-2">table_chart</v-icon>
          {{ $cs.Translate('HEADERS') }}          
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in selectedHeaders"
          :key="index"
          @click="setSort(item)"
        >
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    </v-layout>

    <v-container fluid class="full-height px-0 d-flex flex-row" :class="'splitview-' + options.splitView">
      <v-navigation-drawer v-model="settingsOpen" class="mr-2" hide-overlay :width="settingsOpen ? 256 : 0">
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-tune</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ $cs.Translate('SETTINGS') }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="toggleSettings()"><v-icon>mdi-close</v-icon></v-btn>
          </v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>
        <v-btn @click="exportCsv()" depressed class="ma-2" icon>
          <v-icon>mdi-file-export</v-icon>
        </v-btn>
        <v-divider></v-divider>
        <v-expansion-panels multiple>
          <v-expansion-panel v-for="(fp, ifp) in filterPanels" :key="ifp">
            <v-expansion-panel-header>{{ fp.title }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container v-if="fp.propertyType">
                <template v-if="fp.propertyType.type === 'options'" v-for="(option, i) in fp.propertyType.options">
                  <v-checkbox :key="i" :label="option" :value="option" multiple v-model="fp.selectedOptions"></v-checkbox>
                </template>
                {{ fp.selectedOptions }}
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-navigation-drawer>
      <div class="data-grid-viewer">
        <v-expansion-panels v-if="suggestions && suggestions.length > 0" class="mr-5">
          <v-expansion-panel>
            <v-expansion-panel-header><v-layout><v-icon>mdi-auto-fix</v-icon> Suggestions ({{ suggestions.length }})</v-layout></v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
                
                  <v-row>
                    <template v-for="(suggestion, index) in suggestions">
                    <v-col cols="4" v-if="suggestion" :key="index" class="suggestion-col">
                      <v-card outlined class="suggestion-card">
                      <v-layout>
                        <v-icon v-if="suggestion.icon" :color="suggestion.color">{{ suggestion.icon }}</v-icon><span class="suggestion-text">{{ suggestion.text}}</span><v-spacer></v-spacer>
                      <template v-if="suggestion.actions">
                        <v-btn v-for="(action, ai) in suggestion.actions" @click="callSuggestionAction(action)" :key="ai" icon><v-icon>{{action.icon}}</v-icon></v-btn>
                      </template>
                      </v-layout>
                      </v-card>
                      </v-col>
                    </template>
                  </v-row>                
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <template v-if="options.defaultView === 'list'">
          <v-virtual-scroll v-if="items" :items="items" :item-height="60" class="cs-scroll-container" clientHeight="100%">
            <template v-slot="{ item }">
              <v-list-item @click="selectEntity(item)" class="drag-element" :data-elementid="item.id" @contextmenu="openContextMenu">
                <v-list-item-avatar>
                  <v-avatar :color="getColor(item)" size="56" class="white--text">
                    <v-icon v-if="item._featureType.icon">{{ item._featureType.icon }}</v-icon>
                    <!-- {{ item.initials }} -->
                  </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ item.properties.name }}</v-list-item-title>
                  <!-- {{ item.score }} -->
                  <v-list-item-subtitle v-if="item._featureType && item._featureType.descriptiveProperties">
                    <prop-value
                      v-for="(p, pi) of item._featureType.descriptiveProperties"
                      :key="pi"
                      :value="item.properties[p]"
                      :prop="p"
                      :source="source"
                      :element="item"
                    ></prop-value>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else-if="item._featureType">
                    {{ item._featureType.title }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-layout>
                    <!-- <v-btn @click.stop="showInfo(item.item)" icon>
                  <v-icon color="darken-4">mdi-information-outline</v-icon>
                </v-btn>
                <v-btn @click.stop="toggleInclude(item.item)" icon>
                  <v-icon color="darken-4">mdi-scatter-plot</v-icon>
                </v-btn> -->
                  </v-layout>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </template>
        <template v-if="options.defaultView === 'table'">
          <div style="display: flex; flex-direction: row; width: 100%; height: 100%">
            <ag-grid-vue
              class="table-grid"
              :class="{
                'ag-theme-alpine-dark': $cs.project.theme.dark,
                'ag-theme-alpine': !$cs.project.theme.dark,
              }"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="rowData"
              rowSelection="multiple"
              :checkboxSelection="true"
              @selection-changed="onGridSelection"
              @cell-value-changed="onCellValueChanged"
              @grid-ready="onGridReady"
            >
            </ag-grid-vue>
          </div>
        </template>

        <template v-if="options.defaultView === 'cards'">
          <div class="cs-scroll-container">
            <template v-if="showGroups">
              <isotope :options="getIsoGroupOptions()" ref="isoGroups" :list="groups" class="isotope-grid">
                <template v-for="(group, indx) of groups">
                  <v-card flat :key="indx" class="card-group">
                    <v-layout>
                      <div class="card-group-title">{{ group.title }}</div>
                      <v-spacer></v-spacer>
                      <v-btn icon @click="addGroupItem(group)"><v-icon>mdi-plus</v-icon></v-btn></v-layout
                    >
                    <template v-for="(element, indx) of group.items">
                      <v-card
                        :key="indx"
                        class="entity-card"
                        :class="[
                          element.properties.value_type,
                          element.properties.layout,
                          'class-' + element.classId,
                          'card-' + options.cardOptions.cardSize + '-size',
                        ]"
                        @click="selectEntityCard(element)"
                        :data-elementid="element.id"
                        @contextmenu="openContextMenu"
                      >
                        <component
                          :is="getElementCard(element)"
                          :cardSize="options.cardOptions.cardSize"
                          :source="source"
                          :element="element"
                          :showActionMenu="true"
                          :actions="getActions(element)"
                        ></component>
                      </v-card>
                    </template>
                    <!-- <component :is="getElementCard(element)" :source="source" :element="element"></component> -->
                  </v-card>
                </template>
              </isotope>
            </template>
            <isotope v-else :options="getIsoOptions()" ref="isoCards" :list="items" class="isotope-grid">
              <template v-for="(element, indx) of items">
                <v-card
                  :key="indx"
                  class="entity-card"
                  :class="[
                    element.properties.value_type,
                    element.properties.layout,
                    'class-' + element.classId,
                    'card-' + options.cardOptions.cardSize + '-size',
                  ]"
                  @click="selectEntityCard(element)"
                  :data-elementid="element.id"
                  @contextmenu="openContextMenu"
                >
                  <component
                    :is="getElementCard(element)"
                    :cardSize="options.cardOptions.cardSize"
                    :showActionMenu="true"
                    :actions="getActions(element)"
                    :source="source"
                    :element="element"
                  ></component>
                </v-card>
              </template>
            </isotope>
          </div>
        </template>

        <template v-if="options.defaultView === 'grid'">
          <div class="full-widget grid-view">
            <v-row>
              <v-col v-for="(element, indx) of items" :cols="options.gridOptions.cols" :key="indx">
                <div :data-elementid="element.id" @contextmenu="openContextMenu">
                  <media-element
                    v-if="options.gridOptions.display === 'media'"
                    :element="element"
                    :source="source"
                    :gridOptions="options.gridOptions"
                  ></media-element>
                  <v-card
                    v-else
                    class="entity-card"
                    :class="[element.properties.value_type, element.properties.layout, 'class-' + element.classId]"
                    @click="selectEntityCard(element)"
                    :data-elementid="element.id"
                    @contextmenu="openContextMenu"
                  >
                    <component :is="getElementCard(element)" :source="source" :element="element"></component>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </div>
        </template>

        <template v-if="options.defaultView === 'news'">
          <!-- <v-virtual-scroll
        :bench="10"
        :items="items"
        height="300"
        item-height="64"
      > -->

          <v-virtual-scroll v-if="items" :items="items" :item-height="options.newsOptions.itemHeight" clientHeight="100%">
            <template v-slot="{ item }">
              <div :data-elementid="item.id" @contextmenu="openContextMenu">
                <component v-if="source.newsCardSelector" :is="source.newsCardSelector(item)" :element="item" :source="source"></component>
                <v-list-item v-else :key="indx" three-line class="news-card" @click="selectEntityCard(item, true)" :data-elementid="item.id">
                  <v-list-item-content>
                    <div
                      class="text-overline mb-4"
                      v-if="options.newsOptions.sourceElement && item._elements.hasOwnProperty(options.newsOptions.sourceElement)"
                    >
                      {{ item._elements[options.newsOptions.sourceElement].properties.name }}
                    </div>
                    <v-list-item-title class="text-h5 mb-1">
                      {{ item.properties.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle v-if="options.newsOptions.sourceProperty">
                      <span class="source-property" v-if="item.properties.hasOwnProperty(options.newsOptions.sourceProperty)">{{
                        item.properties[options.newsOptions.sourceProperty]
                      }}</span>
                      {{ item.properties.description }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <!-- <v-list-item-avatar v-if="element.properties.image" tile size="50">
              <v-img class="feed-image" :src="element.properties.image"></v-img>
            </v-list-item-avatar> -->
                </v-list-item>
              </div>
            </template>
          </v-virtual-scroll>

          <!-- </v-virtual-scroll> -->
        </template>

        <template v-if="options.defaultView === 'kanban'">
          <div>
            <v-layout v-if="kanbanColumns" class="kanban-board">
              <v-menu
                v-model="showKanbanContextmenu"
                :position-x="contextMenuX"
                :position-y="contextMenuY"
                absolute
                :close-on-content-click="false"
                offset-y
              >
                <v-list>
                  <v-list-group
                    v-for="(item, i) in kanbanMenuItems"
                    :key="i"
                    v-model="item.active"
                    :prepend-icon="item.icon"
                    no-action
                    @click="item.action"
                  >
                    <template v-slot:appendIcon>
                      <span v-if="item.items && item.items.length > 0">{{ item.items.length }}</span>
                      <span v-else></span>
                    </template>
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <template v-if="item.items">
                      <v-list-item v-for="(subItem, si) in item.items" :key="si" :prepend-icon="subItem.icon" @click="subItem.action">
                        <v-list-item-content>
                          <v-list-item-title v-text="subItem.title"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-list-group>
                </v-list>
              </v-menu>

              <v-card
                v-for="column in kanbanColumns"
                :key="column.title"
                outlined
                class="kanban-column"
                :data-prop="column.prop"
                :style="getKanbanColumnStyle(column)"
              >
                <v-layout class="kanban-column-header" :class="{ 'kanban-column-rotated': column.collapsed }">
                  <v-btn icon @click="toggleKanbanColumn(column)"
                    ><v-icon v-if="column.collapsed">mdi-chevron-down</v-icon><v-icon v-else>mdi-chevron-right</v-icon></v-btn
                  >
                  <span class="kanban-column-title">{{ column.title }}</span>
                  <v-spacer v-if="!column.collapsed" />
                  <v-icon>mdi-card-multiple-outline</v-icon><span class="kanban-column-header-indicator">{{ column.elements.length }}</span>
                  <v-btn v-if="!column.collapsed && options.canAdd" icon @click="addKanbanColumnElement(column)"><v-icon>mdi-plus</v-icon></v-btn>
                </v-layout>
                <v-card class="kanban-card ma-2 primary pa-3" outlined v-if="column.newCard && !column.collapsed">
                  <v-text-field
                    :id="'input-column-' + column.prop"
                    v-model="column.newTitle"
                    solo
                    clearable
                    label="name"
                    @keydown.enter="createKanbanItem(column, $event)"
                  ></v-text-field>
                  <v-layout>
                    <v-btn outlined @click="removeKanbanColumnElement(column)"><v-icon>mdi-delete</v-icon></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="ml-4" @click="createKanbanItem(column)"><v-icon>mdi-plus</v-icon>create</v-btn>
                  </v-layout>
                </v-card>
                <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
                <draggable
                  class="kanban-column-items"
                  v-if="!column.collapsed"
                  :list="column.elements"
                  :animation="200"
                  ghost-class="ghost-card"
                  group="kanban"
                  @end="movedKanbanCard"
                >
                  <v-card
                    class="kanban-card"
                    outlined
                    :style="getKanbanCardStyle(element)"
                    v-for="element in column.elements"
                    :key="element.id"
                    @click="selectEntityCard(element)"
                    :data-elementid="element.id"
                    @contextmenu="showKanbanMenu"
                  >
                    <component
                      v-if="options.kanbanOptions.componentView"
                      :is="getElementCard(element)"
                      :source="source"
                      :element="element"
                    ></component>
                    <span v-else>{{ element.properties.name }}</span>
                  </v-card>
                  <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
                  <!-- <task-card
              v-for="(task) in column.tasks"
              :key="task.id"
              :task="task"
              class="mt-3 cursor-move"
            ></task-card> -->
                  <!-- </transition-group> -->
                </draggable>
              </v-card>
            </v-layout>
          </div>
        </template>

        <div class="timeline-vertical-view" v-if="options.defaultView === 'timeline_vertical'">timeline vertical</div>

        
        <div class="calendar-view" v-if="options.defaultView === 'calendar'">
          <v-toolbar flat>
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday"> Today </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[options.calendarOptions.type] }}</span>
                  <v-icon right>mdi-expand-more</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="options.calendarOptions.type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="options.calendarOptions.type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="options.calendarOptions.type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="options.calendarOptions.type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-calendar
            v-if="options.calendarOptions"
            ref="calendar"
            v-model="focus"
            color="primary"
            event-timed="timed"
            :events="items"
            event-name="id"
            event-start="_startDate"
            event-stop="_endDate"
            @click:date="viewDay"
            @click:event="clickCalendarItem"
            :type="options.calendarOptions.type"
          >
            <template v-slot:event="{ event }">
              {{ event.properties.name }}
            </template>
          </v-calendar>
          <!-- :events="items" -->
          <!-- @click:event="showEvent"
          @click:more="viewDay"
          
          @change="updateRange" -->
        </div>
        <template v-if="options.defaultView === 'tree'">
          <div>
            <v-treeview
              v-model="selectedTree"
              return-object
              open-on-click
              ref="treeView"
              selection-type="independent"
              :items="treeItems"
              activatable
              @input="openTreeItem()"
              @click="selectTableItem(item.entity)"
            >
              <!-- selectable
          selection-type="leaf" -->
              <template v-slot:append="{ item }">
                <v-layout>
                  <v-btn icon v-if="options.canDelete" @click.stop="removeElement(item.entity)"><v-icon>mdi-delete</v-icon></v-btn>
                  <v-btn icon @click.stop="editEntity(item.entity)"><v-icon>mdi-pencil</v-icon></v-btn>
                  <!-- <v-btn v-if="options.canGraph" icon @click.stop="graphNode(item.entity)"><v-icon>mdi-scatter-plot</v-icon></v-btn> -->
                  <v-menu offset-y v-if="options.defaultView === 'tree'">
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" icon><v-icon>mdi-plus</v-icon></v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-for="(itemtype, index) in classTypes" :key="index" @click.stop="addChildEntity(itemtype, item.entity)">
                        <v-list-item-title>{{ itemtype.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-layout>
              </template>
              <template v-slot:label="{ item }">
                <span v-if="options.relationToggle">
                  <v-btn icon @click.stop="toggleLinked(item.entity)">
                    <v-icon v-if="item.entity._isLinked">mdi-check-circle-outline</v-icon>
                    <v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
                  </v-btn>
                  <v-btn v-if="item.entity._isLinked" icon @click.stop="selectTableItem(item.entity._isLinked)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </span>
                <v-btn icon @click.stop="toggleCheckbox(item.entity)" v-if="options.checkboxProperty">
                  {{ item.entity[options.checkboxProperty] }}
                  <v-icon v-if="item.entity.properties[options.checkboxProperty]">mdi-check-circle-outline</v-icon>
                  <v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
                </v-btn>
                <span @click="selectTableItem(item.entity)">
                  {{ item.entity.properties.name }}
                </span>
                <!-- </v-btn> :value="item.entity._isLinked !== undefined" class="mt-3 ml-3 pa-0" :label="item.name"></v-checkbox> -->
                <!-- {{ item.entity._isLinked !== undefined}} -->
                <!-- <span class="tree-item-label" @click="selectEntity(item.entity)">{{item.name}}</span> -->
                <!-- <v-btn>{{ item.name }}</v-btn> -->
                <!-- <v-icon v-if="!item.file">
              {{ open ? "mdi-folder-open" : "mdi-folder" }}
            </v-icon>
            <v-icon v-else>
              {{ files[item.file] }}
            </v-icon> -->
              </template>
            </v-treeview>
          </div>

        </template>

        <template v-for="(view, vi) in source.gridPlugins">
          <div :key="vi" v-if="options.defaultView === view.id">
            <component :is="view.component" :source="source" :grid="getGrid()"></component>            
          </div>
        </template>

        <div class="timeline" v-if="options.defaultView === 'timeline'">timeline</div>

      </div>

      <cs-widget v-if="options.splitWidget" :widget="options.splitWidget"></cs-widget>

      <!-- <v-grid
    class="list"
    theme="material"
    resize="false"
    readonly="false"
    :source="rows"
    :columns="columns"
  ></v-grid> -->
    </v-container>
    <element-context-menu
      @listUpdated="updateEntities(true)"
      @itemUpdated="updateEntities(true)"
      :showContextMenu="showContextMenu"
      :additionalItems="additionalContextMenuItems"
      v-if="source"
      :x="contextMenuX"
      :y="contextMenuY"
      :source="source"
      :element="activeElement"
    ></element-context-menu>
  </div>
</template>

<style lang="scss" scoped>

.suggestion-col {
  padding: 4px !important;
}

.suggestion-text {
  align-self: center;
  margin-left: 4px;

}

.suggestion-card {
  width: 100%;
  height: 100%;
  padding: 2px;
}

.suggestion-card:hover {
  background-color: transparent;
}

.column-width {
  min-width: 320px;
  width: 320px;
}

/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}

.splitview-horizontal {
  grid-template-rows: 25% 75%;
  grid-template-areas:
    'top'
    'bottom';
}

.splitview-vertical {
  grid-template-columns: 25% 75%;
  grid-template-areas: 'left right';
}

.grid-component-content {
  height: calc(100% - 96px);
  position: relative;
  display: grid;
}

.kanban-board {
  height: 100%;
}

.kanban-card {
  margin-bottom: 5px;
  cursor: move;
}

.kanban-column-rotated {
  -webkit-transform: translateY(-100%) rotate(90deg); /* Safari */
  -moz-transform: translateY(-100%) rotate(90deg); /* Firefox 3.6 Firefox 4 */
  /*-moz-transform-origin: right top; */
  -ms-transform: translateY(-100%) rotate(90deg); /* IE9 */
  -o-transform: translateY(-100%) rotate(90deg); /* Opera */
  transform: translateY(-100%) rotate(90deg); /* W3C */
  -webkit-transform-origin: left bottom;
  -moz-transform-origin: left bottom;
  -ms-transform-origin: left bottom;
  -o-transform-origin: left bottom;
  transform-origin: left bottom;
  min-width: 400px;
}

.kanban-column-header-indicator {
  margin: 5px;
  font-weight: 600;
}

.kanban-column-title {
  font-size: 18px;
  font-weight: 700px;
  margin-right: 10px;
}

.kanban-column-header {
  margin-bottom: 5px;
  border-bottom-color: lightgray;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding: 3px;
}

.kanban-column-items {
  padding: 3px;
}

.kanban-column {
  margin: 5px;
}

.kanban-board:empty {
  padding-bottom: 100px;
}

.ag-theme-alpine {
  /* use theme parameters where possible */
  --ag-header-background-color: transparent;
  --ag-border-color: transparent;
  --ag-border: 0px;
  --ag-padding: 0px;
}

.ag-row {
  height: 30px !important;
}

.data-table-scroll {
  height: calc(100vh - 400px) !important;
}

.ag-root-wrapper {
  border: 0 !important;
}

.ag-text-field-input {
  background: blue !important;
}

.element-card-name {
  font-size: 30px;
}

.data-grid-viewer {
  height: calc(100vh - 200px);
  /* padding-bottom: 200px; */
  position: relative;
  width: 100%;
  /* height: 300px; */
  overflow-y: auto;
  overflow-x: hidden;
}

.data-row {
  padding: 4px !important;
  margin: 4px !important;
  cursor: pointer;
  // min-height: 40px !important;

  /* margin-bottom: 10px; */
}

.grid-view {
  margin: 5px;
}

.card-group-title {
  margin: 5px;
  font-size: 24px;
  // font-weight: 600;
}

.search-button {
  max-width: 200px;
}

.search-autocomplete {
  max-width: 190px;
}

.data-grid-title {
  font-size: 26px;
  font-weight: 600;
  margin-right: 10px;
}

.source-property {
  font-weight: 600;
}

.data-grid-component {
  height: 100%;
}

.grid-action-button {
  display: flex;
}

.grid-action-buttons {
  display: flex;
  flex-flow: row;
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: lightgray;
  margin-right: 4px;
}

.default-view-button {
  height: 36px !important;
  margin: 0 !important;
}

.calendar-view {
  height: calc(100% - 250px);
}

.table-grid {
  width: 100%;

  height: calc(100%);
}

.data-row:hover {
  background: lightgrey;

  /* margin-bottom: 10px; */
}

.small-search {
  max-width: 150px !important;
  margin-left: 4px;
}

.full-search {
  max-width: 200px !important;
}

.scroll {
  height: 500px;
}

.tree-item-label {
  cursor: pointer;
}

.grid-sizer,
.group-column {
  width: 300px;
  max-height: 300px;
}

.entity-card {
  // width: 300px;
  // height: 120px;
  margin: 4px;
}

.news-card {
  width: 90%;

  min-height: 150px;
  margin: 5px;
  margin-left: 15px;
}

.entity-card.Timeseries,
.entity-card.elementarray,
.entity-card.Trends {
  width: 608px;
  height: 248px;
}

.entity-card.Gauge {
  height: 248px;
}

.kanban-card {
  min-height: 100px;
}

.isotope-grid {
  /* width: 800px;
  height: 800px !important; */
  /* background: red; */
}
</style>

<script lang="ts">
import { Component, Ref, Watch } from 'vue-property-decorator';
import { WidgetBase, AppState } from '@csnext/cs-client';
import { DataInfoPanel, NodeLink } from '@csnext/cs-map';

// import { FeatureType } from "../../classes";
import { FeatureType, FilterGraphElement, GraphDatasource, GraphElement, IGraphFilter, PropertyType, PropertyValueType } from '@csnext/cs-data';
import moment from 'moment';
import { CardSize, guidGenerator, IDashboard, IMenu, IWidget } from '@csnext/cs-core';
import Vue from 'vue';
import { DocDatasource, DataGridOptions, GridView, FindElement } from '../..';
import ElementContextMenu from '../element/element-context-menu.vue';
import { PropValue } from '@csnext/cs-map';

// kanban
import draggable from 'vuedraggable';

// media
import MediaElement from './media-element.vue';

// cards
import isotope from 'vueisotope';
import DefaultElementCard from './cards/default-element-card.vue';
import { ElementCardManager } from './cards/element-card-manager';
require('isotope-packery');

// table components
import { AgGridVue } from 'ag-grid-vue';
import { CellValueChangedEvent, ColDef, GridApi } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import GridRowActions from './table/grid-row-actions.vue';
import DateCellEditor from './table/date-cell-editor.vue';
import GridPropValue from './table/grid-prop-value';
import OptionsCellEditor from './table/options-cell-editor.vue';
import NodeLinkCellEditor from './table/node-link-cell-editor.vue';
import OptionsFilter from './table/options-filter.vue';
import Papa from 'papaparse';
import { GridSuggestion } from './suggestions/suggestions';

export class KanBanColumn {
  title?: string;
  prop?: string;
  elements?: GraphElement[];
  element?: GraphElement;
  collapsed?: boolean;
  newCard?: boolean;
  newTitle?: string;
}

export class FilterPanel {
  title?: string;
  propertyType?: PropertyType;
  selectedOptions?: string[];
}

export class GridGroup {
  title?: string;
  items?: GraphElement[];
}

@Component({
  name: 'element-data-grid',
  components: {
    'date-cell-editor': DateCellEditor,
    'grid-prop-value': GridPropValue,
    'grid-row-actions': GridRowActions,
    'options-cell-editor': OptionsCellEditor,
    'node-link-cell-editor': NodeLinkCellEditor,
    'options-filter': OptionsFilter,
    PropValue,
    AgGridVue,
    DataInfoPanel,
    NodeLink,
    MediaElement,
    isotope,
    draggable,
    ElementContextMenu,
    DefaultElementCard,
  },
})
export default class ElementDataGrid extends WidgetBase {
  public toggle_view = 0;
  public featureType: FeatureType | null = null;
  public activeElement: GraphElement | null = null;
  public selectedElements: GraphElement[] = [];
  public potentialProperties: { [key: string]: PropertyType } = {};
  public sort: PropertyType | null = null;
  public group: PropertyType | undefined | null = null;
  public classTypes: FeatureType[] = [];
  public sortOptions?: PropertyType[] | null = null;
  public groupOptions?: PropertyType[] | null = null;
  public groupKey?: null | string = null;
  public inverseSort?: boolean = false;
  public localPreset?: FilterGraphElement;
  public focus = '';
  public search: string = '';
  public filterPanels: FilterPanel[] = [];
  public settingsOpen?: boolean = false;
  public showGroups?: boolean = false;
  public selectedTree?: any = [];
  public source?: DocDatasource | null = null;
  public items: GraphElement[] | undefined = [];
  @Ref('isoGroups')
  public isoGroups?: any;

  @Ref('isoCards')
  public isoCards?: any;

  @Ref('calendar')
  public calendar?: any;
  @Ref('treeView')
  public treeView?: any;

  private showKanbanContextmenu? = false;
  private contextMenuX = 0;
  private contextMenuY = 0;
  private showContextMenu? = false;
  private kanbanMenuItems: any[] = [];

  private filterProperty: PropertyType | null = null;
  private filterProperties?: PropertyType[] = [];
  private filterTitle?: string | null = null;
  private filterValues?: { [key: string]: string } = {};

  public gridApi?: GridApi;
  public columnApi: any | null = null;

  public rowData: any | null = [];
  public groups: GridGroup[] = [];

  public columnDefs: ColDef[] | null = null;

  public searchEnabled = false;

  public suggestions: GridSuggestion[] | null = null;

  public typeToLabel = {
    month: 'Month',
    week: 'Week',
    day: 'Day',
    '4day': '4 Days',
  };

  public headers: any[] = [];

  public defaultColDef = {
    sortable: true,
    resizable: true,
    floatingFilter: true,
    filter: true,
  } as ColDef;

  public treeItems: any[] = [];
  public upToDate = false;

  public get options(): DataGridOptions {
    return (this.widget?.options as DataGridOptions) || new DataGridOptions();
  }

  public isLinked(element: GraphElement) {
    return true;
  }

  private updateFilterPanels() {
    this.filterPanels.splice(0, this.filterPanels.length);
    if (this.featureType?.properties) {
      this.filterProperties = this.featureType.properties.filter((p) => p.type === PropertyValueType.options);
      this.filterProperties.forEach((p) => {
        const panel = new FilterPanel();
        panel.title = p.label;
        panel.propertyType = p;
        panel.selectedOptions = [];
        this.filterPanels.push(panel);
      });
    }
  }

  private async unlinkElement(element: GraphElement) {
    if (this.source && this.options.linkOptions?.baseTypeId && this.options.linkOptions?.id && element._incomming) {
      // find base type
      const baseType = this.source.getFeatureTypeById(this.options.linkOptions.baseTypeId);

      const id = AppState.parseStateValue(this.state, this.options.linkOptions.id);

      // find edge
      let r = element._incomming.find(r => r.fromId === id);
      if (r) {
        await this.source.removeEdge(r);
        this.updateEntities(true);
      }
      
    }
  }

  private additionalContextMenuItems(e: GraphElement, source: DocDatasource): IMenu[] {
    const items: IMenu[] = [];
    if (this.options?.linkOptions) {
      items.push({
        title: 'unlink',
        icon: 'mdi-link-off',
        action: async () => {
          await this.unlinkElement(e);          
          // alert('unlink');
        },
      });
    }
    return items;
  }

  public openContextMenu(e: any, elementId?: string) {
    e.preventDefault();
    elementId = e.currentTarget?.dataset.elementid || e.path[3].dataset.elementid || elementId;
    if (!elementId || !this.source?.graph || !this.source.graph.hasOwnProperty(elementId)) {
      return;
    }
    this.activeElement = this.source.graph[elementId];

    this.showContextMenu = true;
    this.contextMenuX = e.clientX;
    this.contextMenuY = e.clientY;
  }
  private showKanbanMenu(e: any) {
    e.preventDefault();
    const elementId = e.currentTarget?.dataset.elementid || e.path[3].dataset.elementid;
    if (!elementId || !this.source?.graph || !this.source.graph.hasOwnProperty(elementId)) {
      return;
    }
    const element = this.source.graph[elementId];

    this.showKanbanContextmenu = false;
    this.contextMenuX = e.clientX;
    this.contextMenuY = e.clientY;
    this.kanbanMenuItems = [];
    if (this.options?.kanbanOptions?.columnPropertySelection) {
      for (const column of this.options.kanbanOptions.columnPropertySelection) {
        if (column && this.potentialProperties.hasOwnProperty(column)) {
          const propType = this.potentialProperties[column];
          let mi = {
            title: column,
            active: false,
            action: () => {},
            icon: 'mdi-arrow-right',
            items: [] as any[],
          };
          let columns = this.getKanbanColumns(propType);
          for (const col of columns) {
            if (col.title) {
              mi.items.push({
                title: col.title,
                action: async () => {
                  await this.updateKanbanValue(propType, element, col.value);
                  this.updateKanban();
                  this.$forceUpdate();
                  this.showKanbanContextmenu = false;
                },
              });
            }
          }
          this.kanbanMenuItems.push(mi);
        }
      }
    }
    this.kanbanMenuItems.push({
      title: $cs.Translate('DELETE'),
      active: true,
      icon: 'mdi-delete',
      action: async () => {
        await this.source!.removeNode(element);
        this.updateEntities(true);
        this.$forceUpdate();
        this.showKanbanContextmenu = false;
      },
    });
    this.$nextTick(() => {
      this.showKanbanContextmenu = true;
    });
  }

  public onCellValueChanged(event: CellValueChangedEvent) {
    if (!this.source || !event.data) {
      return;
    }
    console.log(event.data.properties.end);
    this.source.saveNode(event.data);
  }

  public onGridSelection() {
    if (!this.gridApi || this.options.defaultView !== 'table') {
      return;
    }
    const rows = this.gridApi.getSelectedRows();
    this.selectedElements = [];
    if (!rows) {
      return;
    }
    if (rows.length === 1) {
      this.selectEntity(rows[0], false);
    }
    if (rows.length > 0) {
      for (const row of rows) {
        this.selectedElements.push(row);
      }
    }
  }

  public resize() {
    if (!this.options?.defaultView) {
      return;
    }
    switch (this.options.defaultView) {
      case 'cards':
        this.updateCardsLayout();
        break;
      case 'table':
        if (this.gridApi) {
          this.gridApi.sizeColumnsToFit();
        }
        break;
    }
  }

  public onGridReady(params: any) {
    this.gridApi = params.api as GridApi;
    this.columnApi = params.columnApi;
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  public selectSplitWidget(element?: GraphElement) {
    if (this.options.splitWidget) {
      if (!this.options.splitWidget.data) {
        this.options.splitWidget.data = {};
      }
      this.options.splitWidget.data.elementId = element?.id;
      if (this.options.splitWidget._component?.selectElement) {
        this.options.splitWidget._component.selectElement(element, this.options);
      }
    }
  }

  public selectEntity(element: GraphElement, open = false) {
    if (this.options.onSelect) {
      this.options.onSelect(element);
    }

    if (this.options.splitWidget) {
      this.source!.selectElement(element, false);
      this.selectSplitWidget(element);
    } else {
      this.source!.selectElement(element, open);
    }
  }

  public selectEntityCard(element: GraphElement, viewer: boolean = false) {
    if (!this.source) {
      return;
    }
    this.selectSplitWidget(element);
    if (this.options.onSelect) {
      this.options.onSelect(element);
    } else {
      if (viewer) {
        this.source?.openViewer(element, element);
      } else {
        this.source?.selectElement(element, false);
      }
      // this.editEntity(element);
    }
  }

  public itemPropValue(prop: PropertyType, element: GraphElement) {
    if (!element?.properties || !prop.key) {
      return '';
    }
    if (prop.type === PropertyValueType.relation && prop.relation?.type && element?._outgoing) {
      const rel = element._outgoing.find((r) => r.classId === prop.relation!.type);
      return rel?.to;
    }
    return element.properties[prop.key]; //header.propType.type;
  }

  public setToday() {
    this.focus = '';
  }

  public graphNode(element: GraphElement) {
    if (!this.source) {
      return;
    }
    this.source.createKGView([element], this.options.graphPresetId);
  }

  @Watch('widget')
  private async widgetChanged(widget: IWidget) {
    this.widget = widget;
    if (!this.source) {
      if (widget.datasource) {
        const source = await $cs.loadDatasource<DocDatasource>(widget.datasource);
        this.contentLoaded(source);
      }
    } else {
      this.contentLoaded(this.source);
    }

    console.log(`data-grid-widget changed: ${widget.id} - ${widget.component}`);
  }

  @Watch('options.filter')
  public filterChanged() {
    if (this.source) {
      this.updateEntities(true);
    } else if (!this.source && this.widget?.datasource) {
      $cs.loadDatasource<DocDatasource>(this.widget.datasource).then((ds) => {
        this.widget.content = ds;
        this.updateEntities(true);
      });
    }
  }

  @Watch('selectedTree')
  public treeSelectionChanged() {
    console.log(this.selectedTree);
  }

  @Watch('options.defaultView')
  public viewChanged() {
    if (this.options.defaultView) {
      $cs.updateRouteQuery({ view: this.options.defaultView });
    }

    this.updateEntities(true);
  }

  public openTreeItem(item: any) {
    console.log(this.selectedTree);
  }

  public expandTree() {
    (this.$refs.treeView as any).updateAll(true);
  }

  public collapseTree() {
    (this.$refs.treeView as any).updateAll(false);
  }

  public async toggleCheckbox(entity: GraphElement) {
    if (!this.source || !this.options.checkboxProperty || !entity.properties) {
      return;
    }
    // entity.properties[this.options.checkboxProperty] = (entity.properties[this.options.checkboxProperty] === true) ? false : true;
    Vue.set(entity.properties, this.options.checkboxProperty, entity.properties[this.options.checkboxProperty] === true ? false : true);
    this.source.saveNode(entity);
  }

  public async editLinked(entity: GraphElement) {}

  private async linkTree(item: any, value: boolean) {
    if (value) {
      await this.link(item.entity, false);
    } else {
      await this.unlink(item.entity, false);
    }
    if (item.children) {
      for (const child of item.children) {
        await this.linkTree(child, value);
      }
    }
  }

  public exportCsv() {
    if (!this.source || !this.items) {
      return;
    }
    // const csv = this.source.exportCsv();
    const exportItems: any[] = [];
    for (const i of this.items) {
      let flat = GraphElement.getFlat(i);
      if (!flat.properties) {
        return;
      }
      delete flat.properties.id;
      delete flat.properties.classId;
      let id = flat.id;
      let classId = flat.classId;
      if (i._featureType?.properties) {
        for (const pt of i._featureType.properties) {
          if (pt.required && pt.key) {
            if (pt.type === PropertyValueType.relation) {
              if (i._outgoing) {
                const rel = i._outgoing.filter((r) => r.classId === pt.relation!.type);
                if (!rel || rel.length === 0) {
                  flat.properties[pt.key] = flat.properties[pt.key]?.id;
                } else {
                  flat.properties[pt.key] = rel.map((r) => r.to?.properties?.name).join(',');
                }
              } else {
                flat.properties[pt.key] = flat.properties[pt.key]?.id;
              }
            } else {
              if (!flat.properties.hasOwnProperty(pt.key)) {
                flat.properties[pt.key] = '';
              }
            }
          }
        }
      }

      exportItems.push({ ...{ id, classId }, ...flat.properties });
    }

    let data = Papa.unparse(exportItems, {
      header: true,
    });

    $cs.triggerFileDownload(this.options?.defaultView, data, 'applications/csv');
  }

  public get splitWidgetLayout(): any {
    if (this.options.splitView) {
      switch (this.options.splitView) {
        case 'horizontal':
          return { 'grid-template-rows': '25% 75%;' };

        case 'vertical':
          return { 'grid-template-columns': '50% 50%;' };
      }
    }
  }

  public async linkAll() {
    if (!this.treeItems) {
      return;
    }
    for (const item of this.treeItems) {
      await this.linkTree(item, true);
    }
    this.updateEntities(true);
  }

  @Watch('options.searchFilter')
  public updateSearchFilter() {
    this.updateEntities(true);
    this.$forceUpdate();
  }

  public toggleSettings() {
    this.settingsOpen = !this.settingsOpen;
    if (this.settingsOpen) {
      this.updateFilterPanels();
    }
  }

  public openSearch() {
    this.searchEnabled = true;
    this.$nextTick(() => {
      (this.$refs.searchInput as any).focus();
    });
  }

  public closeSearch() {
    this.options.searchFilter = '';
    this.searchEnabled = false;
  }

  public getWidget() {
    if (this.options.splitWidget) {
      if (!this.options.splitWidget.data) {
        this.options.splitWidget.data = {};
      }
      return this.options.splitWidget;
    }
  }

  public async unLinkAll() {
    if (!this.treeItems) {
      return;
    }
    for (const item of this.treeItems) {
      await this.linkTree(item, false);
    }
    this.updateEntities(true);
  }

  public async unlink(entity: GraphElement, update = true): Promise<boolean> {
    if (!this.source || !entity._isLinked) {
      return Promise.resolve(false);
    }
    try {
      await this.source.removeEdge((entity as any)._isLinked);
      entity._isLinked = undefined;
      if (update) {
        this.updateEntities(true);
      }
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async link(entity: GraphElement, update = true): Promise<boolean> {
    if (!this.source) {
      return Promise.reject();
    }
    if (entity.id && this.options.relationToggle?.fromId && this.options.relationToggle.relationClassId) {
      try {
        const linkEdge = await this.source.addNewEdge({
          fromId: this.options.relationToggle.fromId,
          toId: entity.id,
          classId: this.options.relationToggle.relationClassId,
        } as GraphElement);
        entity._isLinked = linkEdge;
        if (update) {
          this.updateEntities(true);
        }
        return Promise.resolve(true);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject();
  }

  public async toggleLinked(entity: GraphElement) {
    if (!this.source) {
      return;
    }
    if ((entity as any)._isLinked) {
      await this.unlink(entity);
    } else {
      await this.link(entity);
    }
    this.updateEntities(true);
  }

  public itemPropValues(prop: PropertyType, element: GraphElement) {
    if (!element?.properties || !prop.key) {
      return '';
    }
    if (prop.type === PropertyValueType.relation && prop.relation?.type && element?._outgoing) {
      const rel = element._outgoing.filter((r) => r.classId === prop.relation!.type);
      if (!rel) {
        return [];
      }
      return rel.map((f) => f.to);
    }
    return element.properties[prop.key]; //header.propType.type;
  }

  private filterDataTable(value: string, search: string) {
    return value != null && search != null && typeof value === 'string' && value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1;
  }

  public selectElement(element: GraphElement, selected: boolean) {
    alert('selected');
    if (!this.source) {
      return;
    }    
  }

  public clickCalendarItem(e: any) {
    if (!this.source) {
      return;
    }
    if (e.event) {
      this.source.openElement(e.event);
    }
  }

  public updateCardsLayout() {
    setTimeout(() => {
      if (this.$refs.isoGroups) {
        (this.$refs.isoGroups as any).layout();
      }
      if (this.$refs.isoCards) {
        (this.$refs.isoCards as any).layout();
      }
      this.$forceUpdate();
    }, 100);
  }

  public unselectAll() {
    if (this.gridApi) {
      this.gridApi.deselectAll();
    }
  }

  public selectAll() {
    if (this.gridApi) {
      this.gridApi.selectAll();
    }
  }

  public deleteSelection() {
    $cs.triggerYesNoQuestionDialog('Delete selected items?', 'Are you sure you want to delete the selected items?').then(async (s: string) => {
      if (this.source && s === 'YES' && this.selectedElements) {
        const count = this.selectedElements.length;
        for (const el of this.selectedElements) {
          await this.removeElement(el, true, false);
        }
        this.updateEntities(true);
        $cs.triggerNotification({ title: 'Selected deleted', text: `${count} items deleted` });
        // this.source?.deleteSelection();
      }
    });
  }

  public updateHeaders() {
    if (!this.featureType?.properties || !this.options?.tableOptions) {
      return;
    }
    if (!this.options.tableOptions.selectedHeaders) {
      this.options.tableOptions.selectedHeaders = [{ key: 'name' }];
    }
    this.headers = [];
    this.columnDefs = [];

    this.headers.push({ text: '', value: 'icon', sortable: false });
    for (const header of this.options.tableOptions.selectedHeaders) {
      if (header.key && this.potentialProperties.hasOwnProperty(header.key)) {
        const prop = this.potentialProperties[header.key];
        this.headers.push({
          text: prop.label,
          value: `properties.${prop.key}`,
          key: prop.key,
          sortable: true,
          filterable: !this.options.hideFilter,
          groupable: true,
          // width: header.width,
          propType: prop,
        });
        let column = {
          field: `properties.${prop.key}`,
          headerName: prop.label,

          // cellRenderer: 'daysFrostRenderer',
          // cellRendererParams: {rendererImage: "frost.png"} ,
          cellRenderer: 'grid-prop-value',
          // cellRendererParams: (d) => {
          //   debugger;
          //   return {'test': 'test'};
          // },
          editable: true,
        } as ColDef;
        if (prop.type === 'epoch') {
          column.cellEditor = 'date-cell-editor';
          column.cellEditorParams = {
            updatedCell: (row: GraphElement) => {
              this.source!.saveNode(row);
              // this.updateEntities();
            },
          };
          column.filter = 'agDateColumnFilter';
          column.filterParams = {
            comparator: (epochCellFilter: any, cellValue: any) => {
              var cellDate = new Date(cellValue);

              if (epochCellFilter.getTime() === cellDate.getTime()) {
                return 0;
              }
              if (cellDate < epochCellFilter) {
                return -1;
              }
              if (cellDate > epochCellFilter) {
                return 1;
              }
            },
            browserDatePicker: true,
            minValidYear: 2000,
          };
        }
        if (prop.type === 'relation') {
          column.cellEditor = 'node-link-cell-editor';
          column.cellEditorParams = {
            source: this.source,
            updatedCell: (row: GraphElement) => {
              this.source!.saveNode(row);
            },
          };
        }
        if (prop.type === 'options') {
          column.cellEditor = 'options-cell-editor';
          column.floatingFilter = !this.options.hideFilter;
          column.floatingFilterComponentFramework = 'options-filter';
          column.filterFramework = 'options-filter';
          column.floatingFilterComponentParams = {
            suppressFilterButton: true,
            propType: prop,
          };
          column.cellEditorParams = {
            source: this.source,
            updatedCell: (row: GraphElement) => {
              this.source!.saveNode(row);
            },
          };
        }

        // filter: 'agDateColumnFilter',
        this.columnDefs.push(column);
      }
    }
    if (this.options.canDelete || this.options.canEdit) {
      this.columnDefs.push({
        floatingFilter: false,
        sortable: false,
        width: 90,
        cellRenderer: 'grid-row-actions',
        cellRendererParams: {
          options: this.options,
          // graphNode: (row: GraphElement) => {
          //   this.graphNode(row);
          // },
          editNode: (row: GraphElement) => {
            this.editEntity(row);
          },
          delete: (row: GraphElement) => {
            this.removeElement(row);
          },
        },
      });
      this.headers.push({ text: 'Actions', value: 'actions', sortable: false });
    }
    this.$forceUpdate();
  }

  public toggleSort() {
    this.inverseSort = !this.inverseSort;
    this.updateEntities(true);
  }

  public updateSort() {
    if (this.isoCards) {
      this.isoCards.sort('name');
      this.isoCards.sort('custom');
    }
    // this.sort = prop;
    this.update();
    this.updateEntities(true);
  }

  public setGroup(prop?: PropertyType | string) {
    if (typeof prop === 'string' && this.groupOptions) {
      prop = this.groupOptions.find((g) => g.key === prop);
    } else {
      return;
    }
    if (!prop) {
      return;
    }
    this.group = prop;
    this.groupKey = `properties.${this.group.key}`;
    this.update();
  }

  public selectTableItem(item: GraphElement) {
    if (!this.source) {
      return;
    }
    this.source.openElement(item);
  }

  public prev() {
    (this.$refs.calendar as any).prev();
  }
  public next() {
    (this.$refs.calendar as any).next();
  }

  public setCardSize(size: CardSize) {
    if (this.options.cardOptions) {
      this.options.cardOptions.cardSize = size;
      this.$forceUpdate();
      this.updateCardsLayout();
    }
  }

  public getIsoGroupOptions() {
    return {
      itemSelector: '.entity-card',
      layoutMode: 'packery',
      sortAscending: false,
      getSortData: {
        name: (s: any) => {
          return s.title;
        },
      },
      sortBy: 'name',
      masonry: {
        columnWidth: '.grid-sizer',
      },
    };
  }

  public getIsoOptions() {
    return {
      itemSelector: '.entity-card',
      layoutMode: 'packery',
      sortAscending: false,
      getSortData: {
        name: (s: any) => {
          return s.properties.name;
        },
        custom: (s: any) => {
          return s.properties.updated_time;
        },
        assessment: (s: any) => `${s.properties.assessment || 0}${s.properties.name}`,
      },
      sortBy: 'assessment',
      // percentPosition: true,
      // options for cellsByRow layout mode

      // options for masonry layout mode
      masonry: {
        columnWidth: '.grid-sizer',
      },
    };
  }

  public async addChildEntity(type: FeatureType, parent?: GraphElement) {
    await this.addEntity(type, parent);
    this.updateEntities(true);
    this.$forceUpdate();
  }

  public async addGroupItem(group: GridGroup) {
    alert('not implemented');
  }

  public async linkElement() {
    if (this.source?.searchPlugins) {
      let gs = this.source.searchPlugins.find(r => r.id === 'graph-search');
      if (gs && gs.createDialog) {
        const dialog = gs.createDialog(this.source, undefined, { selectedTypes: [this.options.baseType] }, [{
            title: 'select',
            icon: 'mdi-check',
            action: async (i, dashboard, options) => {
              if (options?.element) {
                await this.createLink(options.element);
                this.updateEntities(true);
                this.resize();
              }              
            }             
          }]);
      }
    } 

    // await $cs.triggerDialog({widget: { component: FindElement, datasource: this.widget.datasource } });
  }

  public async createLink(e: GraphElement, parent?: GraphElement)  {
    if (this.source && parent && this.options.treeOptions?.parentProperty) {
            try {
              const parentEdge = await this.source.addNewEdge({
                fromId: e.id,
                toId: parent.id,
                classId: this.options.treeOptions.parentProperty,
              } as GraphElement);
              if (parentEdge) {
                try {
                  await this.source.addEdge(parentEdge);
                } catch (e) {
                  console.log('Error adding parent edge');
                }
              }
            } catch (e) {
              console.log('Error adding parent edge edge');
            }
            // await this.source.updateEdges();
          }

          if (this.options.linkOptions?.key && this.options.linkOptions.id) {
            if (!this.options.newRelations) {
              this.options.newRelations = [];
            }
            this.options.newRelations.push({
              fromId: AppState.parseStateValue(this.state, this.options.linkOptions.id),
              key: this.options.linkOptions.key,
            });
          }

          // check if new relations should be created
          if (this.source && this.options.newRelations) {
            for (const relation of this.options.newRelations) {
              // new relation to other id
              if (relation.toId && this.potentialProperties) {
                if (this.potentialProperties.hasOwnProperty(relation.key) && this.potentialProperties[relation.key].relation?.type) {
                  try {
                    const newEdge = await this.source.addNewEdge(
                      {
                        fromId: e.id,
                        toId: relation.toId,
                        classId: this.potentialProperties[relation.key].relation?.type,
                      } as GraphElement,
                      true
                    );
                  } catch (e) {
                    console.log('Error adding relation edge');
                  }
                }
              } else if (relation.fromId) {
                // create relation from other id
                const fromId = typeof relation.fromId === 'function' ? relation.fromId(this.state) : relation.fromId;
                const fromNode = this.source.getElement(fromId);
                if (fromNode?._featureType?.propertyMap && fromNode._featureType.propertyMap.hasOwnProperty(relation.key)) {
                  const prop = fromNode._featureType.propertyMap[relation.key];
                  const newEdge = await this.source.addNewEdge(
                    {
                      fromId: fromId,
                      toId: e.id,
                      classId: prop.relation?.type,
                    } as GraphElement,
                    true
                  );
                }
              }
            }
            await this.source.updateEdges();
          }
  }

  public async callSuggestionAction(m: IMenu) {
    if (m.action) {
      await m.action(m);
      // await this.updateSuggestions();
      await this.updateEntities(true);

    };

  }

  public async addEntity(type: FeatureType, parent?: GraphElement, properties?: any) {
    if (!this.source) {
      return;
    }
    let placeholder = `new ${type.title}`;
    let name = placeholder;

    if (!this.options.editNewItem) {
      name = properties?.name || (await $cs.triggerInputDialog(placeholder, 'enter new name', '', placeholder));
    }

    
    if (name && name.length > 0) {

      if (type.propertyMap?.hasOwnProperty('point_in_time') && (!properties || !properties.hasOwnProperty('point_in_time'))) {
        properties = { ...{}, ...properties, ...{'point_in_time' : new Date().getTime()}};
      }

      this.source
        ?.addNewNode({
          id: `${type.type}-${guidGenerator()}`,
          properties: { ...properties, ...this.options.newItem, classId: type.type, name },
          classId: type.type,
        })
        .then(async (e) => {
          await this.createLink(e, parent);
          this.updateEntities(true);
          if (this.options.onAfterAdded) {
            await this.options.onAfterAdded(e);
          } else {
            // this.source?.openElement(e);
          }
          return e;
        })
        .catch((e) => {
          alert('error creating entity');
        });
    }
  }

  public editEntity(element: GraphElement) {
    if (!this.source) {
      return;
    }
    this.source.startEditElement(element);
  }

  public removeElement(entity: GraphElement, relations = true, notify = true) {
    if (!this.source) {
      return;
    }
    if (this.options.splitWidget?.data?.elementId === entity.id) {
      this.selectSplitWidget(undefined);
    }
    this.source
      .removeNode(entity, relations, notify)
      .then((r) => {
        this.updateEntities(true);

        // alert('removed');
      })
      .catch((e) => {
        alert('error');
      });
  }

  constructor() {
    super();
  }

  public kanbanColumns: KanBanColumn[] = [];

  public async updateKanbanValue(propType: PropertyType, element: GraphElement, value: any) {
    if (!this.source || !propType.key) {
      return;
    }
    switch (propType?.type) {
      case PropertyValueType.element:
        if (!element?._elements) {
          element._elements = {};
        }
        element.properties![propType.key] = value;
        element._elements[propType.key] = this.source.graph[value];
        break;
      case PropertyValueType.number:
        if (element.properties && propType.key) {
          element.properties[propType.key] = parseInt(value);
        }
        break;
      default:
        element.properties![propType.key] = value;
    }

    await this.source.saveNode(element);
  }

  public async movedKanbanCard(e: any) {
    if (!this.source || !this.source?.graph || !this.options?.kanbanOptions) {
      return;
    }
    const elementId = e.item?.dataset?.elementid;
    const value = e.to?.parentNode?.dataset?.prop;

    const prop = this.options.kanbanOptions.columnProperty;

    if (elementId && value && prop && this.source.graph.hasOwnProperty(elementId)) {
      const element = this.source.graph[elementId];
      if (!element?.properties) {
        element.properties = {};
      }

      if (this.options.kanbanOptions.columnProperty) {
        const propType = this.potentialProperties[this.options.kanbanOptions.columnProperty];
        this.updateKanbanValue(propType, element, value);
      }
    }
  }

  public getKanbanColumnStyle(column: any) {
    if (!this.options?.kanbanOptions) {
      return {};
    }
    return {
      width: column.collapsed ? '50px' : this.options.kanbanOptions.columnWidth ?? '100%',
    } as any;
  }

  public getKanbanCardStyle(element: GraphElement) {
    if (!this.options?.kanbanOptions) {
      return {};
    }
    return {
      height: this.options.kanbanOptions.cardHeight ?? undefined,
    } as any;
  }

  public toggleKanbanColumn(column: KanBanColumn) {
    column.collapsed = !column.collapsed;
    if (this.widget?.id && this.widget.id.length > 0) {
      let key = `${this.widget.id}-${this.options.kanbanOptions?.columnProperty}`;
      let collapsed = this.kanbanColumns
        .filter((c) => c.collapsed)
        .map((c) => c.prop)
        .join(',');

      $cs.updateRouteQuery({
        [key]: collapsed,
      });

      // localStorage.setItem(`${this.widget.id}-kanban-collapsed-${column.prop}`, column.collapsed.toString());
    }
    this.$forceUpdate();
  }

  public addKanbanColumnElement(column: KanBanColumn) {
    column.newCard = true;
    column.newTitle = '';
    this.$forceUpdate();
    Vue.nextTick(() => {
      const fieldId = `input-column-${column.prop}`;
      const field = document.getElementById(fieldId);
      if (field) {
        field.focus();
      }
    });
  }

  public removeKanbanColumnElement(column: KanBanColumn) {
    column.newCard = false;
    column.newTitle = '';
    this.$forceUpdate();
  }

  public async createKanbanItem(column: KanBanColumn, event: any) {
    if (!this.options?.kanbanOptions) {
      return;
    }
    const kanban = this.options.kanbanOptions;
    if (kanban.columnProperty && this.potentialProperties.hasOwnProperty(kanban.columnProperty)) {
      const propType = this.potentialProperties[kanban.columnProperty];
      if (propType.type === PropertyValueType.relation) {
      } else {
        if (propType?.key && this.classTypes && this.classTypes.length > 0) {
          const type = this.classTypes[0];
          const props = {};
          props['name'] = column.newTitle;
          props[propType.key] = column.prop;
          await this.addEntity(type, undefined, props);
        }
      }
    }
    if (event) {
      event.preventDefault();
      setTimeout(() => {
        this.addKanbanColumnElement(column);
      }, 1000);
    } else {
      column.newCard = false;
      this.$forceUpdate();
    }
  }

  public selectKanbanProperty(property: string) {
    if (!this.options.kanbanOptions) {
      return;
    }
    this.options.kanbanOptions.columnProperty = property;
    this.updateKanban();
  }

  public getKanbanColumns(propType: PropertyType): { title: string; value: any }[] {
    let columns: { title: string; value: any }[] = [];

    if (!this.source) {
      return [];
    }

    if (propType.type === PropertyValueType.relation) {
    } else {
      if (propType.type === PropertyValueType.element && propType.elementType) {
        // get elements
        const elements = this.source.getClassElements(propType.elementType);
        for (const element of elements) {
          if (element.properties?.name && element.id) {
            columns.push({ title: element.properties.name, value: element.id });
          }
        }
      } else if (propType.type === PropertyValueType.options) {
        if (propType.options) {
          for (const option of propType.options) {
            columns.push({ title: option, value: option });
          }
        }
      } else if (propType.type === PropertyValueType.number || propType.type === PropertyValueType.string) {
        if (propType.mapping) {
          for (const text in propType.mapping) {
            if (Object.prototype.hasOwnProperty.call(propType.mapping, text)) {
              const value = propType.mapping[text];
              columns.push({ title: text, value: value });
            }
          }
        }
      }
    }
    return columns;
  }

  public updateKanban() {
    if (this.options?.defaultView !== GridView.kanban) {
      return;
    }
    if (!this.source || !this.options.kanbanOptions || !this.potentialProperties || !this.items) {
      return;
    }
    const kanban = this.options.kanbanOptions;
    const columns: KanBanColumn[] = [];
    if (kanban.undefinedSupported) {
      columns.push({ title: 'unknown', prop: undefined, elements: [], collapsed: false });
    }

    if (kanban.columnProperty && this.potentialProperties.hasOwnProperty(kanban.columnProperty)) {
      const collapsedString = $cs.getRouteQuery(`${this.widget.id}-${kanban.columnProperty}`);
      const collapsedColumns = collapsedString ? collapsedString.split(',') : [];
      const propType = this.potentialProperties[kanban.columnProperty];
      if (propType.type === PropertyValueType.relation) {
      } else {
        if (propType.type === PropertyValueType.element && propType.elementType) {
          // get elements
          const elements = this.source.getClassElements(propType.elementType);
          for (const element of elements) {
            const collapsed = collapsedColumns ? collapsedColumns.includes(element.id!) : false;
            columns.push({
              newCard: false,
              newTitle: '',
              prop: element.id,
              collapsed,
              title: element.properties?.name ?? propType.elementType!,
              elements: [],
              element,
            });
          }
        } else if (propType.type === PropertyValueType.options) {
          if (propType.options) {
            for (const option of propType.options) {
              const collapsed = collapsedColumns ? collapsedColumns.includes(option) : false;
              columns.push({ prop: option, title: option, collapsed, elements: [], newCard: false, newTitle: '' });
            }
          }
        } else if (propType.type === PropertyValueType.number || propType.type === PropertyValueType.string) {
          if (propType.mapping) {
            for (const text in propType.mapping) {
              if (Object.prototype.hasOwnProperty.call(propType.mapping, text)) {
                const value = propType.mapping[text];
                const collapsed = collapsedColumns ? collapsedColumns.includes(value.toString()) : false;
                columns.push({ prop: value, title: text, collapsed, elements: [], newCard: false, newTitle: '' });
              }
            }
          }
        } else if (propType.type === PropertyValueType.boolean) {
          columns.push({ prop: 'true', title: 'true', collapsed: false, elements: [], newCard: false, newTitle: '' });
          columns.push({ prop: 'false', title: 'false', collapsed: false, elements: [], newCard: false, newTitle: '' });
        }

        for (const item of this.items) {
          const column = columns.find((k) => kanban.columnProperty && k.prop === item?.properties![kanban.columnProperty]);
          if (column?.elements) {
            if (column) {
              column.elements.push(item);
            } else {
              if (kanban.undefinedSupported) {
                columns[0]!.elements!.push(item);
                columns[0]!.collapsed = false;
              }
            }
          }
        }
      }
    }

    Vue.set(this, 'kanbanColumns', columns);
    this.$forceUpdate();

    // console.log(this.kanbanColumns);
  }

  public getGrid() {
    console.log('get grid');
    return this;
  }

  public updateTree(
    treeItems: any[],
    // classTypes: string[],
    base?: GraphElement,
    active?: any
  ) {
    if (!this.source || !this.options.baseType || !this.options.treeOptions) {
      return;
    }

    let items: GraphElement[] = [];
    if (base) {
      if (base._incomming) {
        items = [...base._incomming!.filter((o) => o.classId === this.options.treeOptions!.parentProperty && o.from).map((o) => o.from!)];
      }
      // if (base._outgoing)
    } else {
      // const i =
      // debugger;
      items = this.source.getClassElements(this.options!.baseType, true)?.filter((i) => {
        return !i._outgoing || i._outgoing.findIndex((p) => p.classId === this.options.treeOptions!.parentProperty) === -1;
      });
      if (this.options.addNodesWithTimeseries) {
        const timeSeriesItems = this.source.getElementsByPropertyAndOperator('hasTimeseries', true, '==');
        items = [...items, ...timeSeriesItems];
      }
    }
    if (items) {
      for (const item of items) {
        if (item.id) {
          const treeItem = {
            id: item.id,
            name: item.properties?.name || `${item.id}`,
            entity: item,
            children: [],
          };
          if (active?.children) {
            active.children.push(treeItem);
          } else {
            treeItems.push(treeItem);
            // console.log(this.treeItems);
          }

          this.updateTree(treeItems, item, treeItem);
        }
      }
    }

    return treeItems;
  }

  public viewDay(date: string) {
    if (!this.options?.calendarOptions) {
      return;
    }
    this.focus = date;
    this.options.calendarOptions.type = 'day';
  }

  private storeFilterQuery() {
    if (this.options.filterProperty && this.options.filterValue) {
      $cs.updateRouteQuery({ fp: this.options.filterProperty, fv: this.options.filterValue });
    } else {
      $cs.removeRouteQueryParam('fp');
      $cs.removeRouteQueryParam('fv');
    }
  }

  private checkQueryParams() {
    if ($cs.getRouteQuery('view') && this.options.defaultView !== $cs.getRouteQuery('view')) {
      this.options.defaultView = $cs.getRouteQuery('view') as GridView;
    }
    if ($cs.getRouteQuery('fv') && this.options.filterValue !== $cs.getRouteQuery('fv')) {
      this.options.filterValue = $cs.getRouteQuery('fv');
    }
    if ($cs.getRouteQuery('fp') && this.options.filterProperty !== $cs.getRouteQuery('fp')) {
      this.options.filterProperty = $cs.getRouteQuery('fp');
    }
  }

  public setFilterValue(value: string) {
    this.filterTitle = undefined;
    this.options.filterValue = value;
    this.storeFilterQuery();
    this.updateEntities(true);
  }

  public setFilterProperty(prop: string) {
    this.filterProperty = null;
    this.filterTitle = undefined;
    this.filterValues = undefined;
    this.options.filterProperty = prop;
    this.options.filterValue = undefined;
    this.storeFilterQuery();
    this.updateEntities(true);
  }

  public toggleGrouping() {
    this.showGroups = !this.showGroups;
    this.updateGroups();
    this.updateCardsLayout();
  }

  public updateGroups() {
    if (this.items && this.options?.grouping?.enabled && this.showGroups) {
      const groups: { [key: string]: GridGroup } = {};
      const addItem = (group, item) => {
        if (group === null) {
          group = 'unknown';
        }
        if (!groups.hasOwnProperty(group)) {
          groups[group] = { title: group, items: [] };
        }
        groups[group].items!.push(item);
      };
      this.showGroups = true;
      for (const entity of this.items) {
        let value: string | null = null;
        if (this.options.grouping.property) {
          if (entity.properties && entity.properties.hasOwnProperty(this.options.grouping.property)) {
            value = entity.properties[this.options.grouping.property];
          }
        } else {
          value = entity._featureType?.title || entity.classId!;
        }
        addItem(value, entity);
      }
      this.groups = Object.values(groups);
    } else {
      this.showGroups = false;
    }
  }

  public async updateSuggestions() : Promise<GridSuggestion[]> {
    let res : GridSuggestion[] = [];
    if (this.source && this.options?.suggestionEngine) {
      res = await this.options.suggestionEngine.getSuggestions(this.options, this.source, this);
    }
    this.suggestions = res;    
    return Promise.resolve(res);
  }

  public async updateEntities(force = false) {
    this.showContextMenu = false;
    
    if (!this.options || !this.source) {
      return;
    }
    if (this.options.canSearch === undefined) {
      this.options.canSearch = true;
    }
    if (this.options.canSearch && this.options.searchFilter === undefined) {
      this.options.searchFilter = '';
    }

    const filterItems = () => {
      if (this.options?.canSearch && this.items && this.options.searchFilter) {
        this.items = this.items.filter((i) => {
          return i.properties?.name?.toString().toLowerCase().includes(this.options.searchFilter!.toLowerCase());
        });
      }
    };

    if (this.source && this.options.nodeRules) {
      this.localPreset = { classId: 'graph_preset', properties: { graphLayout: { nodeRules: this.options.nodeRules } } } as FilterGraphElement;
      this.source.applyGraphPresetRules(this.localPreset as FilterGraphElement, this.options.nodeRules);
      this.items = this.localPreset._visibleNodes;
      filterItems();
      this.updateGroups();
      this.update();
      this.$forceUpdate();
      return;
    }

    if (this.source && this.options?.preset && this.options.syncMode === 'follow') {
      {
        const preset = this.source.getGraphPreset(this.options.preset);
        if (preset) {
          this.items = preset._visibleNodes;
          filterItems();
          this.update();
          this.$forceUpdate();
        }

        this.busManager.subscribe(this.source.events, IGraphFilter.GRAPH_FILTER, (a: string, f: FilterGraphElement) => {
          if (this.options.preset && f.id === this.options.preset) {
            // this.updateEntities();
            // this.items = f._visibleNodes;
            //         filterItems();
            //         this.update();
            //         this.$forceUpdate();
            // Vue.set(this, 'rowData', f._visibleNodes);
            // this.items = f._visibleNodes;
            // this.$forceUpdate();
            // this.items = f._visibleNodes;
          }
        });
        return;
      }
    }
    if (!this.options.baseType || (this.upToDate && !force)) {
      return;
    }
    const baseType = this.options.baseType;
    if (!this.source?.featureTypes || !this.source.featureTypes.hasOwnProperty(baseType)) {
      return;
    }
    this.upToDate = true;
    this.featureType = this.source.featureTypes[baseType];
    this.classTypes = Object.values(this.source.featureTypes).filter((ft) => ft._inheritedTypes?.includes(baseType) && !ft.abstract);

    for (const type of this.classTypes) {
      if (type.properties) {
        for (const prop of type.properties) {
          if (prop.key && !this.potentialProperties.hasOwnProperty(prop.key)) {
            this.potentialProperties[prop.key] = prop;
          }
        }
      }
    }

    this.sortOptions = Object.values(this.potentialProperties).filter((p) => p.type !== PropertyValueType.relation);
    this.groupOptions = Object.values(this.potentialProperties).filter((p) => p.type !== PropertyValueType.relation);

    this.checkQueryParams();

    await this.updateSuggestions();

    if (this.options.filterProperty && this.potentialProperties.hasOwnProperty(this.options.filterProperty)) {
      // this.setFilterProperty(this.options.filterProperty);
      this.filterProperty = this.potentialProperties[this.options.filterProperty];
    }

    if (this.options.filterValue) {
      // this.filter
      // this.setFilterValue(this.options.filterValue); // = this.potentialProperties[this.options.filterProperty];
    }

    if (this.options.filterProperties) {
      this.filterProperties = [];
      for (const filterProperty of this.options.filterProperties) {
        if (this.potentialProperties.hasOwnProperty(filterProperty)) {
          this.filterProperties.push(this.potentialProperties[filterProperty]);
        }
      }
    }

    if (this.options.syncMode === 'follow') {
      this.busManager.subscribe(this.source.events, IGraphFilter.GRAPH_FILTER, (a: string, f: FilterGraphElement) => {
        if (this.options.preset && f.id === this.options.preset) {
          Vue.set(this, 'rowData', f._visibleNodes);
          // this.items = f._visibleNodes;
        }
      });
    } else {
      if (this.options?.filter?.hasObjectRelation === '{{activeElement}}') {
        this.options.filter.hasObjectRelation = this.source.activeElement?.id;
      }
      let filter = this.options.filter ?? {};

      // check for link options, if so add additional filter(s)
      if (this.options.linkOptions?.key && this.options.linkOptions.id && this.options.linkOptions.baseTypeId) {
        const baseType = this.source.getFeatureTypeById(this.options.linkOptions.baseTypeId);
        // find feature type of base node
        if (baseType?.propertyMap?.hasOwnProperty(this.options.linkOptions.key)) {
          // find property type based on key
          const linkProperty = baseType.propertyMap[this.options.linkOptions.key];
          const linkId = AppState.parseStateValue(this.state, this.options.linkOptions.id);

          switch (linkProperty.type) {
            case PropertyValueType.relation:
              if (linkProperty.relation?.type) {
                filter.hasIncomingTypeRelation = {
                  ...filter.hasIncomingTypeRelation,
                  ...{
                    [linkProperty.relation.type]: linkId,
                  },
                };
              }
              break;
          }
        }
      }
      this.items = this.source.getClassElements(baseType, true, filter, this.state);

      filterItems();

      // check if items should be filtered
      if (this.filterProperty?.key) {
        this.filterValues = {};
        this.items = this.items.filter((i) => {
          if (i.properties && this.filterValues && this.filterProperty?.key && i.properties.hasOwnProperty(this.filterProperty.key)) {
            if (!this.filterValues.hasOwnProperty(i.properties[this.filterProperty.key])) {
              // find title for this category
              let title = i.properties[this.filterProperty.key!];
              let key = i.properties[this.filterProperty.key!];
              if (key && this.source) {
                switch (this.filterProperty.type) {
                  case PropertyValueType.element:
                    let el = this.source.getElement(key);
                    title = el?.properties?.name || key;
                    break;
                }
              }

              // check if this is current title
              if (this.options.filterValue === key) {
                this.filterTitle = title;
              }
              this.filterValues[i.properties[this.filterProperty.key!]!] = title;
            }
            if (this.options.filterValue === undefined) {
              return true;
            }
            if (this.options.filterValue) {
              return i.properties[this.filterProperty.key!] === this.options.filterValue;
            }
          }
          if (!this.options.filterValue) {
            return true;
          }
        });
      }

      if (this.sort?.key && this.items) {
        if (this.sort.type === PropertyValueType.string) {
          this.items.sort((a, b) => {
            if (
              this.sort?.key &&
              a?.properties &&
              a.properties.hasOwnProperty(this.sort.key) &&
              b?.properties &&
              b.properties.hasOwnProperty(this.sort.key)
            ) {
              return a.properties[this.sort.key].toLowerCase() < b.properties![this.sort.key].toLowerCase()
                ? this.inverseSort
                  ? -1
                  : 1
                : this.inverseSort
                ? 1
                : -1;
            }
            return 0;
          });
        } else {
          this.items.sort((a, b) => {
            return this.sort?.key &&
              a?.properties &&
              b?.properties &&
              a.properties.hasOwnProperty(this.sort.key) &&
              b.properties.hasOwnProperty(this.sort.key) &&
              a.properties![this.sort.key]! > b.properties![this.sort.key]!
              ? this.inverseSort!
                ? -1
                : 1
              : this.inverseSort!
              ? 1
              : -1;
          });
        }
      } else if (this.items && this.options.customSort) {
        this.items.sort((a, b) => {
          return this.options.customSort!(a!, b!);
        });
      } else if (this.items && this.options.defaultView === 'news') {
        this.items.sort((a, b) => {
          return b?.properties?.point_in_time - a?.properties?.point_in_time;
        });
      }

      if (this.options.addNodesWithTimeseries) {
        const timeSeriesItems = this.source
          .getElementsByPropertyAndOperator('hasTimeseries', true, '==')
          .filter((e) => e._isLinked && e._isLinked.fromId);
        this.items = [...this.items, ...timeSeriesItems];
      }
    }

    if (this.options.defaultView === GridView.table) {
      Vue.set(this, 'rowData', this.items);
      if (this.gridApi) {
        this.gridApi.refreshClientSideRowModel();
      }
    }

    // // this.rowData = this.items;

    // if (!this.sort) {
    //   this.sort = this.featureType.properties?.find((p) => p.key === 'updated_time');
    // }

    if (this.options.kanbanOptions) {
      this.updateKanban();
    }
    if (this.options.defaultView === GridView.tree && this.options.treeOptions?.parentProperty) {
      // console.log("starting update tree");

      Object.freeze(this.treeItems);

      if (!this.treeItems || this.treeItems.length === 0) {
        const treeItems = this.updateTree([], undefined, undefined);
        Vue.set(this, 'treeItems', treeItems);
      }
      //

      // console.log(this.treeItems);
      // this.$forceUpdate();
    }

    if (this.options.relationToggle) {
      this.updateLinkedEntities();
    }

    this.updateGroups();

    this.update();
    if (this.options.defaultView === 'table') {
      this.onGridSelection();
    }
    this.$forceUpdate();
  }

  public updateLinkedEntities() {
    if (!this.source || !this.options.relationToggle || !this.options.relationToggle.fromId) {
      return;
    }
    // debugger;
    const element = this.source.getElement(this.options.relationToggle.fromId);
    if (!element?._outgoing) {
      return;
    }
    const selected = element._outgoing.filter((r) => r.classId === this.options.relationToggle!.relationClassId);
    if (this.items && selected) {
      for (const item of this.items) {
        (item as any)._isLinked = selected.find((i) => i.toId === item.id);
      }
    }
  }

  public update() {
    switch (this.toggle_view) {
      case 0:
        this.updateHeaders();
        break;
      case 1:
        this.updateCardsLayout();
        break;
      case 2:
        (this.$refs.calendar as any).checkChange();
        break;
    }
  }

  public dateString(date: number): string {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }

  public getColor(element: GraphElement) {
    return GraphElement.getBackgroundColor(element);
  }

  public contentLoaded(source: DocDatasource) {
    if (!this.source && source) {
      this.source = source;
    }
    this.updateEntities(true);
    this.update();
    this.registerWidgetConfig();

    if (this.source?.events) {
      this.source.events.subscribe(GraphDatasource.GRAPH_EVENTS, (action: string, el: GraphElement) => {
        if (action === GraphDatasource.ELEMENT_UPDATED) {
          this.updateEntities(true);
          this.$forceUpdate();
        }
      });
    }

    if (this.options) {
      if (this.options.calendarOptions) {
        this.setToday();
      }
      if (!this.options.title) {
        this.options.title = this.featureType?.title;
      }
      if (!this.options.defaultView) {
        Vue.set(this.options, 'defaultView', GridView.table);
        // this.options.defaultView = GridView.table;
      }

      this.updateFilterPanels();

      // let selectionSizePlugin = new Plugin({
      //   view(editorView) {
      //     return new SelectionSizeTooltip(editorView);
      //   }
      // });
    }
  }

  private getActions(element: GraphElement): IMenu[] {
    let res: IMenu[] = [];
    if (this.source && this.options.additionalActions) {
      res = res.concat(
        typeof this.options.additionalActions === 'function' ? this.options.additionalActions(element, this.source) : this.options.additionalActions
      );
    }
    return res;
  }

  private getElementCard(element: GraphElement) {
    return ElementCardManager.getElementCard(element);
  }

  private registerWidgetConfig() {
    if (!this.source) return;
    let w: IWidget = {
      component: `element-data-grid`,
      id: `slide-${this.widget.id || guidGenerator()}`,
      datasource: this.source.id,
      data: {
        title: 'Element data grid',
      },
      options: {
        ...(this.widget.options || {}),
        ...{
          nodeRules: [
            {
              type: 'ELEMENT',
              elementIds: this.items ? this.items.map((i) => i.id) : [],
            },
          ],
        },
        hideHeader: true,
      } as DataGridOptions,
    };
    this.source.addSlideConfig(w);
  }

  beforeDestroy() {
    if (!this.source) return;
    if (this.gridApi) {
      this.gridApi.destroy();
    }
    this.source.removeAllSlideConfigs();
  }

  beforeMount() {
    if (!this.options.cardOptions) {
      this.options.cardOptions = { cardSize: 'medium' };
    }
    if (this.options.cardOptions && this.options.cardOptions.cardSize === undefined) {
      this.options.cardOptions.cardSize = 'medium';
    }
  }

  mounted() {
    if (!this.source && this.widget?.content) {
      this.source = this.widget.content;
    }

    this.showGroups = this.options.grouping?.enabled;
    this.defaultColDef.filter = !this.options.hideFilter;
    this.defaultColDef.floatingFilter = !this.options.hideFilter;
    this.updateEntities();
  }
}
</script>
