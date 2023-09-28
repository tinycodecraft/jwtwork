﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace JwtWork.PISDB.Models;

public partial class FileCategory
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)]
    public string Description { get; set; }

    public int Sequence { get; set; }

    public string Directories { get; set; }

    [StringLength(50)]
    public string Slug { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UpdatedAt { get; set; }

    [StringLength(50)]
    public string UpdatedBy { get; set; }

    [InverseProperty("FileCategory")]
    public virtual ICollection<FileSubCategory> FileSubCategory { get; set; } = new List<FileSubCategory>();

    [InverseProperty("FileCategory")]
    public virtual ICollection<PSItemLink> PSItemLink { get; set; } = new List<PSItemLink>();
}