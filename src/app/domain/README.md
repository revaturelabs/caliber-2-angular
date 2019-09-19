## Domain Directory
* At the time I wrote this note, there was a lot of the same model objects being replicated per module
    * Because of this, debugging was an absolute NIGHTMARE (For example, some `Note`'s used `note.noteContent`, where others used `note.content`)
* From this point forward (9/18/2019), this directory is the only place for **_Model Objects_** and **_Data Transfer Objects_**
