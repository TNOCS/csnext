<template>
  <div class="management-container">
    <v-toolbar color="primary" dark flat src="images/abstract.jpg">
      <v-toolbar-title>Knowledge Graph</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="menuTab" align-with-title icons-and-text>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab key="source">source<v-icon>mdi-semantic-web</v-icon></v-tab>
          <!-- <v-tab key="plugins">plugins<v-icon>mdi-hammer-wrench</v-icon></v-tab> -->
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="menuTab" style="min-height: 500px">
      <v-tab-item key="source" style="min-height: 500px">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card flat class="options-container">
                <v-layout><v-icon class="storage-icon">mdi-web</v-icon><span class="storage-title">Server Knowledge Graph</span></v-layout>
                <v-container>
                  <v-text-field label="Base Url" disabled v-if="source" v-model="source.base_url" placeholder="Placeholder"></v-text-field>
                </v-container>
                <v-layout class="action-buttons">
                  <v-btn class="primary mr-4" @click="restorekg()"><v-icon class="mr-2">mdi-import</v-icon>restore</v-btn>
                  <v-btn class="primary mr-4" @click="downloadkg()"><v-icon class="mr-2">mdi-download</v-icon>backup</v-btn>
                  <!-- <v-btn @click="openServer()" class="primary"><v-icon class="mr-2">mdi-web</v-icon></v-btn> -->
                </v-layout>
                <!-- <v-card-text v-text="text"></v-card-text> -->
              </v-card>
            </v-col>
            <!-- <v-col class="split-col" cols="0">
              <v-card flat class="options-container">
                <v-layout><v-icon class="storage-icon">mdi-laptop</v-icon><span class="storage-title">Local Knowledge Graph</span></v-layout>
                <v-list two-line v-if="recent">
                  <v-list-item
                    :class="{
                      primary: isSelected(db),
                    }"
                    @click="openFileHandle(db)"
                    v-for="(db, dbid) in recent"
                    :key="dbid"
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-file-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ db.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ db.name }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn v-if="!isSelected(db)" icon @click.stop="removeRecent(dbid)"><v-icon>mdi-delete</v-icon></v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>

                <div v-if="deviceStorage">
                  <span v-if="deviceStorage && deviceStorage.databaseHandle">
                    
                  </span>
                </div>

                <v-layout class="action-buttons">
                  <v-btn class="primary mr-4" v-if="reloadRequired" @click="reloadFolder()"
                    ><v-icon class="mr-2">mdi-folder-outline</v-icon>reload</v-btn
                  >

                  <v-btn class="primary mr-4" @click="downloadkg()"><v-icon class="mr-2">mdi-download</v-icon>download</v-btn>
                  <v-btn class="primary mr-4" @click="openFile()"><v-icon class="mr-2">mdi-folder-outline</v-icon>open new file</v-btn>

                  <v-btn v-if="folderSelected && validDatamodel && validDatabase" class="primary" @click="loadFolder()"
                    ><v-icon class="mr-2">mdi-check-circle</v-icon>load</v-btn
                  >
                </v-layout>
              </v-card>
            </v-col> -->
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item key="plugins"> plugins </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<style scoped>
.split-col {
  border-left: 1px;
  border-left-color: gray;
  border-left-style: solid;
}
.management-container {
  min-width: 500px;
  min-height: 400px;
  height: 100%;
}

.file-selected {
  background-color: red;
}

.storage-icon {
  font-size: 52px;
  margin-right: 10px;
}

.storage-title {
  padding-top: 6px;
  font-size: 24px;
}

.options-container {
  min-height: 476px;
}

.options-card {
  height: 100%;
  width: 100%;
  background-color: red;
}

.action-buttons {
  position: absolute;
  bottom: 10px;
  right: 10px;
  /* inset: auto 5px auto auto; */
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { WidgetBase } from '@csnext/cs-client';
import { DocDatasource, DeviceStorage, ServerStorage } from '../..';
import { get, set } from 'idb-keyval';

@Component({
  components: {},
})
export default class Management extends WidgetBase {
  public files: { [name: string]: any } = {};
  public get activeUser(): string | undefined {
    return this.source?.activeUser?.id ?? undefined;
  }

  public recent: any[] | null = null;

  public sourceTab: number | null = null;
  public menuTab: number = 0;
  public validDatamodel = false;
  public validDatabase = false;
  public folderSelected = false;
  public reloadRequired = false;

  public get serverStorage(): ServerStorage | undefined {
    if (this.source?.storage?.storageType === 'server') {
      return this.source.storage as ServerStorage;
    } else {
      return undefined;
    }
  }

  public openServer() {
    if (this.source) {
      this.source.openServerStorage();
    }
  }

  public async downloadkg() {
    if (this.source) {
      const storage = DeviceStorage.getStorage(this.source);
      if (storage) {
        try {
          const name = await $cs.triggerInputDialog('Please enter a name for the file', 'file name', $cs.project?.title ?? 'kg');
          if (name && name.length > 0) {
            $cs
              .triggerFileDownload(`${name}.json`, JSON.stringify(storage), 'application/json')
              .then(() => {
                $cs.triggerNotification({ title: 'Downloaded', color: 'green', text: 'Downloaded Knowledge Graph', icon: 'mdi-download' });
              })
              .catch(() => {
                $cs.triggerNotification({ title: 'Error', color: 'red', text: 'Error downloading Knowledge Graph', icon: 'mdi-download' });
              });
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  public restorekg() {
    if (!this.source?.storage) {
      return;
    }
    
    $cs.triggerFileUpload('.json').then(async (f) => {
      if (f && f.has('file')) {
        const file = f?.get('file') as File;
        const d = JSON.parse(await file.text());
        $cs.triggerNotification({ title: 'Uploaded', color: 'green', text: 'Uploaded Knowledge Graph, processing ... ', icon: 'mdi-upload' });
        if (this.source?.storage?.restoreGraph && d?.kg) {
          await this.source.storage.restoreGraph(d.kg);
          window.location.reload();
        }        
      }
    });
  }

  private isSelected(db: any) {
    return (
      this.deviceStorage?.databaseHandle &&
      db.name === this.deviceStorage.databaseHandle.name &&
      db.handle.isSameEntry(this.deviceStorage.databaseHandle)
    );
  }

  public async openFileHandle(file: any) {
    if (this.source && file.handle) {
      await this.source.openDeviceStorage(file.handle);
      $cs.closeDialog();
    }
  }

  public async removeRecent(index: number) {
    if (this.recent) {
      this.recent.splice(index, 1);
      await DeviceStorage.saveRecentDatabases(this.recent);
      this.$forceUpdate();
    }
  }

  public get deviceStorage(): DeviceStorage | undefined {
    if (this.source?.storage?.storageType === 'device') {
      return this.source?.storage as DeviceStorage;
    } else {
      return undefined;
    }
  }

  private async verifyPermission(fileHandle, readWrite) {
    const options: any = {};
    if (readWrite) {
      options.mode = 'readwrite';
    }
    // Check if permission was already granted. If so, return true.
    if ((await fileHandle.queryPermission(options)) === 'granted') {
      return true;
    }
    try {
      // Request permission. If the user grants permission, return true.
      if ((await fileHandle.requestPermission(options)) === 'granted') {
        return true;
      }
    } catch (e) {}
    // The user didn't grant permission, so return false.
    return false;
  }

  public reloadFolder() {
    this.openKG();
  }

  public openRecent() {
    if (this.source && this.deviceStorage?.databaseHandle) {
      this.source.openDeviceStorage(this.deviceStorage.databaseHandle);
      $cs.closeDialog();
    }
  }

  public directoryHandle: any;

  public async loadFolder() {
    if (this.source && this.folderSelected && this.validDatamodel && this.validDatabase) {
      this.source.openDeviceStorage(this.directoryHandle);
    }
  }

  private getFileHandle() {
    // For Chrome 86 and later...
    if ('showOpenFilePicker' in window) {
      return (window as any).showOpenFilePicker().then((handles) => handles[0]);
    }
    // For Chrome 85 and earlier...
    return (window as any).chooseFileSystemEntries();
  }

  public async openFile() {
    const pickerOpts = {
      excludeAcceptAllOption: false,
      multiple: false,
    };

    // open file picker
    try {
      const handle = await this.getFileHandle();
      if (this.source && handle) {
        await this.source.openDeviceStorage(handle);
      }
    } catch (e) {}
    this.$forceUpdate();
  }

  public async openKG() {
    const pickerOpts = {
      excludeAcceptAllOption: false,
      multiple: false,
    };

    // open file picker
    this.directoryHandle = await (window as any).showDirectoryPicker(pickerOpts);

    await set('directory', this.directoryHandle);

    // console.log(this.directoryHandle);

    Vue.set(this, 'files', {});
    this.folderSelected = true;

    for await (let [name, handle] of this.directoryHandle.entries()) {
      if (this.files !== null) {
        this.files[name.toLowerCase()] = handle;
      }
    }

    if (this.files.hasOwnProperty(DeviceStorage.DATA_GRAPH_FILE) && this.deviceStorage) {
      this.deviceStorage.databaseHandle = this.files[DeviceStorage.DATA_GRAPH_FILE];
      set(DeviceStorage.DATA_GRAPH_FILE, this.deviceStorage.databaseHandle);
    }

    this.validDatamodel = this.files.hasOwnProperty('server.config.json');
    this.validDatabase = this.files.hasOwnProperty('database2.json');
    return this.loadFolder();
  }

  private async writeFile(fileHandle: any, contents: any) {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();

    // Write the contents of the file to the stream.
    await writable.write(contents);

    // Close the file and write the contents to disk.
    await writable.close();
  }

  public set activeUser(userId: string | undefined) {
    if (!this.source || !userId) {
      return;
    }
    const user = this.source.graph[userId];
    if (user) {
      this.source.setActiveUser(user);
      this.$forceUpdate();
    }
  }

  public get source(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  constructor() {
    super();
  }

  public async checkDirectory() {
    const dir = await get('directory');
    if (dir && !this.directoryHandle) {
      this.directoryHandle = dir;

      if (!(await this.verifyPermission(this.directoryHandle, true))) {
        this.reloadRequired = true;
      }
    }
  }

  public async contentLoaded() {
    if (!this.source?.storage) {
      return;
    }
    this.recent = await DeviceStorage.recentDatabases();
    this.busManager.subscribe(this.source.events, DocDatasource.STORAGE, (a, d) => {
      this.$forceUpdate();
    });
    this.sourceTab = this.source.storage.storageType === 'server' ? 0 : 1;
    this.checkDirectory();
  }
  mounted() {
    if (this.source) {
      this.contentLoaded();
    }
  }
}
</script>
