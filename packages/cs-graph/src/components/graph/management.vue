<template>
  <div class="management-container">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      

      <v-toolbar-title>Knowledge Graph</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab            
            :key="server"
          >
            server
          </v-tab>
          <v-tab            
            :key="device"
          >
            device
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item        
        :key="server"
      >
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item        
        :key="device"
      >
      <v-btn @click="openFolder()">open folder</v-btn>
    <v-list nav dense>
      <v-list-item v-for="(item, i) in files" :key="i" @click="openFile(item)">
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
      </v-tab-item>
    </v-tabs-items>
  

    
  </div>
</template>

<style scoped>
.management-container {
  min-width: 500px;
  min-height: 400px;
}
</style>


<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";

import { DocDatasource } from "../../";

@Component({
  components: {},
})
export default class Management extends WidgetBase {
  public files: { name: string; file: any }[] | null = null;
  public get activeUser(): string | undefined {
    return this.source?.activeUser?.id ?? undefined;
  }

  public tab = "device"

  public openFolder() {
    this.openKG();
  }

  public directoryHandle: any;

  public async openFile(entry: { name: string; file: any }) {
    if (entry.file) {
      debugger;
      const fileData = await (entry.file as any).getFile();
      const text = await fileData.text();
      console.log(text);
      alert(text.length);
    }
    // alert(name);
  }

  public async openKG() {
    const pickerOpts = {
      types: [
        {
          description: "JSON",
          accept: {
            "application/json": [".json"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };

    // open file picker
    this.directoryHandle = await (window as any).showDirectoryPicker(
      pickerOpts
    );

    Vue.set(this, "files", []);

    for await (let [name, handle] of this.directoryHandle.entries()) {
      if (this.files !== null) {
        this.files.push({ name, file: handle });
      }
      // console.log(name);
    }

    // get file contents
    // const fileData = await fileHandle.getFile();

    // const text = await fileData.text();
    // console.log(text);

    // this.writeFile(fileHandle, 'test' )
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

  public contentLoaded() {}

  mounted() {}
}
</script>
